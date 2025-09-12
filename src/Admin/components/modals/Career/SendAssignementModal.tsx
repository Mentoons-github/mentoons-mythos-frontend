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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40">
      <div className="bg-[#6f6c6c] rounded-lg shadow-xl p-6 px-10 max-w-2xl relative overflow-y-auto hide-scrollbar max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black/70 hover:text-black text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-white border-b pb-2">
          Send Assignment
        </h2>

        <div className="p-4 w-full items-center flex flex-col text-black">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col w-lg  p-4  rounded-lg "
          >
            <div>
              <label className="block mb-1 text-white">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={input.dueDate}
                onChange={handleChange}
                className="w-full p-2 h-13 rounded-lg border border-gray-400 bg-black/90 text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-white">Due Time</label>
              <input
                type="time"
                name="dueTime"
                value={input.dueTime}
                onChange={handleChange}
                className="w-full p-2 h-13 rounded-lg border border-gray-400 bg-black/90 text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-white">
                Figma Link (optional)
              </label>
              <input
                type="text"
                name="link"
                value={input.link}
                onChange={handleChange}
                placeholder="https://www.figma.com/file/..."
                className="w-full p-2 h-13 rounded-lg border border-gray-400 bg-black/90 text-white"
              />
            </div>

            <div>
              <label htmlFor="fileUpload" className="block mb-1 text-white">
                Assignment File
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.zip"
                id="fileUpload"
                onChange={handleChange}
                className="w-full p-2 h-13 rounded-lg bg-black/90 border border-gray-400 text-white"
                required
              />
              {file && (
                <p className="mt-2 text-sm text-white">
                  Selected File:{" "}
                  <span className="font-medium">{file.name}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#E39712] px-6 py-2 rounded font-semibold hover:bg-[#d58c0d] text-white"
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
