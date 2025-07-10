import { motion } from "framer-motion";
import { Calendar, Clock, Moon, Navigation, Sun } from "lucide-react";
import BirthChartPreview from "./birthChartPreview";
import CoordinateVisualization from "./coordinateVisualization";
import { useState } from "react";
import MapSelector from "./mapSelector";
import { LatLng } from "leaflet";

interface AstroDataProps {
  userProfile: {
    birthDate: string;
    birthTime: string;
    latitude: string;
    longitude: string;
  };
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      avatar: string | null;
      birthDate: string;
      birthTime: string;
      longitude: string;
      latitude: string;
      hasAstroData: boolean;
    }>
  >;
}

const AstroData = ({
  userProfile,
  setIsEditing,
  setUserProfile,
}: AstroDataProps) => {
  const formatCoordinate = (value: string, type: "lat" | "lng") => {
    const num = parseFloat(value);
    if (isNaN(num)) return "Invalid";
    const abs = Math.abs(num);
    const direction =
      type === "lat" ? (num >= 0 ? "N" : "S") : num >= 0 ? "E" : "W";
    return `${abs.toFixed(4)}° ${direction}`;
  };

  const [showMap, setShowMap] = useState(false);

  const handleMapSelect = (latlng: LatLng) => {
    const newCoords = {
      latitude: latlng.lat.toString(),
      longitude: latlng.lng.toString(),
    };
    setUserProfile(
      (prev: {
        name: string;
        email: string;
        avatar: string | null;
        birthDate: string;
        birthTime: string;
        longitude: string;
        latitude: string;
        hasAstroData: boolean;
      }) => ({ ...prev, ...newCoords })
    );
    setShowMap(false);
  };

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
      {/* Birth Details */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-gray-700"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Birth Details</h3>
          <motion.button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            className="text-center p-4 bg-gray-700 bg-opacity-50 rounded-lg"
            variants={cardVariants}
          >
            <Calendar className="mx-auto mb-2 text-gray-300" size={24} />
            <p className="text-sm text-gray-400">Birth Date</p>
            <p className="text-lg font-semibold">{userProfile.birthDate}</p>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-gray-700 bg-opacity-50 rounded-lg"
            variants={cardVariants}
          >
            <Clock className="mx-auto mb-2 text-gray-300" size={24} />
            <p className="text-sm text-gray-400">Birth Time</p>
            <p className="text-lg font-semibold">{userProfile.birthTime}</p>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-gray-700 bg-opacity-50 rounded-lg"
            variants={cardVariants}
          >
            <Navigation className="mx-auto mb-2 text-gray-300" size={24} />
            <p className="text-sm text-gray-400">Latitude</p>
            <p className="text-lg font-semibold">
              {formatCoordinate(userProfile.latitude, "lat")}
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
              {formatCoordinate(userProfile.longitude, "lng")}
            </p>
          </motion.div>
        </div>

        {/* Coordinate Map Preview */}
        <motion.div
          className="mt-6 p-4 bg-gray-700 bg-opacity-30 rounded-lg"
          variants={cardVariants}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-300">
              Birth Location
            </h4>
            <motion.button
              className="text-xs px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMap(true)}
            >
              View on Map
            </motion.button>
          </div>
          {showMap && (
            <div className="relative w-full h-80">
              <MapSelector onSelect={handleMapSelect} />
            </div>
          )}
          <CoordinateVisualization
            latitude={userProfile.latitude}
            longitude={userProfile.longitude}
          />
        </motion.div>
      </motion.div>

      {/* Astrological Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center mb-4">
            <Sun className="mr-3 text-yellow-400" size={24} />
            <h4 className="text-xl font-semibold">Sun Sign</h4>
          </div>
          <motion.div className="text-center py-6" whileHover={{ scale: 1.05 }}>
            <motion.div
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: "Noto Sans Symbols" }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              ♉
            </motion.div>
            <p className="text-2xl font-semibold">Taurus</p>
            <p className="text-gray-400 mt-2">Reliable • Practical • Devoted</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center mb-4">
            <Moon className="mr-3 text-blue-400" size={24} />
            <h4 className="text-xl font-semibold">Moon Sign</h4>
          </div>
          <motion.div className="text-center py-6" whileHover={{ scale: 1.05 }}>
            <motion.div
              className="text-3xl font-bold mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              ♌
            </motion.div>
            <p className="text-2xl font-semibold">Leo</p>
            <p className="text-gray-400 mt-2">
              Confident • Charismatic • Natural Leader
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Birth Chart Preview */}
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
