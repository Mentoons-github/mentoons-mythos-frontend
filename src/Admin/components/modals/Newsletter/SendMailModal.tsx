import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { sendMessageToMailThunk } from "../../../../features/about&newsletter/about&newsletterThunk";
import { toast } from "sonner";

const SendMailModal = ({
  onClose,
  emails,
}: {
  onClose: () => void;
  emails: string[];
}) => {
  const dispatch = useAppDispatch();
  const { sendMessageLoading } = useAppSelector(
    (state) => state.about_newsletter
  );

  const [input, setInput] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    setInput((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { emails, ...input };

    try {
      const message = await dispatch(sendMessageToMailThunk(data)).unwrap();
      toast.success(message);
      setInput({
        subject: "",
        message: "",
      });
      onClose();
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 ">
      <div className="bg-secondary hide-scrollbar will-change-scroll w-full transform-gpu rounded-lg shadow-xl p-4 md:p-6 md:px-10 max-w-[350px] md:max-w-xl relative overflow-y-auto hide-scrollbar max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-muted-foreground"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4  border-b pb-2">
          Send News
        </h2>

        <div className="p- w-full items-center flex flex-col ">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex w-full flex-col md:w-lg  md:p-4  rounded-lg "
          >
            <div>
              <label className="block mb-1 ">Subject</label>
              <input
                type="text"
                name="subject"
                value={input.subject}
                onChange={handleChange}
                className="w-full p-2 h-13 rounded-lg border "
                required
                placeholder="Enter the subject"
              />
            </div>

            <div>
              <label className="block mb-1 ">Message</label>
              <textarea
                rows={5}
                name="message"
                value={input.message}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border "
                required
                placeholder="Enter message"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-800 px-6 py-2 rounded font-semibold hover:bg-blue-700 text-white"
            >
              {sendMessageLoading ? "Sending message..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMailModal;
