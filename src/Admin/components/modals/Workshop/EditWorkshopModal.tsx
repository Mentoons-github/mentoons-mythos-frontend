import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { WorkshopI } from "../../../../types/redux/workshopInterface";
import { toast } from "sonner";
import { fileUploadThunk } from "../../../../features/upload/fileUploadThunk";
import { updateWorkshopThunk } from "../../../../features/workshop/workshopThunk";
import { resetWorkshopSlice } from "../../../../features/workshop/workshopSlice";

const EditWorkshopModal = ({
  onClose,
  workshop,
  loading,
}: {
  onClose: () => void;
  workshop: WorkshopI | null;
  loading: boolean;
}) => {
  const { updateLoading, updateSuccess, message, error } = useAppSelector(
    (state) => state.workshop
  );
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState<WorkshopI>({
    age: "",
    focus: "",
    amount: "",
    activities: [],
    img: "",
  });

  const [activitiesInput, setActivitiesInput] = useState("");

  useEffect(() => {
    if (workshop) {
      setForm({
        age: workshop.age,
        focus: workshop.focus,
        amount: workshop.amount,
        activities: workshop.activities || [],
        img: workshop.img,
      });
      setFile(null);
    }
  }, [workshop]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success(message);
      dispatch(resetWorkshopSlice());
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(resetWorkshopSlice());
    }
  }, [dispatch, error, message, onClose, updateSuccess]);

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
  const handleAddActivities = () => {
    if (activitiesInput.trim()) {
      setForm((prev) => ({
        ...prev,
        activities: [...prev.activities, activitiesInput.trim()],
      }));
      setActivitiesInput("");
    }
  };

  const handleRemoveActivitis = (index: number) => {
    setForm((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl: string | File | null = form.img;

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
      img: imageUrl as string,
    };

    dispatch(
      updateWorkshopThunk({
        workshop: formattedForm,
        workshopId: workshop?._id as string,
      })
    );
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40 italic">
      <div className="bg-[#6f6c6c] rounded-lg shadow-xl p-6 px-10 max-w-4xl w-full relative hide-scrollbar overflow-y-auto will-change-scroll transform-gpu max-h-[95vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black/50 hover:text-black text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-white border-b pb-2">
          Update Job
        </h2>

        {loading || !workshop ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading Job details...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div>
                  <label className="block mb-1 text-white">
                    Workshop Category
                  </label>
                  <select
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-black/90 border border-black text-white h-13"
                    required
                  >
                    <option value="">Select type</option>
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
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-black/90 border border-black text-white h-13"
                    placeholder="Enter amount"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-1 text-white">Activities</label>
                  <div className="flex gap-2">
                    <textarea
                      rows={3}
                      value={activitiesInput}
                      onChange={(e) => setActivitiesInput(e.target.value)}
                      className="flex-1 p-2 rounded-lg border border-black bg-black/90 text-white h-13 hide-scrollbar overflow-y-auto will-change-scroll transform-gpu"
                      placeholder="Enter Activities"
                    />
                    <button
                      type="button"
                      onClick={handleAddActivities}
                      className="bg-black/50 px-4 rounded-lg text-white"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {form.activities.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center bg-black/60 border border-white/30 rounded-lg px-3 py-2 text-white hide-scrollbar overflow-y-auto will-change-scroll transform-gpu"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveActivitis(i)}
                          className="ml-2 text-red-400 hover:text-red-600"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex justify-around ">
                <div>
                  <label className="block mb-1 text-white">Image</label>

                  <input
                    type="file"
                    accept="image/*"
                    id="imageUpload"
                    onChange={handleChange}
                    className="hidden"
                  />

                  <label
                    htmlFor="imageUpload"
                    className="inline-block bg-black hover:bg-black/80 text-white px-4 py-3 rounded-lg cursor-pointer h-13"
                  >
                    Change File
                  </label>

                  {(file || form.img) && (
                    <div className="mt-3 relative max-w-60 max-h-60">
                      <img
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : typeof form.img === "string"
                            ? form.img
                            : ""
                        }
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-white">Focus on</label>
              <textarea
                name="focus"
                value={form.focus}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 rounded-lg border border-black bg-black/90 text-white hide-scrollbar overflow-y-auto will-change-scroll transform-gpu"
                placeholder="Enter what focus on"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4"></div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#E39712] px-6 py-2 rounded font-semibold text-white hover:bg-[#d58c0d]"
            >
              {updateLoading ? "Updating.." : " Edit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditWorkshopModal;
