import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchAllUserCountThunk } from "../../features/user/userThunk";
import { fetcheBlogCountThunk } from "../../features/blog/blogThunk";
import {
  fetchJobApplicationCountThunk,
  fetchJobsCountThunk,
} from "../../features/career/careerThunk";
import {
  Users,
  ShoppingBag,
  FileText,
  Briefcase,
  ClipboardList,
} from "lucide-react";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import {
  fetchEnquiryCountThunk,
  fetchWorkshopCountThunk,
} from "../../features/workshop/workshopThunk";
import { PiBookOpenUser } from "react-icons/pi";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { userCount } = useAppSelector((state) => state.user);
  const { blogCount } = useAppSelector((state) => state.blog);
  const { enquiryCount, workshopCount } = useAppSelector(
    (state) => state.workshop
  );
  const { jobCount, jobApplicationCount } = useAppSelector(
    (state) => state.career
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllUserCountThunk());
    dispatch(fetcheBlogCountThunk());
    dispatch(fetchJobsCountThunk());
    dispatch(fetchJobApplicationCountThunk());
    dispatch(fetchEnquiryCountThunk());
    dispatch(fetchWorkshopCountThunk());
  }, [dispatch]);

  const stats = [
    {
      label: "Total Users",
      value: userCount,
      icon: <Users className="w-10 h-10" />,
      iconBg: "#100f4b",
      bg: "#100f4b",
      navigate: "/admin/users",
    },
    {
      label: "Products",
      value: 0,
      icon: <ShoppingBag className="w-10 h-10" />,
      iconBg: "#430844",
      bg: "#430844",
      navigate: "/admin/products",
    },
    {
      label: " Blogs",
      value: blogCount,
      icon: <FileText className="w-10 h-10" />,
      iconBg: "#0f4b28",
      bg: "#0f4b28",
      navigate: "/admin/blogs/all",
    },
    {
      label: "Active Jobs",
      value: jobCount,
      icon: <Briefcase className="w-10 h-10" />,
      iconBg: "#902606",
      bg: "#902606",
      navigate: "/admin/career/jobs",
    },
    {
      label: "Applications",
      value: jobApplicationCount,
      icon: <ClipboardList className="w-10 h-10" />,
      iconBg: "#033d41",
      bg: "#033d41",
      navigate: "/admin/career/applications",
    },
    {
      label: "Enquiries",
      value: enquiryCount,
      icon: <PiBookOpenUser className="w-10 h-10" />,
      iconBg: "#4d6602",
      bg: "#4d6602",
      navigate: "/admin/workshops/enquiries",
    },
    {
      label: "Workshops",
      value: workshopCount,
      icon: <PiBookOpenUser className="w-10 h-10" />,
      iconBg: "#4d6602",
      bg: "#4d6602",
      navigate: "/admin/workshops/enquiries",
    },
  ];

  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-r  text-black rounded-2xl shadow-lg p-10  hover:scale-105 transition-transform"
            style={{ backgroundColor: `${stat.bg}10` }}
            onClick={() => navigate(stat.navigate)}
          >
            <div className="space-y-5 flex justify-between ">
              <div
                className="opacity-90 h-16 w-16 rounded-2xl flex items-center justify-center text-[#060606]"
                style={{ backgroundColor: stat.iconBg }}
              >
                {stat.icon}
              </div>

              <div className=" text-[#b7c3c6] ">
                <p className="text-6xl font-extrabold ">
                  <CountUp
                    start={0}
                    end={stat.value || 0}
                    duration={3}
                    separator=","
                  />
                </p>
              </div>
            </div>
            <h2 className="text-xl font-bold text-[#b7c3c6]">{stat.label}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
