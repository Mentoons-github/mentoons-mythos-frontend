import React from "react";
import { IUser } from "../../../types";
import { formatToRealDate } from "../../../utils/DateFormate";

interface ModalProps {
  singleUser: IUser | null;
  singleUserLoading: boolean;
  onClose: () => void;
}

const UserDetailModal: React.FC<ModalProps> = ({
  singleUser,
  onClose,
  singleUserLoading,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-40 italic">
      <div className="bg-gradient-to-t from-[#141414] to-[#2b2b2b] rounded-lg shadow-xl p-6 w-full max-w-4xl relative hide-scrollbar overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-white border-b pb-2">
          User Profile Details
        </h2>

        {singleUserLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-white">Loading user details...</span>
          </div>
        ) : !singleUser ? (
          <p className="text-center text-white">No user data available</p>
        ) : (
          <div className="">
            {/* Basic Details */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-[#E39712] mb-2">
                Personal Info
              </h3>
              <div className="grid grid-cols-2 gap-4 text-white">
                <p>
                  <strong>Name:</strong> {singleUser?.firstName}{" "}
                  {singleUser?.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {singleUser?.email}
                </p>
                <p>
                  <strong>Country:</strong> {singleUser?.country || "N/A"}
                </p>
                <p>
                  <strong>Joined Date:</strong>{" "}
                  {formatToRealDate(singleUser?.dateOfBirth)}
                </p>
                <p>
                  <strong>Joined Date:</strong>{" "}
                  {formatToRealDate(singleUser?.createdAt)}
                </p>
              </div>
            </section>

            {/* Astrology Details */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-[#E39712] mb-2">
                Astrology Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-white">
                <p>
                  <strong>Moon Sign:</strong>{" "}
                  {singleUser?.astrologyDetail?.moonSign || "N/A"}
                </p>
                <p>
                  <strong>Sun Sign:</strong>{" "}
                  {singleUser?.astrologyDetail?.sunSign || "N/A"}
                </p>
              </div>
            </section>

            {/* Reports */}
            <section>
              <h3 className="text-lg font-semibold text-[#E39712] mb-4">
                Astrology Reports
              </h3>

              {/* Moon Section */}
              <div className="border rounded-lg p-4 mb-4">
                <h4 className="text-md font-semibold text-purple-800 mb-2">
                  🌙 Moon Report
                </h4>
                {!singleUser?.astrologyReports?.moon ? (
                  <p className="text-white italic">Moon Report: N/A</p>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3 text-white  ">
                      <p>
                        <strong>Deity:</strong>{" "}
                        {singleUser.astrologyReports.moon.report.deity || "N/A"}
                      </p>
                      <p>
                        <strong>Ganam:</strong>{" "}
                        {singleUser.astrologyReports.moon.report.ganam || "N/A"}
                      </p>
                      <p>
                        <strong>Symbol:</strong>{" "}
                        {singleUser.astrologyReports.moon.report.symbol ||
                          "N/A"}
                      </p>
                      <p>
                        <strong>Animal Sign:</strong>{" "}
                        {singleUser.astrologyReports.moon.report.animal_sign ||
                          "N/A"}
                      </p>
                      <p>
                        <strong>Nadi:</strong>{" "}
                        {singleUser.astrologyReports.moon.report.nadi || "N/A"}
                      </p>
                      <p>
                        <strong>Color:</strong>{" "}
                        {singleUser.astrologyReports.moon.report.color || "N/A"}
                      </p>
                      <p>
                        <strong>Best Direction:</strong>{" "}
                        {singleUser.astrologyReports.moon.report
                          .best_direction || "N/A"}
                      </p>
                      <p>
                        <strong>Syllables:</strong>{" "}
                        {singleUser.astrologyReports.moon.report.syllables ||
                          "N/A"}
                      </p>
                      <p>
                        <strong>Birth Stone:</strong>{" "}
                        {singleUser.astrologyReports.moon.report.birth_stone ||
                          "N/A"}
                      </p>
                      <p>
                        <strong>Gender:</strong>{" "}
                        {singleUser.astrologyReports.moon.report.gender ||
                          "N/A"}
                      </p>
                      <p>
                        <strong>Planet:</strong>{" "}
                        {singleUser.astrologyReports.moon.report.planet ||
                          "N/A"}
                      </p>
                      <p>
                        <strong>Enemy Yoni:</strong>{" "}
                        {singleUser.astrologyReports.moon.report.enemy_yoni ||
                          "N/A"}
                      </p>
                    </div>

                    <div className="mt-3 text-white">
                      <p>
                        <strong>Nakshathra:</strong>{" "}
                        {singleUser.astrologyReports.moon.nakshatra?.name ||
                          "N/A"}
                      </p>
                      <p>
                        <strong>Zodiac:</strong>{" "}
                        {singleUser.astrologyReports.moon.zodiac || "N/A"}
                      </p>
                    </div>

                    {/* Rashi Section */}
                    <div className="mt-3 border-t pt-2 text-whte">
                      <h5 className="font-semibold text-purple-800">Rashi</h5>
                      <p>
                        <strong>Name:</strong>{" "}
                        {singleUser.astrologyReports.moon.rasi?.name || "N/A"}
                      </p>
                      <p>
                        <strong>Lord:</strong>{" "}
                        {singleUser.astrologyReports.moon.rasi?.lord?.name ||
                          "N/A"}{" "}
                        (
                        {singleUser.astrologyReports.moon.rasi?.lord
                          ?.vedic_name || "N/A"}
                        )
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Sun Section */}
              <div className="border rounded-lg p-4">
                <h4 className="text-md font-semibold text-yellow-800 mb-2">
                  ☀️ Sun Report
                </h4>
                {!singleUser?.astrologyReports?.sun ? (
                  <p className="text-white italic">Sun Report: N/A</p>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3 text-white ">
                      <p>
                        <strong>Deity:</strong>{" "}
                        {singleUser.astrologyReports.sun.report.deity || "N/A"}
                      </p>
                      <p>
                        <strong>Ganam:</strong>{" "}
                        {singleUser.astrologyReports.sun.report.ganam || "N/A"}
                      </p>
                      <p>
                        <strong>Symbol:</strong>{" "}
                        {singleUser.astrologyReports.sun.report.symbol || "N/A"}
                      </p>
                      <p>
                        <strong>Animal Sign:</strong>{" "}
                        {singleUser.astrologyReports.sun.report.animal_sign ||
                          "N/A"}
                      </p>
                      <p>
                        <strong>Nadi:</strong>{" "}
                        {singleUser.astrologyReports.sun.report.nadi || "N/A"}
                      </p>
                      <p>
                        <strong>Color:</strong>{" "}
                        {singleUser.astrologyReports.sun.report.color || "N/A"}
                      </p>
                      <p>
                        <strong>Best Direction:</strong>{" "}
                        {singleUser.astrologyReports.sun.report
                          .best_direction || "N/A"}
                      </p>
                      <p>
                        <strong>Syllables:</strong>{" "}
                        {singleUser.astrologyReports.sun.report.syllables ||
                          "N/A"}
                      </p>
                      <p>
                        <strong>Birth Stone:</strong>{" "}
                        {singleUser.astrologyReports.sun.report.birth_stone ||
                          "N/A"}
                      </p>
                      <p>
                        <strong>Gender:</strong>{" "}
                        {singleUser.astrologyReports.sun.report.gender || "N/A"}
                      </p>
                      <p>
                        <strong>Planet:</strong>{" "}
                        {singleUser.astrologyReports.sun.report.planet || "N/A"}
                      </p>
                      <p>
                        <strong>Enemy Yoni:</strong>{" "}
                        {singleUser.astrologyReports.sun.report.enemy_yoni ||
                          "N/A"}
                      </p>
                    </div>

                    <div className="mt-3  text-white">
                      <p>
                        <strong>Nakshathra:</strong>{" "}
                        {singleUser.astrologyReports.sun.nakshatra?.name ||
                          "N/A"}
                      </p>
                      <p>
                        <strong>Zodiac:</strong>{" "}
                        {singleUser.astrologyReports.sun.zodiac || "N/A"}
                      </p>
                    </div>

                    {/* Rashi Section */}
                    <div className="mt-3 border-t pt-2 text-white">
                      <h5 className="font-semibold text-yellow-500">Rashi</h5>
                      <p>
                        <strong>Name:</strong>{" "}
                        {singleUser.astrologyReports.sun.rasi?.name || "N/A"}
                      </p>
                      <p>
                        <strong>Lord:</strong>{" "}
                        {singleUser.astrologyReports.sun.rasi?.lord?.name ||
                          "N/A"}{" "}
                        (
                        {singleUser.astrologyReports.sun.rasi?.lord
                          ?.vedic_name || "N/A"}
                        )
                      </p>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailModal;
