import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchMoonAndSunSign } from "../features/astrology/astroThunk";
import { ZODIAC_DATA, ZODIAC_NAME_MAPPING } from "../constants";
import { Moon, Sun } from "lucide-react";

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

const RashiDetails = () => {
  const dispatch = useAppDispatch();
  const {
    result: astrologyDetail,
    // error: astroError,
    // loading: astroLoading,
  } = useAppSelector((state) => state.astro);
  const [displayMode, setDisplayMode] = useState<"english" | "indian">(
    "english"
  );

  console.log(astrologyDetail, "hhhhhh");
  const normalizeSignName = (sign: string | undefined): string => {
    if (!sign) return "";
    return ZODIAC_NAME_MAPPING[sign] || sign;
  };

  const hasSunSign =
    !!astrologyDetail?.sunSign &&
    !!ZODIAC_DATA[normalizeSignName(astrologyDetail.sunSign)];
  const hasMoonSign =
    !!astrologyDetail?.moonSign &&
    !!ZODIAC_DATA[normalizeSignName(astrologyDetail.moonSign)];

  useEffect(() => {
    dispatch(fetchMoonAndSunSign());
  }, [dispatch]);
  return (
    <div className="min-h-screen lg:p-10 p-3 md:p-5 lg:px-20 xl:px-40">
      <motion.div className="flex justify-end mb-4" variants={cardVariants}>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Display Mode:</span>
          <motion.button
            onClick={() =>
              setDisplayMode(displayMode === "english" ? "indian" : "english")
            }
            className="px-3 py-1 bg-muted-foreground rounded-lg hover:bg-gray-500 transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {displayMode === "english"
              ? "Showing English Names"
              : "Showing Indian Names"}
          </motion.button>
        </div>
      </motion.div>
      <div
        className={`grid  md:grid-cols-${
          hasSunSign && hasMoonSign ? "2" : "1"
        } gap-6`}
      >
        {hasSunSign && (
          <motion.div
            className=" bg-opacity-50 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-muted-foreground"
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
                    ZODIAC_DATA[normalizeSignName(astrologyDetail!.sunSign)][
                      displayMode
                    ].symbol
                  }
                </motion.div>
                <p className="text-2xl font-semibold">
                  {
                    ZODIAC_DATA[normalizeSignName(astrologyDetail!.sunSign)][
                      displayMode
                    ].name
                  }
                </p>
                <p className=" mt-2">
                  {
                    ZODIAC_DATA[normalizeSignName(astrologyDetail!.sunSign)][
                      displayMode
                    ].characteristics
                  }
                </p>
              </>
            </motion.div>
          </motion.div>
        )}

        {hasMoonSign && (
          <motion.div
            className=" bg-opacity-50 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-muted-foreground"
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
                    ZODIAC_DATA[normalizeSignName(astrologyDetail!.moonSign)][
                      displayMode
                    ].symbol
                  }
                </motion.div>
                <p className="text-2xl font-semibold">
                  {
                    ZODIAC_DATA[normalizeSignName(astrologyDetail!.moonSign)][
                      displayMode
                    ].name
                  }
                </p>
                <p className=" mt-2">
                  {
                    ZODIAC_DATA[normalizeSignName(astrologyDetail!.moonSign)][
                      displayMode
                    ].characteristics
                  }
                </p>
              </>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RashiDetails;
