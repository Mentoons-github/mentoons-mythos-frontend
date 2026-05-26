import { motion } from "framer-motion";
import { MyBadge } from "../../types/user/userInterface";
import { FaMedal } from "react-icons/fa";
import { useEffect, useState } from "react";
import BadgeRewardModal from "../modal/badge/BadgeRewardModal";
import { Badge } from "../../types/redux/blogInterface";
import DeleteModal from "../../Admin/components/modals/deleteModal";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { toast } from "sonner";
import {
  resetAnimation,
  resetBadgeSlice,
} from "../../features/badge/badgeSlice";
import {
  collectBadgeThunk,
  removeBadgeFromUserThunk,
} from "../../features/badge/badgeThunk";

interface Props {
  badges: MyBadge[];
  loading: boolean;
  deleteSuccess: boolean;
  message: string;
}

const MyBadges = ({ badges, loading, deleteSuccess, message }: Props) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [delteModal, setDeleteModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useAppDispatch();
  const handleDeleteClick = () => {
    setDeleteModal(true);
  };
  const handleConfirmDelete = () => {
    dispatch(removeBadgeFromUserThunk(selectedBadge?._id as string));
  };

  const handleCollectBack = async (badgeId: string) => {
    console.log(badgeId, "iiddddd");
    await dispatch(collectBadgeThunk(badgeId)).unwrap();
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(message);
      dispatch(resetBadgeSlice());
      setSelectedBadge(null);
      setDeleteModal(false);
    }
  }, [deleteSuccess, dispatch, message]);

  const collectedBadges = badges.filter((item) => !item.isDeleted);

  const removedBadges = badges.filter((item) => item.isDeleted);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading badges...</p>
        </div>
      </div>
    );
  }

  if (!badges.length) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="max-w-sm text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center">
            <FaMedal className="text-3xl text-yellow-400" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white">No Badges Yet</h2>

          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            Start posting, gaining likes, and engaging with the community to
            unlock exclusive achievement badges.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 ">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground">
            Achievement Badges
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Collected badges showcase your achievements and community activity.
          </p>
        </div>

        <div className="flex gap-3 mb-8">
          <div className="px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-yellow-400 font-bold text-sm">
              {collectedBadges.length} Collected
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 font-bold text-sm">
              {removedBadges.length} Removed
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}

      {/* Active Badges */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-bold text-white">Collected Badges</h3>

          <div className="h-px flex-1 ml-4 bg-gradient-to-r from-yellow-500/40 to-transparent" />
        </div>

        {collectedBadges.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {collectedBadges.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161625] to-[#1f1f35] p-5 shadow-xl cursor-pointer"
                onClick={() => {
                  dispatch(resetAnimation());
                  setSelectedBadge(item.badge);
                  setIsDeleted(item.isDeleted);
                }}
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-yellow-400/5" />

                {/* Badge Image */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full bg-yellow-400/10 blur-2xl" />

                  <img
                    src={item.badge.image}
                    alt={item.badge.name}
                    className="relative z-10 w-28 h-28 object-contain drop-shadow-[0_0_25px_rgba(255,215,0,0.45)]"
                  />
                </div>

                {/* Content */}
                <div className="mt-5 text-center">
                  <h4 className="text-white font-bold text-sm">
                    {item.badge.name}
                  </h4>

                  <p className="mt-2 text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {item.badge.description}
                  </p>
                </div>

                {/* Shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute -left-20 top-0 h-full w-16 rotate-12 bg-white/10 blur-xl group-hover:left-[120%] transition-all duration-1000" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-gray-400">No collected badges available.</p>
          </div>
        )}
      </div>

      {/* Removed Badges */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-bold text-red-400">
            Removed From Profile
          </h3>

          <div className="h-px flex-1 ml-4 bg-gradient-to-r from-red-500/40 to-transparent" />
        </div>

        {removedBadges.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {removedBadges.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-3xl border border-red-500/10 bg-gradient-to-br from-[#161625] to-[#111118] p-5 shadow-xl opacity-70 "
              >
                {/* Removed overlay */}
                <div
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/20 hover:bg-emerald-500/30 transition cursor-pointer z-20"
                  onClick={() => handleCollectBack(item.badge._id as string)}
                >
                  <span className="text-[10px] font-bold text-emerald-400">
                    Collect Back
                  </span>
                </div>
                {/* <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-red-500/20 border border-red-500/20">
                  <span className="text-[10px] font-bold text-red-400">
                    REMOVED
                  </span>
                </div> */}

                {/* Image */}
                <div className="relative flex items-center justify-center grayscale">
                  <div className="absolute w-24 h-24 rounded-full bg-red-500/10 blur-2xl" />

                  <img
                    src={item.badge.image}
                    alt={item.badge.name}
                    className="relative z-10 w-28 h-28 object-contain opacity-70"
                  />
                </div>

                {/* Content */}
                <div className="mt-5 text-center">
                  <h4 className="text-gray-300 font-bold text-sm">
                    {item.badge.name}
                  </h4>

                  <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {item.badge.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-gray-400">No removed badges.</p>
          </div>
        )}
      </div>
      {selectedBadge && (
        <BadgeRewardModal
          badge={selectedBadge}
          open={selectedBadge !== null}
          onClose={() => {
            setSelectedBadge(null);
            setIsDeleted(false);
          }}
          from="profile"
          isDeleted={isDeleted}
          handleDeleteClick={handleDeleteClick}
        />
      )}
      {delteModal && selectedBadge && (
        <DeleteModal
          onClose={() => {
            setDeleteModal(false);
          }}
          item="Badge"
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default MyBadges;
