import { InitialAssessmentDetails } from "../../../../types/redux/assessmentInterface";
import { formatToRealDate } from "../../../../utils/DateFormate";

import PieScoreChart from "../../Assessment/PieScoreChart";

interface ModalProps {
  onClose: () => void;
  singleSubmissionLoading: boolean;
  details?: InitialAssessmentDetails;
}


const ViewInitialAssessmentDetailsModal: React.FC<ModalProps> = ({
  onClose,
  singleSubmissionLoading,
  details,
}) => {
  const scoreData =
    details?.scores &&
    Object.entries(details.scores).map(([type, score]) => ({
      name: type,
      value: score,
    }));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40">
      <div className="bg-secondary rounded-2xl shadow-2xl p-6 w-full max-w-6xl relative ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-muted-foreground text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6 border-b  pb-3">
          Assessment Submission Details
        </h2>

        {singleSubmissionLoading ? (
          <p className="italic">Loading submission details...</p>
        ) : !details ? (
          <p className="text-center italic">No submission details available.</p>
        ) : (
          <div className="overflow-y-auto hide-scrollbar max-h-[75vh] pr-2 space-y-8">
            {scoreData && (
              <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800">
                    Basic info
                  </h3>
                  <div className="grid gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">ID</p>
                      <p className="text-base font-medium">{details._id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Assessment Type</p>
                      <p className="text-base font-medium">
                        {details.assessmentType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted Date</p>
                      <p className="text-base font-medium">
                        {formatToRealDate(details.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 text-blue-800">
                      Intelligence Types{" "}
                      <span className="text-xs text-muted-foreground font-normal">
                        (Based on score)
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {details.intelligenceTypes.map((ele, ind) => (
                        <span
                          key={ind}
                          className="px-3 py-1 rounded-md bg-green-600 text-sm text-black"
                        >
                          {ele}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex justify-center items-center">
                  <div className="h-80 w-full">
                    <PieScoreChart  scoreData={scoreData}/>
                  </div>
                </div>
              </div>
            )}

            {/* Submissions */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                Submissions
              </h3>
              <div className="space-y-5 grid grid-cols-2 gap-3">
                {details.submissions.map((ele, index) => (
                  <div
                    key={ele._id}
                    className="border rounded-lg p-5 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold mb-3">
                      Q{index + 1}. {ele.question}
                    </h3>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {ele.options.map((opt, i) => (
                        <div
                          key={i}
                          className="p-2 text-sm border  rounded-md "
                        >
                          {opt}
                        </div>
                      ))}
                    </div>

                    {/* Answer */}
                    <div className="mt-2">
                      <span className="font-semibold">Submitted Answer:</span>
                      <span className="ml-2 px-3 py-1 rounded-md bg-muted-foreground text-foreground font-medium">
                        {ele.answer}
                      </span>
                    </div>

                    {/* Extra Info */}
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>
                        <span className="font-semibold">Assessment Name:</span>{" "}
                        {ele.assessmentName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInitialAssessmentDetailsModal;
