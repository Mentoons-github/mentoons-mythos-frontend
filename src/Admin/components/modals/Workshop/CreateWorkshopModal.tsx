import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { fileUploadThunk } from "../../../../features/upload/fileUploadThunk";
import { toast } from "sonner";
import { addWorkshopThunk } from "../../../../features/workshop/workshopThunk";
import { resetWorkshopSlice } from "../../../../features/workshop/workshopSlice";

interface JobForm {
  age: string;
  focus: string;
  amount: string;
  activities: string[];
  img: string | File;
}

const CreateWorkshopModal = ({ onClose }: { onClose: () => void }) => {
  const { file: uploadedImage } = useAppSelector((state) => state.upload);
  const { message, addWorkshopSuccess, error, loading } = useAppSelector(
    (state) => state.workshop
  );
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<JobForm>({
    age: "",
    focus: "",
    amount: "",
    activities: [],
    img: "",
  });

  const [activitiesInput, setActivitiesInput] = useState("");

  useEffect(() => {
    if (addWorkshopSuccess) {
      toast.success(message);
      onClose();
      dispatch(resetWorkshopSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetWorkshopSlice());
    }
  }, [addWorkshopSuccess, dispatch, error, message, onClose]);

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
      setForm((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  // add skill
  const handleActivities = () => {
    if (activitiesInput.trim()) {
      setForm((prev) => ({
        ...prev,
        activities: [...prev.activities, activitiesInput.trim()],
      }));
      setActivitiesInput("");
    }
  };

  const handleRemoveActivities = (index: number) => {
    setForm((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = uploadedImage;

    if (file) {
      try {
        imageUrl = await dispatch(
          fileUploadThunk({ file, category: "job" })
        ).unwrap();
      } catch (err) {
        alert("File upload failed: " + err);
        return;
      }
    }

    const formattedForm = {
      ...form,
      amount: Number(form.amount),
      img: imageUrl as string,
    };

    console.log("Form submitted:", formattedForm);

    dispatch(addWorkshopThunk(formattedForm));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40 italic">
      <div className="bg-gradient-to-t from-[#141414] to-[#2b2b2b] rounded-lg shadow-xl p-6 px-10 max-w-4xl w-full relative hide-scrollbar overflow-y-auto will-change-scroll transform-gpu max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4 text-white border-b pb-2">
          Create New Workshop
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-white">Job Type</label>
              <select
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-black/90 border border-black text-white h-13"
                required
              >
                <option value="">Select age</option>
                <option value="6-12">6-12</option>
                <option value="13-19">13-19</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-white">Amount</label>
              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setForm({ ...form, amount: value });
                  }
                }}
                className="w-full p-2 rounded-lg bg-black/90 border border-black text-white h-13"
                placeholder="Enter amount"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-white">Workshop Focus</label>
            <textarea
              name="focus"
              value={form.focus}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 rounded-lg border border-black bg-black/90 text-white hide-scrollbar overflow-y-auto will-change-scroll transform-gpu"
              placeholder="Enter what workshop focusing"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-white">Activities</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={activitiesInput}
                  onChange={(e) => setActivitiesInput(e.target.value)}
                  className="w-full p-2 rounded-lg bg-black/90 border border-black text-white h-13"
                  placeholder="Enter Activities"
                />
                <button
                  type="button"
                  onClick={handleActivities}
                  className="bg-black/50 px-4 rounded-lg text-white"
                >
                  Add
                </button>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {form.activities?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center bg-black/60 border border-white/30 rounded-lg px-3 py-2 text-white"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveActivities(i)}
                      className="ml-2 text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <label htmlFor="imageUpload" className="block mb-1 text-white">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-black/90 border border-black text-white h-13"
                required
              />

              {file && typeof file !== "string" && (
                <div className="mt-3 relative w-32 h-20">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  {/* Close/Remove button */}
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full px-2 py-0.5 text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#E39712] px-6 py-2 rounded font-semibold text-white hover:bg-[#d58c0d]"
          >
            {loading ? "Adding new Workshop" : " Save Workshop"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkshopModal;
