import { motion } from "framer-motion";

interface CoordinateVisualizationProps {
  latitude: string;
  longitude: string;
}

const CoordinateVisualization = ({
  latitude,
  longitude,
}: CoordinateVisualizationProps) => {
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  // Validate coordinates
  const isValidLat = !isNaN(lat) && lat >= -90 && lat <= 90;
  const isValidLng = !isNaN(lng) && lng >= -180 && lng <= 180;

  // Calculate marker position only if coordinates are valid
  const markerPosition = {
    left: isValidLng ? `${((lng + 180) / 360) * 100}%` : "50%", // Fallback to center
    top: isValidLat ? `${((90 - lat) / 180) * 100}%` : "50%", // Fallback to center
  };

  return (
    <motion.div
      className="relative bg-gray-900 rounded-lg p-4 h-32 w-full overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Simple coordinate grid visualization */}
      <div className="relative w-full h-full border border-gray-600 rounded overflow-visible">
        {/* Grid lines */}
        <div className="absolute inset-0">
          {/* Vertical lines */}
          {[25, 50, 75].map((percent) => (
            <div
              key={`v-${percent}`}
              className="absolute top-0 bottom-0 w-px bg-gray-600 opacity-30"
              style={{ left: `${percent}%` }}
            />
          ))}
          {/* Horizontal lines */}
          {[25, 50, 75].map((percent) => (
            <div
              key={`h-${percent}`}
              className="absolute left-0 right-0 h-px bg-gray-600 opacity-30"
              style={{ top: `${percent}%` }}
            />
          ))}
        </div>

        {/* Center lines (equator and prime meridian) */}
        <div className="absolute top-0 bottom-0 w-px bg-gray-500 left-1/2" />
        <div className="absolute left-0 right-0 h-px bg-gray-500 top-1/2" />

        {/* Location marker */}
        {isValidLat && isValidLng ? (
          <motion.div
            className="absolute w-3 h-3 bg-white rounded-full border-2 border-gray-800 transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={markerPosition}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-red-400">
            Invalid Coordinates
          </div>
        )}

        {/* Coordinate labels */}
        <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
          -180°
        </div>
        <div className="absolute -bottom-6 right-0 text-xs text-gray-500">
          180°
        </div>
        <div className="absolute -left-8 top-0 text-xs text-gray-500">90°</div>
        <div className="absolute -left-8 bottom-0 text-xs text-gray-500">
          -90°
        </div>
      </div>

      {/* Coordinate display */}
      <div className="mt-4 text-center">
        <span className="text-xs text-gray-400">
          {isValidLat ? lat.toFixed(4) : "Invalid"}°,{" "}
          {isValidLng ? lng.toFixed(4) : "Invalid"}°
        </span>
      </div>
    </motion.div>
  );
};

export default CoordinateVisualization;
