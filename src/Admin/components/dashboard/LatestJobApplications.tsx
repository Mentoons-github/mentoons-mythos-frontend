import { useNavigate } from "react-router-dom";
import { Career } from "../../../types/redux/careerInterface";
import { ArrowUpRight, User } from "lucide-react";

const LatestJobApplications = ({
  applications,
}: {
  applications: Career[];
}) => {
    const navigate = useNavigate()
  const latest = [...applications]
    .sort(
      (a, b) =>
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    )
    .slice(0, 5); 

  return (
    <div className="bg-secondary px-3 py-6 rounded-xl shadow-lg border  ">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-bold ">Latest Applicants</h2>
        <div className="border border-foreground rounded hover:border-blue-800" onClick={()=>navigate("/admin/career/applications")}>
            <ArrowUpRight className="hover:text-blue-800" size={20}/>
        </div>
      </div>

      <div className="space-y-2  h-[270px] overflow-auto hide-scrollbar">
        {latest.map((app) => (
          <div
            key={app._id}
            className="flex items-center gap-4 p-3 rounded-lg bg-background  border shadow-sm hover:shadow-md transition "
          >
            <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {app.name?.charAt(0).toUpperCase() || <User size={18} />}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-sm ">{app.name}</p>
              <p className="text-xs text-muted-foreground">{app.position}</p>
            </div>

            <span className="text-xs text-muted-foreground">
              {new Date(app.createdAt!).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestJobApplications;
