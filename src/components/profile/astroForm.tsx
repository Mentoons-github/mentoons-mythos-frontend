import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

interface AstroFormProps {
  formData: {
    birthDate: string;
    birthTime: string;
    longitude: string;
    latitude: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      birthDate: string;
      birthTime: string;
      longitude: string;
      latitude: string;
    }>
  >;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const AstroForm = ({
  formData,
  setFormData,
  onSubmit,
  isEditing,
  setIsEditing,
}: AstroFormProps) => {
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(
      (prev: {
        birthDate: string;
        birthTime: string;
        longitude: string;
        latitude: string;
      }) => ({ ...prev, [e.target.name]: e.target.value })
    );
    setGeoError(null); // Clear error on manual input
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(
          (prev: {
            birthDate: string;
            birthTime: string;
            longitude: string;
            latitude: string;
          }) => ({
            ...prev,
            latitude: latitude.toFixed(4),
            longitude: longitude.toFixed(4),
          })
        );
        setGeoError(null);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoError("Permission denied. Please allow location access.");
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setGeoError("The request to get location timed out.");
            break;
          default:
            setGeoError("An unknown error occurred.");
            break;
        }
      }
    );
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h3 className="text-2xl font-semibold mb-6">
        {isEditing ? "Edit" : "Enter"} Birth Details
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 mb-2">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Birth Time</label>
          <input
            type="time"
            name="birthTime"
            value={formData.birthTime}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Latitude</label>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg text-white"
            placeholder="e.g., 40.7128"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Longitude</label>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded-lg text-white"
            placeholder="e.g., -74.0060"
          />
        </div>
      </div>
      {geoError && (
        <motion.p
          className="text-red-400 text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {geoError}
        </motion.p>
      )}
      <div className="mt-4">
        <motion.button
          type="button"
          onClick={handleGetCurrentLocation}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Use Current Location
        </motion.button>
      </div>
      <div className="mt-6 flex space-x-4">
        <motion.button
          type="submit"
          className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save
        </motion.button>
        {isEditing && (
          <motion.button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        )}
      </div>
    </motion.form>
  );
};

export default AstroForm;
