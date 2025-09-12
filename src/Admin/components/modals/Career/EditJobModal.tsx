import { useEffect, useState } from "react";
import { IJobs } from "../../../../types/redux/careerInterface";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { updateJobThunk } from "../../../../features/career/careerThunk";
import { fileUploadThunk } from "../../../../features/upload/fileUploadThunk";
import { toast } from "sonner";
import { resetCareerSlice } from "../../../../features/career/careerSlice";
interface JobForm {
  jobTitle: string;
  jobDescription: string;
  jobLocation: string;
  jobType: string;
  status: string;
  skillsRequired: string[];
  responsibilities: string[];
  requirements: string[];
  thumbnail: string | File;
  endDescription?: string;
}

const EditJobModal = ({
  onClose,
  job,
  loading,
}: {
  onClose: () => void;
  job: IJobs | null;
  loading: boolean;
}) => {
  const { updateLoading, updateSuccess, message, error } = useAppSelector(
    (state) => state.career
  );
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState<JobForm>({
    jobTitle: "",
    jobDescription: "",
    jobLocation: "",
    jobType: "",
    status: "",
    skillsRequired: [],
    responsibilities: [],
    requirements: [],
    thumbnail: "",
    endDescription: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [requirementInput, setRequirementInput] = useState("");

  useEffect(() => {
    if (job) {
      setForm({
        jobTitle: job.jobTitle,
        jobDescription: job.jobDescription,
        jobLocation: job.jobLocation,
        jobType: job.jobType,
        status: job.status,
        skillsRequired: job.skillsRequired || [],
        requirements: job.requirements || [],
        responsibilities: job.responsibilities || [],
        thumbnail: job.thumbnail,
        endDescription: job?.endDescription??"",
      });
      setFile(null);
    }
  }, [job]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success(message);
      dispatch(resetCareerSlice());
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(resetCareerSlice());
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
  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setForm((prev) => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setForm((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((_, i) => i !== index),
    }));
  };

  // Responsibilities
  const handleAddResponsibility = () => {
    if (responsibilityInput.trim()) {
      setForm((prev) => ({
        ...prev,
        responsibilities: [
          ...prev.responsibilities,
          responsibilityInput.trim(),
        ],
      }));
      setResponsibilityInput("");
    }
  };

  const handleRemoveResponsibility = (index: number) => {
    setForm((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  // Requirements
  const handleAddRequirement = () => {
    if (requirementInput.trim()) {
      setForm((prev) => ({
        ...prev,
        requirements: [...prev.requirements, requirementInput.trim()],
      }));
      setRequirementInput("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setForm((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl: string | File | null = form.thumbnail;

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
      thumbnail: imageUrl as string,
    };

    dispatch(
      updateJobThunk({ updatedJob: formattedForm, jobId: job?._id as string })
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

        {loading || !job ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading Job details...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-white">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black/90 border border-black text-white h-13"
                  placeholder="Enter job title"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-white">Job Type</label>
                <select
                  name="jobType"
                  value={form.jobType}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black/90 border border-black text-white h-13"
                  required
                >
                  <option value="">Select type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-white">Job Description</label>
              <textarea
                name="jobDescription"
                value={form.jobDescription}
                onChange={handleChange}
                rows={7}
                className="w-full p-2 rounded-lg border border-black bg-black/90 text-white hide-scrollbar overflow-y-auto will-change-scroll transform-gpu"
                placeholder="Enter job description"
                required
              />
            </div>

            <div>
              {/* Responsibilities */}
              <div className="mt-4">
                <label className="block mb-1 text-white">
                  Responsibilities
                </label>
                <div className="flex gap-2">
                  <textarea
                    rows={3}
                    value={responsibilityInput}
                    onChange={(e) => setResponsibilityInput(e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-black bg-black/90 text-white h-13 hide-scrollbar overflow-y-auto will-change-scroll transform-gpu"
                    placeholder="Enter responsibility"
                  />
                  <button
                    type="button"
                    onClick={handleAddResponsibility}
                    className="bg-black/50 px-4 rounded-lg text-white"
                  >
                    Add
                  </button>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {form.responsibilities.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center bg-black/60 border border-white/30 rounded-lg px-3 py-2 text-white hide-scrollbar overflow-y-auto will-change-scroll transform-gpu"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResponsibility(i)}
                        className="ml-2 text-red-400 hover:text-red-600"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mt-4">
                <label className="block mb-1 text-white">Requirements</label>
                <div className="flex gap-2">
                  <textarea
                    rows={3}
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-black bg-black/90 text-white h-13 hide-scrollbar overflow-y-auto will-change-scroll transform-gpu"
                    placeholder="Enter requirement"
                  />
                  <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="bg-black/50 px-4 rounded-lg text-white"
                  >
                    Add
                  </button>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {form.requirements.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center bg-black/60 border border-white/30 rounded-lg px-3 py-2 text-white"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRequirement(i)}
                        className="ml-2 text-red-400 hover:text-red-600"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-white">
                Description Last Words
              </label>
              <textarea
                name="endDescription"
                value={form.endDescription}
                onChange={handleChange}
                rows={7}
                className="w-full p-2 rounded-lg border border-black bg-black/90 text-white hide-scrollbar overflow-y-auto will-change-scroll transform-gpu"
                placeholder="Enter last job description"
              />
            </div>

            {/* Location + Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className=" gap-4">
                <div>
                  <label className="block mb-1 text-white">Location</label>
                  <select
                    name="jobLocation"
                    value={form.jobLocation}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-black/90 border border-black text-white h-13"
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="On-site">On-site</option>
                    <option value="Work from home">Work from home</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-white">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-black/90 border border-black text-white h-13"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Pause">Pause</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-white">
                    Skills Required
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      className="flex-1 p-2 rounded-lg border border-black bg-black/90 text-white h-13"
                      placeholder="Enter skill"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="bg-black/50 px-4 rounded-lg text-white"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {form.skillsRequired.map((skill, i) =>
                      skill ? (
                        <li
                          key={i}
                          className="flex items-center bg-black/60 border border-white/30 rounded-lg px-3 py-2 text-white"
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(i)}
                            className="ml-2 text-red-400 hover:text-red-600"
                          >
                            ✕
                          </button>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </div>

              <div className="flex justify-around ">
                <div>
                  <label className="block mb-1 text-white">Thumbnail</label>

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

                  {(file || form.thumbnail) && (
                    <div className="mt-3 relative max-w-48 max-h-24">
                      <img
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : typeof form.thumbnail === "string"
                            ? form.thumbnail
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

export default EditJobModal;
