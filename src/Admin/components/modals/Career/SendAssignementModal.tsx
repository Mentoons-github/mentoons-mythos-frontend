import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { fileUploadThunk } from "../../../../features/upload/fileUploadThunk";
import { sendAssignementsThunk } from "../../../../features/career/careerThunk";
import { formatDate, formatTime } from "../../../../utils/DateFormate";
import { Career } from "../../../../types/redux/careerInterface";
import { toast } from "sonner";
import { resetCareerSlice } from "../../../../features/career/careerSlice";

const SendAssignementModal = ({
  onClose,
  appDetails,
  jobTitle,
  onSelectClose,
  onFilterClose,
}: {
  onClose: () => void;
  appDetails: Career[];
  jobTitle: string;
  onSelectClose: () => void;
  onFilterClose: () => void;
}) => {
  const { file: uploadedFile } = useAppSelector((state) => state.upload);
  const { assignementMessage, assignementSuccess, error } = useAppSelector(
    (state) => state.career
  );
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [input, setInput] = useState({
    dueDate: "",
    dueTime: "",
    link: "",
    fileUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    if (
      target instanceof HTMLInputElement &&
      target.type === "file" &&
      target.files?.[0]
    ) {
      setFile(target.files[0]);
    } else {
      setInput((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  useEffect(() => {
    if (assignementSuccess) {
      toast.success(assignementMessage);
      dispatch(resetCareerSlice());
      onClose();
      onFilterClose();
      onSelectClose();
    }
    if (error) toast.error(error);
    dispatch(resetCareerSlice());
  }, [
    assignementMessage,
    assignementSuccess,
    dispatch,
    error,
    onClose,
    onFilterClose,
    onSelectClose,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let fileUrl = uploadedFile;

    if (file) {
      try {
        fileUrl = await dispatch(
          fileUploadThunk({ file, category: "job" })
        ).unwrap();
      } catch (err) {
        alert("File upload failed: " + err);
        return;
      }
    }

    const formattedForm = {
      appDetails,
      jobTitle,
      link: input.link,
      dueDate: formatDate(input.dueDate),
      dueTime: formatTime(input.dueTime),
      fileUrl: fileUrl as string,
    };

    console.log("Form submitted:", formattedForm);

    dispatch(sendAssignementsThunk(formattedForm));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 ">
      <div className="bg-secondary rounded-lg shadow-xl p-4 md:p-6 md:px-10 max-w-[350px] md:max-w-2xl relative overflow-y-auto hide-scrollbar max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2  hover:text-muted-foreground text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl md:text-2xl font-semibold mb-4 border-b pb-2">
          Send Assignment
        </h2>

        <div className="md:p-4 w-full items-center flex flex-col">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col md:w-2xl  md:p-4 md:px-10 rounded-lg "
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div className="">
                <label className="block mb-1 font-semibold">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={input.dueDate}
                  onChange={handleChange}
                  className="w-full p-2 h-13 rounded-lg border bg-secondary text-foreground [color-scheme:light] dark:[color-scheme:dark]"
                  required
                />
              </div>
              <div className="">
                <label className="block mb-1 font-semibold">Due Time</label>
                <input
                  type="time"
                  name="dueTime"
                  value={input.dueTime}
                  onChange={handleChange}
                  className="w-full p-2 h-13 rounded-lg border bg-secondary text-foreground [color-scheme:light] dark:[color-scheme:dark]"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="">
                <label className="block mb-1 font-semibold">
                  Figma Link (optional)
                </label>
                <input
                  type="text"
                  name="link"
                  value={input.link}
                  onChange={handleChange}
                  placeholder="https://www.figma.com/file/..."
                  className="w-full p-2 h-13 rounded-lg border "
                />
              </div>

              <div className="">
                <label
                  htmlFor="fileUpload"
                  className="block mb-1 font-semibold"
                >
                  Assignment File
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.zip"
                  id="fileUpload"
                  onChange={handleChange}
                  className="w-full p-2 h-13 rounded-lg  border"
                  required
                />
                {file && (
                  <p className="mt-2 text-sm ">
                    Selected File:{" "}
                    <span className="font-medium">{file.name}</span>
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-800 px-6 py-2 rounded font-semibold hover:bg-blue-700 text-white"
            >
              Send Assignment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendAssignementModal;
