import { useParams } from "react-router-dom";
import AdminAssessment from "../AdminAssessment";
import { INTELLIGENCE } from "../../../constants/intelligence";
import { SUNSHINE } from "../../../constants";
import { Intelligence } from "../../../types/psychology";
import { Sunshine } from "../../../types/interface";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { assessmentFetchThunk } from "../../../features/assessment/assessmentThunk";
import { useState } from "react";
import SingleAssessementModal from "../../components/modals/SingleAssessementModal";

const datasets: Record<string, Intelligence[] | Sunshine[]> = {
  psychology: INTELLIGENCE,
  astrology: SUNSHINE,
};

const AssessmentPage = () => {
  const { type } = useParams<{ type: string }>();
  const data = datasets[type?.toLowerCase() || ""] || [];
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { assessmentQusetion, loading } = useAppSelector(
    (state) => state.assessment
  );

  const handleClick = (name: string) => {
    dispatch(assessmentFetchThunk(name));
    setModalOpen(true);
  };

  return (
    <div className="text-white">
      <AdminAssessment type={type || ""} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2 ">
        {data.map((item, ind) => (
          <div
            onClick={() => handleClick(item.name)}
            key={ind}
            className="flex flex-col items-center justify-center p-4 rounded-xl shadow-md text-center hover:scale-105 transition-transform duration-200"
            style={{ backgroundColor: item.color }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-28 h-28 object-contain mb-3"
            />
            <h1 className="text-lg font-semibold">{item.name}</h1>
          </div>
        ))}
      </div>
      {modalOpen && (
        <SingleAssessementModal
          questions={assessmentQusetion}
          loading={loading}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AssessmentPage;
