import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, X } from "lucide-react";
import { LatLng } from "leaflet";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { AstroFormData } from "../../../../types";
import { userLogout } from "../../../../features/user/userThunk";
import {
  upsertUserZodiacDetail,
  fetchMoonAndSunSign,
} from "../../../../features/astrology/astroThunk";
import { RASHI_DETAILS } from "../../../../constants";
import RashiForm from "./rashiForm";
import RashiResult from "./rashiResult";
import { checkRashi } from "../../../../features/astrology/astroService";

interface RashiFinderModalProps {
  onClose: () => void;
}

interface RashiResultData {
  rashi: string;
  element: string;
  ruler: string;
  description: string;
}

const pulseVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

const bounceVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const spinVariants = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
};

const borderPulseVariants = {
  animate: {
    opacity: [0.2, 0.4, 0.2],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const RashiFinderModal = ({ onClose }: RashiFinderModalProps) => {
  const dispatch = useAppDispatch();
  const {
    result: astrologyDetail,
    error: astroError,
    loading: astroLoading,
  } = useAppSelector((state) => state.astro);
  const { user } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState<AstroFormData>({
    dateOfBirth: user?.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
      : "",
    timeOfBirth: user?.timeOfBirth || "",
    longitude: user?.longitude || "",
    latitude: user?.latitude || "",
  });
  const [showMap, setShowMap] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [result, setResult] = useState<RashiResultData | null>(null);
  const [selectedMode, setSelectedMode] = useState<"vedic" | "zodiac">("vedic");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasRashi, setHasRashi] = useState<boolean | null>(null);
  const [rashiCheckError, setRashiCheckError] = useState<string | null>(null);
  const [isDelayed, setIsDelayed] = useState(false);

  useEffect(() => {
    const rashiCheck = async () => {
      try {
        const response = await checkRashi();
        setHasRashi(response.data.hasRashi);
        setRashiCheckError(null);
      } catch (err: unknown) {
        console.error("Failed to check rashi:", err);
        const errorMessage =
          typeof err === "string"
            ? err
            : (err as { payload?: string })?.payload ||
              "Error checking rashi data. Please try again.";
        setRashiCheckError(errorMessage);
        if (
          errorMessage === "Token expired" ||
          errorMessage === "Unauthorized"
        ) {
          dispatch(userLogout());
        }
      }
    };

    rashiCheck();
  }, [dispatch]);

  useEffect(() => {
    if (hasRashi === true) {
      const timer = setTimeout(() => {
        setIsDelayed(true);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setIsDelayed(false);
    }
  }, [hasRashi]);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          latitude: latitude.toFixed(4),
          longitude: longitude.toFixed(4),
        }));
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

  const handleMapSelect = (latlng: LatLng) => {
    setFormData((prev) => ({
      ...prev,
      latitude: latlng.lat.toFixed(4),
      longitude: latlng.lng.toFixed(4),
    }));
    setShowMap(false);
    setGeoError(null);
  };

  useEffect(() => {
    if (
      isSubmitted &&
      (astrologyDetail?.moonSign || astrologyDetail?.sunSign)
    ) {
      console.log("Processing astrologyDetail:", astrologyDetail);
      const sign =
        selectedMode === "vedic"
          ? astrologyDetail?.moonSign
          : astrologyDetail?.sunSign;
      const rashiName = sign || "Unknown";
      const details = RASHI_DETAILS[
        rashiName as keyof typeof RASHI_DETAILS
      ] || {
        zodiac: "Unknown",
        element: "Unknown",
        ruler: "Unknown",
      };

      setResult({
        rashi: `${rashiName} (${details.zodiac})`,
        element: details.element,
        ruler: details.ruler,
        description: `Your ${
          selectedMode === "vedic" ? "Vedic (Lunar)" : "Zodiac (Solar)"
        } sign is ${rashiName}, which corresponds to ${
          details.zodiac
        } in Western astrology. This ${details.element} sign is ruled by ${
          details.ruler
        }.`,
      });
      setGeoError(null);
      setIsSubmitted(false);
    } else if (
      isSubmitted &&
      !astrologyDetail?.moonSign &&
      !astrologyDetail?.sunSign
    ) {
      setGeoError("No astrology details received from the server.");
      setIsSubmitted(false);
    }
  }, [isSubmitted, astrologyDetail, selectedMode]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.dateOfBirth) {
      setGeoError("Birth date is required.");
      return;
    }

    try {
      const data = {
        dateOfBirth: new Date(formData.dateOfBirth),
        timeOfBirth: formData.timeOfBirth,
        longitude: formData.longitude,
        latitude: formData.latitude,
        type: selectedMode,
      };

      await dispatch(upsertUserZodiacDetail(data)).unwrap();
      await dispatch(fetchMoonAndSunSign()).unwrap();
      console.log("astrologyDetail after dispatch:", astrologyDetail);
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("Failed to fetch rashi:", err);
      const errorMessage =
        typeof err === "string"
          ? err
          : (err as { payload?: string })?.payload ||
            "Error fetching rashi data. Please try again.";
      setGeoError(errorMessage);
      if (errorMessage === "Token expired" || errorMessage === "Unauthorized") {
        dispatch(userLogout());
      }
      setIsSubmitted(false);
    }
  };

  if (hasRashi === null || !hasRashi || (hasRashi && !isDelayed)) {
    return null;
  }

  if (rashiCheckError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
        <div className="bg-gray-900 p-6 rounded-lg text-white">
          <p className="text-red-400">{rashiCheckError}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Render the modal if hasRashi is true and delay is complete
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 rounded-2xl text-center space-y-6 border border-gray-600/50 shadow-2xl max-w-2xl w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
        >
          <X size={24} />
        </button>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-4 left-4 text-white"
            variants={pulseVariants}
            animate="animate"
          >
            <Star size={12} />
          </motion.div>
          <motion.div
            className="absolute top-8 right-8 text-gray-300"
            variants={bounceVariants}
            animate="animate"
            transition={{ delay: 1 }}
          >
            <Star size={8} />
          </motion.div>
          <motion.div
            className="absolute bottom-12 left-8 text-gray-400"
            variants={pulseVariants}
            animate="animate"
            transition={{ delay: 2 }}
          >
            <Star size={10} />
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-6 text-white"
            variants={pulseVariants}
            animate="animate"
            transition={{ delay: 3 }}
          >
            <Star size={14} />
          </motion.div>
        </div>

        <motion.div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16"
          variants={spinVariants}
          animate="animate"
        >
          <div className="w-full h-full rounded-full border-2 border-white/20 flex items-center justify-center">
            <Star className="text-white/60" size={20} />
          </div>
        </motion.div>

        <div className="relative z-10 pt-8">
          {result ? (
            <RashiResult
              result={result}
              selectedMode={selectedMode}
              setResult={setResult}
              onClose={onClose}
            />
          ) : (
            <RashiForm
              formData={formData}
              setFormData={setFormData}
              showMap={showMap}
              setShowMap={setShowMap}
              geoError={geoError}
              setGeoError={setGeoError}
              astroError={astroError!}
              astroLoading={astroLoading}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              handleSubmit={handleSubmit}
              handleGetCurrentLocation={handleGetCurrentLocation}
              handleMapSelect={handleMapSelect}
              onClose={onClose}
            />
          )}
        </div>

        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 via-gray-500/10 to-white/5 pointer-events-none"
          variants={borderPulseVariants}
          animate="animate"
        />
      </motion.div>
    </motion.div>
  );
};

export default RashiFinderModal;
