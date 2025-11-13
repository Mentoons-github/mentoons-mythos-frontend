import { X } from "lucide-react";
import { useState } from "react";
import { TaskSubmitTypes } from "../../../types/employee/employeetypes";

interface SubmitDatailsModalProps {
  onClose: () => void;
  submission?: TaskSubmitTypes;
  submitLoading: boolean;
}

const ViewSubmitDetailsModal = ({
  onClose,
  submission,
  submitLoading,
}: SubmitDatailsModalProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const isImage = (url: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  const isPDF = (url: string) => /\.pdf$/i.test(url);

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="relative w-full max-w-[350px] md:max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg p-4 md:p-8 bg-secondary hide-scrollbar">
        <button
          className="absolute top-4 right-4 hover:text-muted-foreground"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2 className="text-xl md:text-2xl font-semibold mb-4 border-b pb-2">
          Submitted Task
        </h2>

        {submitLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="ml-3">Loading task details...</span>
          </div>
        ) : (
          <div className="space-y-6">
            <p
              className="whitespace-pre-wrap break-words border p-4 pt-2 rounded-md"
              dangerouslySetInnerHTML={{
                __html: submission?.details
                  ? submission.details.replace(
                      /(https?:\/\/[^\s]+)/g,
                      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>'
                    )
                  : "",
              }}
            ></p>

            {submission?.attachedFiles?.some((file) => isImage(file.url)) && (
              <div>
                <h3 className="font-semibold mb-2">Images</h3>
                <div className="grid grid-cols-2 gap-4">
                  {submission.attachedFiles
                    .filter((file) => isImage(file.url))
                    .map((file, idx) => (
                      <div key={idx} className="space-y-2">
                        <img
                          src={file.url}
                          alt={file.originalName || `Image ${idx + 1}`}
                          className="w-full h-40 object-cover rounded-lg border cursor-pointer hover:opacity-90"
                          onClick={() => setPreviewImage(file.url)} // 👈 open preview
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* PDFs section */}
            {submission?.attachedFiles?.some((file) => isPDF(file.url)) && (
              <div>
                <h3 className="font-semibold mb-2">PDF Files</h3>
                <div className="space-y-2">
                  {submission.attachedFiles
                    .filter((file) => isPDF(file.url))
                    .map((file, idx) => (
                      <a
                        key={idx}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 bg-gray-200 rounded-lg text-blue-600 underline truncate"
                        title={file.originalName}
                      >
                        {file.originalName}
                      </a>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-[60]"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-lg"
          />
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300"
            onClick={() => setPreviewImage(null)}
          >
            <X size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewSubmitDetailsModal;
