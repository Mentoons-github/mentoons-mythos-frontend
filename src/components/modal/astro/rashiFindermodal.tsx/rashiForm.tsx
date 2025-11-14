import React, { FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { LatLng } from "leaflet";
import MapSelector from "../../../profile/mapSelector";
import { AstroFormData } from "../../../../types";

interface RashiFormProps {
  formData: AstroFormData;
  setFormData: React.Dispatch<React.SetStateAction<AstroFormData>>;
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
  geoError: string | null;
  setGeoError: React.Dispatch<React.SetStateAction<string | null>>;
  astroError: string | null;
  astroLoading: boolean;
  selectedMode: "vedic" | "zodiac";
  setSelectedMode: React.Dispatch<React.SetStateAction<"vedic" | "zodiac">>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleGetCurrentLocation: () => void;
  handleMapSelect: (latlng: LatLng) => void;
  onClose: () => void;
}

const RashiForm: React.FC<RashiFormProps> = ({
  formData,
  setFormData,
  showMap,
  setShowMap,
  geoError,
  setGeoError,
  astroError,
  astroLoading,
  selectedMode,
  setSelectedMode,
  handleSubmit,
  handleGetCurrentLocation,
  handleMapSelect,
  onClose,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setGeoError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-serif font-bold text-3xl  bg-clip-text  mb-2">
        Find Your Rashi
      </h2>
      <p className="text-muted-foreground mb-6">
        Enter your birth details to discover your Vedic or Zodiac sign
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-muted-foreground mb-2">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-3 rounded-lg  border  focus:border-secondary/50 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-muted-foreground mb-2">Time of Birth</label>
            <input
              type="time"
              name="timeOfBirth"
              value={formData.timeOfBirth}
              onChange={handleChange}
              className="w-full p-3 rounded-lg  border  focus:border-secondary/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-muted-foreground mb-2">Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
               className="w-full p-3 rounded-lg  border  focus:border-secondary/50 transition-colors"
              placeholder="e.g., 12.9716"
            />
          </div>
          <div>
            <label className="block text-muted-foreground mb-2">Longitude</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
               className="w-full p-3 rounded-lg  border  focus:border-secondary/50 transition-colors"
              placeholder="e.g., 77.5946"
            />
          </div>
        </div>

        {geoError || astroError ? (
          <motion.p
            className="text-red-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {geoError || astroError}
            {(astroError?.includes("Token expired") ||
              astroError?.includes("Unauthorized")) &&
              " Please log in again."}
          </motion.p>
        ) : null}

        <div className="flex space-x-4">
          <motion.button
            type="button"
            onClick={handleGetCurrentLocation}
            className="flex-1 px-4 py-2 border rounded-lg hover:background transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <MapPin size={16} />
              <span>Use Current Location</span>
            </div>
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setShowMap(!showMap)}
           className="flex-1 px-4 py-2 border rounded-lg hover:background transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <MapPin size={16} />
              <span>Pick Location on Map</span>
            </div>
          </motion.button>
        </div>

        {showMap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <MapSelector onSelect={handleMapSelect} />
          </motion.div>
        )}

        <div className="space-y-4">
          <label className="block text-gray-800 mb-2">
            Select Calculation Type
          </label>
          <div className="space-y-3">
            <motion.label
              className={`flex items-center p-4 rounded-lg border transition-all cursor-pointer ${
                selectedMode === "vedic"
                  ? "border-white/50 bg-foreground text-secondary"
                  : "border-gray-600 hover:border-gray-500 text-foreground"
              }`}
              whileHover={{ scale: 1.01 }}
            >
              <input
                type="radio"
                name="calculationType"
                value="vedic"
                checked={selectedMode === "vedic"}
                onChange={() => setSelectedMode("vedic")}
                className="mr-3 w-4 h-4  focus:ring-2"
              />
              <div className="flex-1">
                <div className=" font-semibold">Vedic (Lunar)</div>
                <div className="text-muted-foreground text-sm">
                  Based on moon sign position at birth
                </div>
              </div>
            </motion.label>
            <motion.label
              className={`flex items-center p-4 rounded-lg border transition-all cursor-pointer ${
                selectedMode === "zodiac"
                ? "border-white/50 bg-foreground text-secondary"
                  : "border-gray-600 hover:border-gray-500 text-foreground"
              }`}
              whileHover={{ scale: 1.01 }}
            >
              <input
                type="radio"
                name="calculationType"
                value="zodiac"
                checked={selectedMode === "zodiac"}
                onChange={() => setSelectedMode("zodiac")}
                className="mr-3 w-4 h-4 focus:ring-2"
              />
              <div className="flex-1">
                <div className=" font-semibold">Zodiac (Solar)</div>
                <div className="text-muted-foreground text-sm">
                  Based on sun sign position at birth
                </div>
              </div>
            </motion.label>
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <motion.button
            type="submit"
            disabled={astroLoading || !formData.dateOfBirth}
            className="flex-1 bg-foreground text-background hover:bg-foreground/90 font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!astroLoading ? { scale: 1.02 } : {}}
            whileTap={!astroLoading ? { scale: 0.98 } : {}}
          >
            {astroLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                />
                <span>Fetching Astrology Data...</span>
              </div>
            ) : (
              `Get Kundali`
            )}
          </motion.button>
          <motion.button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-foreground rounded-lg hover:bg-background/80 font-semibold transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default RashiForm;
