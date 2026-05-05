import { Field, Formik, FormikProps, Form } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import {
  getInitialValues,
  getValidationSchema,
} from "../../../../validation/blogValidation";
import { useRef, useState } from "react";
import { FormValues } from "../../../../types/blog/blogUpload";
import {
  Calendar,
  Edit,
  FileText,
  Image,
  Loader2,
  Video,
  X,
} from "lucide-react";
import TabNavigation from "./TabNavigation";
import ArticleForm from "./AritcleForm";
import EventForm from "./EventForm";
import UploadContent from "./UploadContent";
import TextPostForm from "./TextPostForm";
import PreviewContent from "./PreviewContent";
import { toast } from "sonner";
import { fileUploadThunk } from "../../../../features/upload/fileUploadThunk";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { createBlogThunk } from "../../../../features/blog/blogThunk";
import { IBlogV2, MediaItem } from "../../../../types/redux/blogInterface";

const PostUploadModal = ({
  onClose,
  postType,
  //   onPostCreated,
}: {
  onClose: () => void;
  postType: "image" | "video" | "event" | "article" | "text";
  //   onPostCreated: boolean;
}) => {
  const getPostTypeIcon = () => {
    switch (postType) {
      case "image":
        return <Image size={24} />;
      case "video":
        return <Video size={24} />;
      case "event":
        return <Calendar size={24} />;
      case "article":
        return <FileText size={24} />;
      default:
        return <Edit size={24} />;
    }
  };
  const formikRef = useRef<FormikProps<FormValues>>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.upload);
  const { loading: blogLoading } = useAppSelector((state) => state.blog);

  const [activeTab, setActiveTab] = useState(1);
  const [mediaPreview, setMediaPreview] = useState<string[]>([]);

  const handleSubmit = async (values: FormValues) => {
    try {
      let uploadedMedia: MediaItem[] = [];

      if (values.media?.length) {
        const uploads = await Promise.all(
          values.media.map(async (item) => {
            if (!item.file) return null;

            const res = await dispatch(
              fileUploadThunk({
                file: item.file,
                category: "blog",
              }),
            ).unwrap();

            const url = Array.isArray(res) ? res[0]?.url : res;

            if (!url) return null;

            return {
              type: item.type,
              url,
              caption: item.caption,
            };
          }),
        );

        uploadedMedia = uploads.filter(
          (item): item is NonNullable<typeof item> => item !== null,
        );
      }

      const payload: IBlogV2 = {
        postType,
        content: values.content || "",
        tags: values.tags
          ?.split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (uploadedMedia.length) payload.media = uploadedMedia;

      if (postType === "article") {
        payload.article = {
          body: values.articleBody,
          title: values.title,
        };
      }

      if (postType === "event") {
        payload.event = {
          title: values.title,
          startDate: values.eventStartDate,
          endDate: values.eventEndDate,
          venue: values.location,
          description: values.description,
        };
      }

      await dispatch(createBlogThunk(payload)).unwrap();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to create post");
      }
    }
  };

  const handleMediaUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: unknown) => void,
    index: number = 0,
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const values = formikRef.current?.values;
      if (!values) return;

      const newPreviews = [...mediaPreview];
      newPreviews[index] = URL.createObjectURL(file);
      setMediaPreview(newPreviews);

      const isImage = file.type.startsWith("image/");
      const fileType = isImage ? "image" : "video";

      const newMedia = [...values.media];
      newMedia[index] = {
        ...newMedia[index],
        file: file,
        type: fileType,
        caption: newMedia[index]?.caption || "",
        url: undefined,
      };
      setFieldValue("media", newMedia);
    }
  };

  const submitArticleDirectly = async () => {
    if (!formikRef.current) {
      toast.error("Form reference not available");
      return;
    }

    const values = formikRef.current.values;
    await handleSubmit(values);
  };

  const handleManualSubmit = async () => {
    if (formikRef.current) {
      const values = formikRef.current.values;
      await handleSubmit(values);
    } else {
      console.error("Formik instance not found");
      toast.error("Error: Form system not initialized");
    }
  };

  const addMediaField = (
    setFieldValue: (field: string, value: unknown) => void,
  ) => {
    const values = formikRef.current?.values;
    if (!values) return;
    const newMedia = [
      ...values.media,
      { file: null, type: "image", caption: "", url: undefined },
    ];
    setFieldValue("media", newMedia);
  };

  const removeMediaField = (
    index: number,
    setFieldValue: (field: string, value: unknown) => void,
  ) => {
    const values = formikRef.current?.values;
    if (!values) return;
    const newMedia = [...values.media];
    newMedia.splice(index, 1);
    setFieldValue("media", newMedia);

    const newPreviews = [...mediaPreview];
    if (newPreviews[index]) {
      URL.revokeObjectURL(newPreviews[index]);
    }
    newPreviews.splice(index, 1);
    setMediaPreview(newPreviews);
  };

  const handlePrevTab = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }

    if (postType === "text") {
      setActiveTab(1);
      return;
    }
  };

  const handleNextTab = (isValid: boolean, values: FormValues) => {
    if (postType === "article") {
      if (activeTab === 1 && (!values.title || !values.articleBody)) {
        toast.error("Please fill in the article title and body");
        return;
      }

      const maxTab = 3;
      if (activeTab < maxTab) {
        setActiveTab(activeTab + 1);
      }
      return;
    }

    if (postType === "text") {
      setActiveTab(3);
      return;
    }

    if (postType === "image" || postType === "video") {
      if (activeTab === 1) {
        const hasMedia = values.media.some((m) => m.file);
        if (!hasMedia) {
          toast.error(`Please upload a ${postType} first`);
          return;
        }
        setActiveTab(2);
      }
      return;
    }

    const maxTab = 3;
    if (activeTab < maxTab) {
      setActiveTab(activeTab + 1);
      if (!isValid) {
        toast.warning("Some fields may need your attention");
      }
    }
  };

  const nextDisabled = (formikIsSubmitting: boolean, values: FormValues) => {
    return (
      formikIsSubmitting ||
      (postType === "image" || postType === "video"
        ? activeTab === 1 && !values.media.some((m) => m.file)
        : false)
    );
  };

  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[2147483647] flex items-center justify-center p-2 sm:p-3 md:p-4 bg-black/50  backdrop-blur-sm overflow-y-auto pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            isolation: "isolate",
            contain: "layout paint size",
            transformStyle: "preserve-3d",
            position: "fixed",
            zIndex: 2147483647,
          }}
        >
          <Formik
            innerRef={formikRef}
            initialValues={getInitialValues(postType)}
            validationSchema={getValidationSchema(postType, activeTab)}
            onSubmit={handleSubmit}
            validateOnMount={false}
          >
            {({
              values,
              isValid,
              setFieldValue,
              isSubmitting: formikIsSubmitting,
            }) => (
              <motion.div
                ref={modalRef}
                className="relative flex flex-col w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto  bg-white shadow-xl dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden max-h-[90vh]"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    {getPostTypeIcon()}
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {`Create ${postType} Post`}
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-1 text-gray-600 transition bg-gray-100 rounded-full dark:text-gray-300 hover:text-gray-900 dark:hover:text-white dark:bg-gray-700"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </motion.button>
                </div>

                <div className="px-3 sm:px-4 pt-2 sm:pt-3">
                  <TabNavigation
                    postType={postType}
                    activeTab={activeTab}
                    setActiveTab={(tab) => setActiveTab(tab)}
                    nextDisabled={nextDisabled(formikIsSubmitting, values)}
                  />
                </div>

                <Form className="flex flex-col flex-1 min-h-0">
                  <div className="flex-1 px-4 sm:px-5 md:px-6 py-3 sm:py-4 overflow-y-auto">
                    <div className="min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
                      <AnimatePresence mode="wait">
                        {activeTab === 1 && (
                          <motion.div
                            key="tab1"
                            className="w-full h-full"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            {postType === "article" && <ArticleForm />}

                            {postType === "event" && <EventForm />}

                            {(postType === "image" || postType === "video") && (
                              <div className="flex flex-col w-full gap-4 sm:gap-6">
                                <UploadContent
                                  postType={postType}
                                  values={values}
                                  mediaPreview={mediaPreview}
                                  handleMediaUpload={handleMediaUpload}
                                  addMediaField={addMediaField}
                                  removeMediaField={removeMediaField}
                                  setFieldValue={setFieldValue}
                                />

                                {/* <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3 }}
                                  className="w-full"
                                >
                                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Write about your {postType}
                                  </label>
                                  <Field
                                    as="textarea"
                                    name="content"
                                    className="w-full h-20 sm:h-24 p-3 sm:p-4 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                                    placeholder={`Write about your ${postType.toLowerCase()}...`}
                                  />
                                </motion.div> */}

                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3 }}
                                  className="w-full"
                                >
                                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Tags (seperate by coma)
                                  </label>
                                  <Field
                                    type="text"
                                    name="tags"
                                    className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                    placeholder="tag1, tag2, tag3"
                                  />
                                </motion.div>
                              </div>
                            )}

                            {postType !== "event" &&
                              postType !== "article" &&
                              postType !== "image" &&
                              postType !== "video" && (
                                <TextPostForm postType={postType} />
                              )}
                          </motion.div>
                        )}

                        {activeTab === 2 && (
                          <motion.div
                            key="tab2"
                            className="w-full h-full"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            {postType === "image" || postType === "video" ? (
                              <div className="flex flex-col items-center w-full gap-4 sm:gap-6">
                                <div className="w-full p-4 sm:p-6 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800">
                                  <h3 className="flex items-center mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    <span className="mr-2">📋</span> Preview
                                    Your {postType}
                                  </h3>

                                  {mediaPreview &&
                                    mediaPreview.length > 0 &&
                                    values.media[0]?.type && (
                                      <div className="flex justify-center mb-3 sm:mb-4">
                                        {values.media[0].type === "image" ? (
                                          <img
                                            src={mediaPreview[0]}
                                            alt="Preview"
                                            className="object-contain rounded-lg shadow-md max-h-32 sm:max-h-48 md:max-h-64"
                                          />
                                        ) : (
                                          <video
                                            src={mediaPreview[0]}
                                            controls
                                            className="object-contain rounded-lg shadow-md max-h-32 sm:max-h-48 md:max-h-64"
                                          />
                                        )}
                                      </div>
                                    )}
                                  {values.media[0].caption && (
                                    <div className="p-3 sm:p-4 mb-3 sm:mb-4 bg-white rounded-md shadow-sm dark:bg-gray-700">
                                      <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap dark:text-gray-300">
                                        {values.media[0].caption}
                                      </p>
                                    </div>
                                  )}
                                  {/* {values.content && (
                                    <div className="p-3 sm:p-4 mb-3 sm:mb-4 bg-white rounded-md shadow-sm dark:bg-gray-700">
                                      <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap dark:text-gray-300">
                                        {values.content}
                                      </p>
                                    </div>
                                  )} */}

                                  <div className="flex items-center justify-between mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    <div className="space-y-2">
                                      <div className="flex items-center">
                                        <span className="px-2 py-1 mr-2 text-xs text-orange-800 bg-orange-100 rounded dark:bg-orange-900 dark:text-orange-200">
                                          {postType}
                                        </span>
                                      </div>
                                      <div>
                                        {values?.tags &&
                                          values?.tags
                                            ?.split(",")
                                            ?.map((tag, i) => (
                                              <span
                                                key={i}
                                                className="px-2 py-1 mr-2 text-xs text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-200"
                                              >
                                                #{tag.trim()}
                                              </span>
                                            ))}
                                      </div>
                                    </div>
                                    <span className="text-xs sm:text-sm">
                                      Ready to post
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <UploadContent
                                postType={postType}
                                values={values}
                                mediaPreview={mediaPreview}
                                handleMediaUpload={handleMediaUpload}
                                addMediaField={addMediaField}
                                removeMediaField={removeMediaField}
                                setFieldValue={setFieldValue}
                              />
                            )}
                          </motion.div>
                        )}

                        {activeTab === 3 &&
                          postType !== "image" &&
                          postType !== "video" && (
                            <motion.div
                              key="tab3"
                              className="w-full h-full"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <PreviewContent
                                postType={postType}
                                values={values}
                                mediaPreview={mediaPreview}
                              />
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex justify-between gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 border-t border-gray-200 dark:border-gray-700">
                    {activeTab > 1 &&
                      !(postType === "image" || postType === "video") && (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePrevTab}
                          className="flex items-center gap-2 px-4 sm:px-5 py-2 text-sm sm:text-base text-white transition duration-200 bg-gray-500 rounded-md dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700"
                        >
                          <motion.div
                            initial={{ x: 0 }}
                            animate={{ x: [-5, 0] }}
                            transition={{
                              repeat: Infinity,
                              repeatType: "reverse",
                              duration: 0.6,
                            }}
                          >
                            ← Previous
                          </motion.div>
                        </motion.button>
                      )}

                    {activeTab === 2 &&
                      (postType === "image" || postType === "video") && (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePrevTab}
                          className="flex items-center gap-2 px-4 sm:px-5 py-2 text-sm sm:text-base text-white transition duration-200 bg-gray-500 rounded-md dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700"
                        >
                          <motion.div
                            initial={{ x: 0 }}
                            animate={{ x: [-5, 0] }}
                            transition={{
                              repeat: Infinity,
                              repeatType: "reverse",
                              duration: 0.6,
                            }}
                          >
                            ← Previous
                          </motion.div>
                        </motion.button>
                      )}

                    {activeTab <
                      (postType === "image" || postType === "video"
                        ? 2
                        : 3) && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNextTab(isValid, values)}
                        className={`flex items-center gap-2 px-6 py-2.5 text-background bg-foreground rounded-lg hover:bg-foreground/80 disabled:opacity-50 disabled:cursor-not-allowed ${
                          (postType === "image" || postType === "video") &&
                          activeTab === 1
                            ? "ml-auto"
                            : ""
                        }`}
                        disabled={nextDisabled(formikIsSubmitting, values)}
                      >
                        {postType === "image" || postType === "video"
                          ? " Preview"
                          : "Next"}
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          →
                        </motion.div>
                      </motion.button>
                    )}

                    {activeTab ===
                      (postType === "image" || postType === "video"
                        ? 2
                        : 3) && (
                      <motion.button
                        type="button"
                        onClick={
                          postType === "article"
                            ? submitArticleDirectly
                            : handleManualSubmit
                        }
                        disabled={formikIsSubmitting || loading || blogLoading}
                        className={`
                                  ml-auto flex items-center gap-3 px-8 py-3 text-white font-medium rounded-lg shadow-lg disabled:bg-gray-500
                                  ${
                                    formikIsSubmitting
                                      ? "bg-green-400 dark:bg-green-600 cursor-not-allowed"
                                      : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                                  }
                                  transition-all duration-300
                                `}
                        whileHover={{
                          scale: formikIsSubmitting ? 1 : 1.05,
                        }}
                        whileTap={{
                          scale: formikIsSubmitting ? 1 : 0.95,
                        }}
                      >
                        {formikIsSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            Creating Post...
                          </>
                        ) : (
                          <>
                            <span>Post Now</span>
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.2 }}
                            >
                              →
                            </motion.span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </Form>
              </motion.div>
            )}
          </Formik>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PostUploadModal;
