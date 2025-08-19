import { motion } from "framer-motion";
import { Calendar, Clock, Moon, Navigation, Sun } from "lucide-react";
import BirthChartPreview from "./birthChartPreview";
import CoordinateVisualization from "./coordinateVisualization";
import { useState } from "react";
import { IUser } from "../../types";
import { ZODIAC_NAME_MAPPING, ZODIAC_DATA } from "../../constants";
import DownloadReportButton from "../astro/downloadRewportButton";

interface AstroDataProps {
  userProfile: IUser;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const AstroData = ({ userProfile, setIsEditing }: AstroDataProps) => {
  const [displayMode, setDisplayMode] = useState<"english" | "indian">(
    "english"
  );

  console.log("AstroData userProfile:", userProfile);
  console.log("AstroData astrologyDetail:", userProfile.astrologyDetail);

  const formatCoordinate = (value: string, type: "lat" | "lng") => {
    const num = parseFloat(value);
    if (isNaN(num)) return "Not provided";
    const abs = Math.abs(num);
    const direction =
      type === "lat" ? (num >= 0 ? "N" : "S") : num >= 0 ? "E" : "W";
    return `${abs.toFixed(4)}° ${direction}`;
  };

  const normalizeSignName = (sign: string | undefined): string => {
    if (!sign) return "";
    return ZODIAC_NAME_MAPPING[sign] || sign;
  };

  const hasSunSign =
    !!userProfile.astrologyDetail?.sunSign &&
    !!ZODIAC_DATA[normalizeSignName(userProfile.astrologyDetail.sunSign)];
  const hasMoonSign =
    !!userProfile.astrologyDetail?.moonSign &&
    !!ZODIAC_DATA[normalizeSignName(userProfile.astrologyDetail.moonSign)];

  const dataVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div variants={dataVariants} initial="hidden" animate="visible">
      {/* Toggle Button */}
      <motion.div className="flex justify-end mb-4" variants={cardVariants}>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Display Mode:</span>
          <motion.button
            onClick={() =>
              setDisplayMode(displayMode === "english" ? "indian" : "english")
            }
            className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {displayMode === "english"
              ? "Showing English Names"
              : "Showing Indian Names"}
          </motion.button>
        </div>
      </motion.div>

      {/* Birth Details */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-gray-700"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Birth Details</h3>
          <div className="flex items-center justify-center gap-5">
            <motion.button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit
            </motion.button>
            <DownloadReportButton
              astrologyData={userProfile.astrologyDetail!}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            className="text-center p-4 bg-gray-700 bg-opacity-50 rounded-lg"
            variants={cardVariants}
          >
            <Calendar className="mx-auto mb-2 text-gray-300" size={24} />
            <p className="text-sm text-gray-400">Birth Date</p>
            <p className="text-lg font-semibold">
              {userProfile.dateOfBirth
                ? new Date(userProfile.dateOfBirth).toISOString().split("T")[0]
                : "Not provided"}
            </p>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-gray-700 bg-opacity-50 rounded-lg"
            variants={cardVariants}
          >
            <Clock className="mx-auto mb-2 text-gray-300" size={24} />
            <p className="text-sm text-gray-400">Birth Time</p>
            <p className="text-lg font-semibold">
              {userProfile.timeOfBirth || "Not provided"}
            </p>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-gray-700 bg-opacity-50 rounded-lg"
            variants={cardVariants}
          >
            <Navigation className="mx-auto mb-2 text-gray-300" size={24} />
            <p className="text-sm text-gray-400">Latitude</p>
            <p className="text-lg font-semibold">
              {userProfile.latitude
                ? formatCoordinate(userProfile.latitude, "lat")
                : "Not provided"}
            </p>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-gray-700 bg-opacity-50 rounded-lg"
            variants={cardVariants}
          >
            <Navigation
              className="mx-auto mb-2 text-gray-300 transform rotate-90"
              size={24}
            />
            <p className="text-sm text-gray-400">Longitude</p>
            <p className="text-lg font-semibold">
              {userProfile.longitude
                ? formatCoordinate(userProfile.longitude, "lng")
                : "Not provided"}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-6 p-4 bg-gray-700 bg-opacity-30 rounded-lg"
          variants={cardVariants}
        >
          <CoordinateVisualization
            latitude={userProfile.latitude}
            longitude={userProfile.longitude}
          />
        </motion.div>
      </motion.div>

      <div
        className={`grid md:grid-cols-${
          hasSunSign && hasMoonSign ? "2" : "1"
        } gap-6`}
      >
        {hasSunSign && (
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center mb-4">
              <Sun className="mr-3 text-yellow-400" size={24} />
              <h4 className="text-xl font-semibold">Sun Sign</h4>
            </div>
            <motion.div
              className="text-center py-6"
              whileHover={{ scale: 1.05 }}
            >
              <>
                <motion.div
                  className="text-3xl font-bold mb-2"
                  style={{ fontFamily: "Noto Sans Symbols" }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {
                    ZODIAC_DATA[
                      normalizeSignName(userProfile.astrologyDetail!.sunSign)
                    ][displayMode].symbol
                  }
                </motion.div>
                <p className="text-2xl font-semibold">
                  {
                    ZODIAC_DATA[
                      normalizeSignName(userProfile.astrologyDetail!.sunSign)
                    ][displayMode].name
                  }
                </p>
                <p className="text-gray-400 mt-2">
                  {
                    ZODIAC_DATA[
                      normalizeSignName(userProfile.astrologyDetail!.sunSign)
                    ][displayMode].characteristics
                  }
                </p>
              </>
            </motion.div>
          </motion.div>
        )}

        {hasMoonSign && (
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center mb-4">
              <Moon className="mr-3 text-blue-400" size={24} />
              <h4 className="text-xl font-semibold">Moon Sign</h4>
            </div>
            <motion.div
              className="text-center py-6"
              whileHover={{ scale: 1.05 }}
            >
              <>
                <motion.div
                  className="text-3xl font-bold mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  {
                    ZODIAC_DATA[
                      normalizeSignName(userProfile.astrologyDetail!.moonSign)
                    ][displayMode].symbol
                  }
                </motion.div>
                <p className="text-2xl font-semibold">
                  {
                    ZODIAC_DATA[
                      normalizeSignName(userProfile.astrologyDetail!.moonSign)
                    ][displayMode].name
                  }
                </p>
                <p className="text-gray-400 mt-2">
                  {
                    ZODIAC_DATA[
                      normalizeSignName(userProfile.astrologyDetail!.moonSign)
                    ][displayMode].characteristics
                  }
                </p>
              </>
            </motion.div>
          </motion.div>
        )}
      </div>

      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 mt-6 border border-gray-700"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-semibold">Birth Chart</h4>
          <motion.button
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Chart
          </motion.button>
        </div>

        <BirthChartPreview />
      </motion.div>
    </motion.div>
  );
};

export default AstroData;
