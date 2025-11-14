import { motion } from "framer-motion";
import { downloadAstroReport } from "../../features/astrology/astroService";
import { AxiosResponse } from "axios";
import { useState } from "react";

interface Report {
  moonSign?: string;
  sunSign?: string;
}

const DownloadReportButton: React.FC<{ astrologyData: Report }> = ({
  astrologyData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { moonSign, sunSign } = astrologyData;

  const handleDownloadReport = async (signType: "moon" | "sun" | undefined) => {
    try {
      console.log(`downloading ${signType ? signType + " sign" : ""} report`);
      const response: AxiosResponse<Blob> = await downloadAstroReport(
        signType!
      );
      console.log("response :", response);
      const blob = response.data;

      if (!(blob instanceof Blob)) {
        throw new Error("Response data is not a valid Blob");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `astrology-report${signType ? `-${signType}` : ""}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  if (moonSign && sunSign) {
    return (
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 md:px-4 py-2 border border-muted-foreground rounded-lg hover:bg-muted-foreground transition-colors text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Report
        </motion.button>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-foreground text-background border  rounded-lg shadow-lg z-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <button
              onClick={() => {
                handleDownloadReport("moon");
                setIsOpen(false);
              }}
              className="w-full px-4 py-2  border-b border-background rounded-t-lg text-sm text-left hover:bg-muted-foreground"
            >
              Moon Sign Report ({moonSign})
            </button>
            <button
              onClick={() => {
                handleDownloadReport("sun");
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-sm text-left rounded-b-lg hover:bg-muted-foreground"
            >
              Sun Sign Report ({sunSign})
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <motion.button
      onClick={() => handleDownloadReport(undefined)}
      className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Save Report
    </motion.button>
  );
};

export default DownloadReportButton;
