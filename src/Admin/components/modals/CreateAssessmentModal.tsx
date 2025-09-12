import { useEffect, useState } from "react";

import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { resetAssessmentSlice } from "../../../features/assessment/assessmentSlice";
import { assessmentQuestionThunk } from "../../../features/assessment/assessmentThunk";

const CreateAssessmentModal = ({ onClose }: { onClose: () => void }) => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [optionInput, setOptionInput] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const {
    message,
    success,
    error: assessmentError,
  } = useAppSelector((state) => state.assessment);

  const nameOptions: Record<string, string[]> = {
    Psychology: [
      "Sports",
      "Music",
      "Linguistic",
      "Logical",
      "Spatial",
      "InterPersonal",
      "IntraPersonal",
      "Naturalistic",
      "Existential",
    ],
    Astrology: [
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces",
    ],
  };

  useEffect(() => {
    if (success) {
      toast.success(message);
      setType("");
      setName("");
      setQuestion("");
      setOptions([]);
      setOptionInput("");
      setError("");
      dispatch(resetAssessmentSlice());
    }
    if (assessmentError) {
      toast.error(assessmentError);
      dispatch(resetAssessmentSlice());
    }
  }, [assessmentError, dispatch, message, success]);

  const handleAddOption = () => {
    if (!optionInput.trim()) return;
    if (options.length >= 5) {
      setError("You can add a maximum of 5 options.");
      return;
    }
    setOptions([...options, optionInput.trim()]);
    setOptionInput("");
    setError("");
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (options.length < 3) {
      setError("At least 3 options are required.");
      return;
    }

    setError("");
    console.log({
      type,
      name,
      question,
      options,
    });

    dispatch(assessmentQuestionThunk({ type, name, question, options }));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40 italic text-white">
      <div className="bg-gradient-to-t from-[#141414] to-[#2b2b2b] rounded-lg shadow-xl p-6 px-20 max-w-3xl relative overflow-y-auto hide-scrollbar max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4 text-white border-b pb-2">
          Create new assessment question
        </h2>

        <div className=" p-6 w-full items-center flex flex-col ">
          <form
            onSubmit={handleSubmit}
            className="space-y-3 flex flex-col w-lg p-6 shadow-2xl rounded-lg"
          >
            {/* Type */}
            <div>
              <label className="block mb-1">Type</label>
              <select
                value={type}
                required
                onChange={(e) => {
                  setType(e.target.value);
                  setName("");
                }}
                className="w-full p-2 rounded-lg bg-black/90 border border-black text-white h-12 "
              >
                <option value="">Select Assessment Type</option>
                <option value="Psychology">Psychology</option>
                <option value="Astrology">Astrology</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block mb-1">Name</label>
              <select
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={!type}
                className={`w-full p-2 rounded-lg border border-black h-12 bg-black/90 text-white`}
              >
                <option value="">Select Assessment Name</option>
                {type &&
                  nameOptions[type]?.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
              </select>
            </div>

            {/* Question */}
            <div>
              <label className="block mb-1">Question</label>
              <textarea
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-2 rounded-lg border border-black bg-black/90 text-white placeholder-gray-400"
                placeholder="Enter question"
                required
              />
            </div>

            {/* Options */}
            <div>
              <label className="block mb-1">Options</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                  className="flex-1 p-2 rounded-lg border border-black bg-black/90 text-white placeholder-gray-400 h-12"
                  placeholder="Enter option"
                />
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="bg-black/50 px-4 rounded-lg "
                >
                  Add
                </button>
              </div>

              {/* Display options nicely */}
              <ul className="mt-3 space-x-2 flex ">
                {options.map((opt, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-black/60 border border-white/30 rounded-lg p-2 space-x-2"
                  >
                    <span>{opt}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(i)}
                      className="text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              {/* Error message */}
              {error && <p className="text-red-400 mt-2">{error}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#E39712] px-6 py-2 rounded font-semibold hover:bg-[#d58c0d]"
            >
              Save Assessment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssessmentModal;
