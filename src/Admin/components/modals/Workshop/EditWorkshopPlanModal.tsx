import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { WorkshopPlan } from "../../../../types/workshop/workshopPlan";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
  plan?: WorkshopPlan | null;
  handleSubmit: (editedPlan: WorkshopPlan, validateForm: () => boolean) => void;
  loading: boolean;
}

const EditWorkshopPlanModal = ({
  onClose,
  plan,
  handleSubmit,
  loading,
}: Props) => {
  const [form, setForm] = useState<WorkshopPlan>({
    title: "",
    ageGroups: [],
    duration: "",
    features: [],
    highlight: false,
    materials: [],
    mode: [],
    months: "",
    price: "",
    totalSessions: "",
  });

  useEffect(() => {
    if (plan) {
      setForm({
        title: plan.title,
        ageGroups: plan.ageGroups,
        duration: plan.duration,
        features: plan.features,
        highlight: plan.highlight,
        materials: plan.materials,
        mode: plan.mode,
        months: plan.months,
        price: plan.price,
        totalSessions: plan.totalSessions,
      });
    }
  }, [plan]);

  const isChanged =
    JSON.stringify({
      title: plan?.title,
      ageGroups: plan?.ageGroups,
      duration: plan?.duration,
      features: plan?.features,
      highlight: plan?.highlight,
      materials: plan?.materials,
      mode: plan?.mode,
      months: plan?.months,
      price: plan?.price,
      totalSessions: plan?.totalSessions,
    }) !==
    JSON.stringify({
      title: form.title,
      ageGroups: form.ageGroups,
      duration: form.duration,
      features: form.features,
      highlight: form.highlight,
      materials: form.materials,
      mode: form.mode,
      months: form.months,
      price: form.price,
      totalSessions: form.totalSessions,
    });

  const validateForm = () => {
    // title
    if (!form.title.trim()) {
      toast.error("Workshop title is required");
      return false;
    }

    if (form.title.trim().length < 3) {
      toast.error("Workshop title must contain at least 3 characters");
      return false;
    }

    // price
    if (!form.price.trim()) {
      toast.error("Price is required");
      return false;
    }

    if (isNaN(Number(form.price))) {
      toast.error("Price must be a valid number");
      return false;
    }

    if (Number(form.price) <= 0) {
      toast.error("Price must be greater than 0");
      return false;
    }

    // duration
    if (!form.duration.trim()) {
      toast.error("Duration is required");
      return false;
    }

    // total sessions
    if (!form.totalSessions.trim()) {
      toast.error("Total sessions is required");
      return false;
    }

    if (isNaN(Number(form.totalSessions))) {
      toast.error("Total sessions must be a number");
      return false;
    }

    if (Number(form.totalSessions) <= 0) {
      toast.error("Total sessions must be greater than 0");
      return false;
    }

    // months
    if (!form.months.trim()) {
      toast.error("Months field is required");
      return false;
    }

    if (isNaN(Number(form.months))) {
      toast.error("Months must be a number");
      return false;
    }

    // age groups
    if (form.ageGroups.length === 0) {
      toast.error("Select at least one age group");
      return false;
    }

    // mode
    if (form.mode.length === 0) {
      toast.error("Select at least one workshop mode");
      return false;
    }

    // features
    if (form.features.length === 0) {
      toast.error("Add at least one feature/activity");
      return false;
    }

    // materials
    if (form.materials.length === 0) {
      toast.error("Add at least one material");
      return false;
    }

    return true;
  };

  const [featuresInput, setFeaturesInput] = useState("");
  const [materialsInput, setMaterialsInput] = useState("");

  // Handle normal inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle multi select fields
  const handleArraySelect = (field: "ageGroups" | "mode", value: string) => {
    setForm((prev) => {
      const exists = prev[field].includes(value);

      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((item) => item !== value)
          : [...prev[field], value],
      };
    });
  };

  // Add Features
  const handleAddFeature = () => {
    if (featuresInput.trim()) {
      setForm((prev) => ({
        ...prev,
        features: [...prev.features, featuresInput],
      }));
      setFeaturesInput("");
    }
  };

  // Remove Features
  const handleRemoveFeature = (index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // Add Materials
  const handleAddMaterial = () => {
    if (materialsInput.trim()) {
      setForm((prev) => ({
        ...prev,
        materials: [...prev.materials, materialsInput],
      }));
      setMaterialsInput("");
    }
  };

  // Remove Materials
  const handleRemoveMaterial = (index: number) => {
    setForm((prev) => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-secondary shadow-2xl p-5 md:p-8 hide-scrollbar">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-muted-foreground"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Edit Workshop Plan
          </h2>
          <p className="text-muted-foreground mt-1">
            Edit workshop plan details
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form, validateForm);
          }}
          className="space-y-6"
        >
          {/* Basic Fields */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">Workshop Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter workshop title"
                className="w-full border rounded-xl p-3 bg-background"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Price</label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full border rounded-xl p-3 bg-background"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Duration</label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Eg: 12 Weeks"
                className="w-full border rounded-xl p-3 bg-background"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Total Sessions</label>
              <input
                type="text"
                name="totalSessions"
                value={form.totalSessions}
                onChange={handleChange}
                placeholder="Eg: 26 Sessions"
                className="w-full border rounded-xl p-3 bg-background"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Months</label>
              <input
                type="text"
                name="months"
                value={form.months}
                onChange={handleChange}
                placeholder="Eg: 3 Months"
                className="w-full border rounded-xl p-3 bg-background"
                required
              />
            </div>
          </div>

          {/* Age Groups */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-3 font-medium">Age Groups</label>

              <div className="flex flex-wrap gap-3">
                {["6-12", "13-19", "20+"].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => handleArraySelect("ageGroups", age)}
                    className={`px-4 py-2 rounded-xl border transition ${
                      form.ageGroups.includes(age)
                        ? "bg-primary text-white border-primary"
                        : "bg-background"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div>
              <label className="block mb-3 font-medium">Workshop Mode</label>

              <div className="flex flex-wrap gap-3">
                {["Online", "Offline", "Hybrid"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleArraySelect("mode", mode)}
                    className={`px-4 py-2 rounded-xl border transition ${
                      form.mode.includes(mode)
                        ? "bg-primary text-white border-primary"
                        : "bg-background"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Highlight */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="highlight"
              checked={form.highlight}
              onChange={handleChange}
              className="h-5 w-5"
            />

            <label className="font-medium">Mark as Highlight Workshop</label>
          </div>

          {/* Features */}
          <div>
            <label className="block mb-2 font-medium">
              Features / Activities
            </label>

            <div className="flex gap-3">
              <input
                type="text"
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="Enter feature"
                className="w-full border rounded-xl p-3 bg-background"
              />

              <button
                type="button"
                onClick={handleAddFeature}
                className="px-5 rounded-xl bg-primary text-white"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {form.features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 text-primary"
                >
                  <span>{item}</span>

                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <label className="block mb-2 font-medium">Materials Included</label>

            <div className="flex gap-3">
              <input
                type="text"
                value={materialsInput}
                onChange={(e) => setMaterialsInput(e.target.value)}
                placeholder="Enter material"
                className="w-full border rounded-xl p-3 bg-background"
              />

              <button
                type="button"
                onClick={handleAddMaterial}
                className="px-5 rounded-xl bg-primary text-white"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {form.materials.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 text-green-600"
                >
                  <span>{item}</span>

                  <button
                    type="button"
                    onClick={() => handleRemoveMaterial(index)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <button
              disabled={!isChanged || loading}
              type="submit"
              className={`px-6 py-3 rounded-xl ${
                !isChanged || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-700 text-white hover:bg-blue-600"
              }  font-medium  transition`}
            >
              {loading ? "Updating Plan" : "Update Workshop Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkshopPlanModal;
