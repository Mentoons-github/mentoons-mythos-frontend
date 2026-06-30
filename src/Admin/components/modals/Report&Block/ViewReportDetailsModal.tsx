import {
  X,
  ShieldAlert,
  CheckCircle2,
  Trash2,
  EyeOff,
  AlertTriangle,
  Ban,
} from "lucide-react";
import { Report } from "../../../../types/redux/report";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { toast } from "sonner";
import { formatToRealDate } from "../../../../utils/DateFormate";
import { resetReportBlockSlice } from "../../../../features/report-block/report_blockSlice";
import { takeReportActionThunk } from "../../../../features/report-block/report_blockThunk";

const ViewReportDetailsModal = ({
  onClose,
  report,
  loading,
}: {
  onClose: () => void;
  report?: Report;
  loading: boolean;
}) => {
  const dispatch = useAppDispatch();

  const { actionLoading, actionSuccess, actionMessage, error } = useAppSelector(
    (state) => state.report_block,
  );

  const [selectedAction, setSelectedAction] = useState("");
  const [showOverwriteActions, setShowOverwriteActions] = useState(false);

  useEffect(() => {
    if (actionSuccess) {
      toast.success(actionMessage);
      setShowOverwriteActions(false);
      dispatch(resetReportBlockSlice());
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(resetReportBlockSlice());
    }
  }, [actionSuccess, actionMessage, error, dispatch, onClose]);

  const handleAction = (action: string) => {
    if (!report?._id) return;

    setSelectedAction(action);

    dispatch(
      takeReportActionThunk({
        reportId: report._id,
        action,
      }),
    );
  };

  const actionButtons = [
    {
      label: `Delete ${report?.targetType}`,
      action: "delete",
      icon: Trash2,
      className: "bg-red-500 hover:bg-red-600 text-white",
    },

    {
      label: `Hide ${report?.targetType}`,
      action: "hide",
      icon: EyeOff,
      className: "border hover:bg-muted",
    },

    {
      label: "Warn User",
      action: "warn_user",
      icon: AlertTriangle,
      className: "border hover:bg-yellow-500/10 hover:border-yellow-500",
    },

    {
      label: "Ban User",
      action: "ban_user",
      icon: Ban,
      className: "border hover:bg-red-500/10 hover:border-red-500",
    },

    {
      label: "Ignore Report",
      action: "ignore",
      icon: CheckCircle2,
      className: "border hover:bg-muted",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-secondary shadow-2xl border border-border p-6 md:p-8 hide-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition"
        >
          <X size={20} />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />

            <p className="mt-4 text-muted-foreground">
              Loading report details...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header */}
            <div className="border-b pb-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-red-500" size={28} />

                <div>
                  <h2 className="text-2xl font-bold">Moderation Report</h2>

                  <p className="text-sm text-muted-foreground">
                    Review reported content and take moderation action
                  </p>
                </div>
              </div>
            </div>

            {/* Users */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Reporter */}
              <div className="rounded-xl border p-4 bg-background/40">
                <p className="text-sm text-muted-foreground mb-1">
                  Reported By
                </p>

                <h3 className="font-semibold text-lg">
                  {report?.reportedBy?.firstName} {report?.reportedBy?.lastName}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {report?.reportedBy?.email}
                </p>
              </div>

              {/* Reported User */}
              <div className="rounded-xl border p-4 bg-background/40">
                <p className="text-sm text-muted-foreground mb-1">
                  Reported User
                </p>

                <h3 className="font-semibold text-lg">
                  {report?.reportedUser?.firstName}{" "}
                  {report?.reportedUser?.lastName}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {report?.reportedUser?.email}
                </p>
              </div>
            </div>

            {/* Report Details */}
            <div className="rounded-xl border p-5 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <p className="text-sm text-muted-foreground">Target Type</p>

                  <p className="font-medium capitalize">{report?.targetType}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Report Status</p>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-yellow-500/10 text-yellow-500">
                    <CheckCircle2 size={14} />

                    {report?.status}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Target ID</p>

                <p className="break-all text-sm">{report?.targetId}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Report Reason
                </p>

                <div className="rounded-lg bg-muted p-4 text-sm leading-relaxed">
                  {report?.reason}
                </div>
              </div>

              {report?.actionTaken && report?.actionTaken !== "none" && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Previous Action
                  </p>

                  <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 text-red-500 px-3 py-1 text-sm capitalize">
                    {report?.actionTaken.replace("_", " ")}
                  </div>
                </div>
              )}
            </div>

            {/* Moderation Actions */}
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
              <h3 className="text-lg font-semibold text-red-500 mb-4">
                Moderation Actions
              </h3>

              {/* Current Action */}
              {report?.actionTaken && report?.actionTaken !== "none" && (
                <div className="mb-5">
                  <p className="text-sm text-muted-foreground mb-2">
                    Current Action
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 text-indigo-500 px-3 py-1 text-sm capitalize">
                      {report?.actionTaken.replace(/_/g, " ")}
                    </div>

                    {!showOverwriteActions && (
                      <button
                        onClick={() => setShowOverwriteActions(true)}
                        className="px-4 py-2 rounded-lg border hover:bg-muted transition text-sm"
                      >
                        Overwrite Action
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Show buttons only if:
      1. no action taken
      2. overwrite clicked
  */}
              {(report?.actionTaken === "none" ||
                !report?.actionTaken ||
                showOverwriteActions) && (
                <div className="flex flex-wrap gap-3">
                  {actionButtons.map((btn) => {
                    const Icon = btn.icon;

                    return (
                      <button
                        key={btn.action}
                        disabled={actionLoading}
                        onClick={() => handleAction(btn.action)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition disabled:opacity-60 ${btn.className}`}
                      >
                        {actionLoading && selectedAction === btn.action ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Icon size={16} />
                        )}

                        {btn.label}
                      </button>
                    );
                  })}

                  {/* Cancel overwrite */}
                  {showOverwriteActions && (
                    <button
                      onClick={() => setShowOverwriteActions(false)}
                      className="px-4 py-2 rounded-lg border hover:bg-muted transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t pt-4 text-sm text-muted-foreground">
              <span>ID: {report?._id}</span>

              <span>Created: {formatToRealDate(report?.createdAt)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReportDetailsModal;
