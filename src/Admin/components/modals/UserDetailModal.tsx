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
    <div className="fixed inset-0 bg-black/60 bg-opacity-60 flex justify-center items-center z-50 ">
      <div className="bg-secondary rounded-lg shadow-xl p-3 md:p-6 w-full max-w-xs  md:max-w-2xl lg:max-w-4xl relative hide-scrollbar overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2  hover:text-muted-foreground text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl md:text-2xl font-bold mb-6 border-b pb-2">
          User Profile Details
        </h2>

        {singleUserLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 ">Loading user details...</span>
          </div>
        ) : !singleUser ? (
          <p className="text-center ">No user data available</p>
        ) : (
          <div className="">
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Personal Info
              </h3>
              <div className="grid md:grid-cols-2 pl-3 md:pl-0 gap-4 ">
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
                  <strong>Date of Birth:</strong>{" "}
                  {formatToRealDate(singleUser?.dateOfBirth)}
                </p>
                <p>
                  <strong>Joined Date:</strong>{" "}
                  {formatToRealDate(singleUser?.createdAt)}
                </p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Intelligence Types
              </h3>
              {singleUser.intelligenceTypes.length > 0 ? (
                <div className="flex flex-wrap ml-3 md:ml-0 space-x-4">
                  {singleUser.intelligenceTypes.map((type) => (
                    <div
                      key={type}
                      className="bg-green-500 rounded-md py-1 px-2"
                    >
                      {type}
                    </div>
                  ))}
                </div>
              ) : (
                <h2>N/A</h2>
              )}
            </section>

            {/* Astrology Details */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Astrology Details
              </h3>
              <div className="grid md:grid-cols-2 ml-3 md:ml-0 gap-4 ">
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
              <h3 className="text-lg font-semibold text-blue-800 mb-4">
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
                    <div className="grid md:grid-cols-2 gap-3 ">
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

                    <div className="mt-3 space-y-3 ">
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
                  <p className=" italic">Sun Report: N/A</p>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-3 ">
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

                    <div className="mt-3 space-y-3 ">
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
                    <div className="mt-3 border-t pt-2">
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
