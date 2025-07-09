import {
  HiLocationMarker,
  HiClock,
  HiCalendar,
  HiBriefcase,
  HiUserGroup,
  HiPhone,
  HiOutlineSparkles,
} from "react-icons/hi";

const Summary = () => {
  const jobDetails = [
    {
      icon: HiLocationMarker,
      title: "Location",
      value: "Bangalore/Remote",
    },
    {
      icon: HiBriefcase,
      title: "Job Type",
      value: "Full Time/Part-time",
    },
    {
      icon: HiOutlineSparkles,
      title: "Date Posted",
      value: "Posted 24hrs ago",
    },
    {
      icon: HiUserGroup,
      title: "Experience",
      value: "0-3 years",
    },
    {
      icon: HiClock,
      title: "Working Hours",
      value: "9 AM - 6 PM",
    },
    {
      icon: HiCalendar,
      title: "Working Days",
      value: "Weekly: 5 days\nWeekend: Saturday, Sunday",
    },
    {
      icon: HiPhone,
      title: "Availability",
      value: "Should be available for phone calls",
    },
  ];

  return (
    <div className="min-h-screen w-full p-8 lg:p-16 bg-black relative overflow-hidden">
      {/* Enhanced animated background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,white_2px,transparent_2px)] bg-[length:60px_60px] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,white_1px,transparent_1px)] bg-[length:80px_80px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_49%,white_50%,transparent_51%)] bg-[length:100px_100px] opacity-20"></div>
      </div>

      {/* Large decorative elements */}
      <div
        className="absolute top-20 right-20 w-64 h-64 border-2 border-white/10 rounded-full animate-spin"
        style={{ animationDuration: "30s" }}
      ></div>
      <div
        className="absolute top-32 right-32 w-32 h-32 border border-white/20 rounded-full animate-spin"
        style={{ animationDuration: "20s", animationDirection: "reverse" }}
      ></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 border border-white/15 rounded-full animate-pulse"></div>
      <div
        className="absolute bottom-32 left-32 w-24 h-24 border-2 border-white/25 rotate-45 animate-bounce"
        style={{ animationDuration: "4s" }}
      ></div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-bounce"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        ></div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced header section */}
        <div className="mb-16 text-center">
          <h1 className="text-white text-2xl lg:text-7xl font-black mb-8 tracking-tight">
            JOB
            <span className="block relative">
              SUMMARY
              <div className="absolute bottom-2 left-0 w-full h-6 bg-white/20 -z-10"></div>
            </span>
          </h1>

          <p className="text-white/70 text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            Discover the perfect opportunity that aligns with your career
            aspirations and professional goals.
          </p>

          {/* Decorative separator */}
          <div className="flex items-center justify-center mt-12">
            <div className="w-24 h-0.5 bg-white/50"></div>
            <div className="w-4 h-4 bg-white rounded-full mx-6"></div>
            <div className="w-24 h-0.5 bg-white/50"></div>
          </div>
        </div>

        {/* Enhanced grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {jobDetails.map((detail, index) => (
            <div
              key={index}
              className="group relative bg-black/50 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20 hover:border-white/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
            >
              {/* Enhanced hover effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>

              {/* Enhanced corner accents */}
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="p-6 rounded-2xl bg-white shadow-2xl group-hover:shadow-white/20 group-hover:scale-110 transition-all duration-500">
                    <detail.icon className="text-4xl text-black" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-white/60 text-sm font-bold uppercase tracking-[0.2em] group-hover:text-white/80 transition-colors duration-300">
                      {detail.title}
                    </h3>
                    <p className="text-white text-lg font-semibold leading-relaxed whitespace-pre-line group-hover:text-white transition-colors duration-300">
                      {detail.value}
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced animated border effects */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-white/60 to-transparent animate-pulse"></div>
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-white/60 to-transparent animate-pulse"></div>
                <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-t from-transparent via-white/60 to-transparent animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
