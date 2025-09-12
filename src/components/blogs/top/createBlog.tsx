import { motion } from "framer-motion";
import { LuImage } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { createBlogThunk } from "../../../features/blog/blogThunk";
import { useEffect, useState } from "react";
import { resetBlogSlice } from "../../../features/blog/blogSlice";
import { fileUploadThunk } from "../../../features/upload/fileUploadThunk";
import useSignInSignUp from "../../../hooks/useSignInSignUpModal";
import { toast } from "sonner";

const CreateBlog = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch();
  const { showModal } = useSignInSignUp();
  const { file: uploadedImage } = useAppSelector((state) => state.upload);

  const [file, setFile] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);

  const [input, setInput] = useState({
    title: "",
    tags: "",
    description: "",
    commentsOff: false,
  });
  const { error, loading, message, createblogSuccess } = useAppSelector(
    (state) => state.blog
  );

  const wordCount = input.description.trim().split(/\s+/).length;

  useEffect(() => {
    if (createblogSuccess) {
      toast.success(message);
      dispatch(resetBlogSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetBlogSlice());
    }
  }, [createblogSuccess, dispatch, error, message]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "description") {
      const words = value.trim().split(/\s+/).filter(Boolean);
      if (words.length > 500) return;
    }

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      showModal("Blog");
      setInput({ description: "", title: "", tags: "", commentsOff: false });
      return;
    }

    let imageUrl = uploadedImage;

    if (file) {
      try {
        imageUrl = await dispatch(
          fileUploadThunk({ file, category: "blog" })
        ).unwrap();
      } catch (err) {
        alert("File upload failed: " + err);
        return;
      }
    }
    const formattedInput = {
      ...input,
      file: imageUrl ?? undefined,
      tags: input.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    };

    dispatch(createBlogThunk(formattedInput));
    setFile(null);
    setInput({ description: "", title: "", tags: "", commentsOff: false });
  };

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.h1
        className=" text-2xl md:text-3xl ml-3 md:ml-0 font-medium mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Create Your Blog Post
      </motion.h1>

      <motion.div
        className="w-full min-h-44 bg-[#E4E4E4] p-3 rounded-md flex flex-col justify-between"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div className="flex flex-col md:flex-row md:gap-4 ">
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              maxLength={60} 
              className="bg-white p-3 rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E39712]"
            />

            <input
              type="text"
              name="tags"
              value={input.tags}
              onChange={handleChange}
              placeholder="Enter Tags separate by coma(e.g. tech,react,ui)"
              className="bg-white p-3 rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E39712] mt-3 md:mt-0"
            />
          </div>

          {/* Description Area */}
          <motion.div className="relative w-full">
            <div className="relative">
              <div className="relative ">
                <textarea
                  name="description"
                  rows={5}
                  className="bg-white p-4 pr-4 pl-4 pb-12 rounded resize-none w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E39712]"
                  onChange={handleChange}
                  placeholder="Start writing your thoughts here..."
                  onFocus={() => setTouched(true)}
                  value={input.description}
                ></textarea>
                <p className="text-sm text-gray-500 text-right absolute bottom-2 right-2">
                  {input.description.trim().split(/\s+/).filter(Boolean).length}{" "}
                  / 500
                </p>
              </div>

              {touched && wordCount < 20 && (
                <p className="text-red-500 text-xs mt-1">
                  Minimum 20 words required
                </p>
              )}

              {wordCount > 500 && (
                <p className="text-red-500 text-xs mt-1">
                  Maximum 250 words allowed
                </p>
              )}
            </div>

            <motion.div
              className="absolute left-4 -bottom-10 flex gap-4 text-gray-500 text-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) {
                    setFile(selected);
                  }
                }}
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                <LuImage className="text-black md:text-2xl" />
              </label>
              {/* <BiVideoRecording className="cursor-pointer text-black md:text-2xl" />
              <TfiMicrophone className="cursor-pointer text-black md:text-2xl" /> */}
            </motion.div>
          </motion.div>

          {file && (
            <div
              className="absolute mt-4 bottom-0 left-0 overflow-hidden group cursor-pointer"
              onClick={() => document.getElementById("imageUpload")?.click()}
            >
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="rounded-md max-w-[200px] max-h-[200px] object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="absolute top-1 right-1 bg-white text-black rounded-full p-1 text-sm shadow-md hover:bg-red-500 hover:text-white transition-all"
              >
                ❌
              </button>
            </div>
          )}

          <motion.div
            className="flex flex-col gap-2 md:mt-4 items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Checkbox aligned to right */}
            {input.description.trim() !== "" &&
              input.title.trim() !== "" &&
              wordCount >= 20 &&
              wordCount <= 250 && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="commentsOff"
                    name="commentsOff"
                    checked={input.commentsOff}
                    onChange={(e) =>
                      setInput((prev) => ({
                        ...prev,
                        commentsOff: e.target.checked,
                      }))
                    }
                    className="accent-[#E39712] w-4 h-4"
                  />
                  <label
                    htmlFor="commentsOff"
                    className="text-sm text-gray-700"
                  >
                    Turn off comments for this blog
                  </label>
                </div>
              )}
            {/* Buttons aligned to right */}
            <div className="flex gap-4">
              {/* <button
                type="button"
                className="text-[#E39712] font-medium hover:underline"
              >
                Post Later
              </button> */}
              <motion.button
                disabled={
                  input.description.trim() === "" ||
                  input.title.trim() === "" ||
                  wordCount < 20 ||
                  wordCount > 250
                }
                type="submit"
                className="bg-[#E39712] px-6 py-2 disabled:bg-[rgb(219,179,111)] text-white rounded hover:bg-[#d3860f]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? "Loading..." : "Post"}
              </motion.button>
            </div>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateBlog;
