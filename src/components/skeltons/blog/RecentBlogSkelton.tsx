const RecentBlogSkelton = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="mb-6 border-b pb-4 animate-pulse flex gap-5"
        >
          <div className="h-[150px] w-[250px] bg-gray-300 rounded"></div>
          <div className="flex flex-col flex-1">
            <div className="h-3 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-5 w-3/4 bg-gray-300 rounded mb-3"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-3"></div>
            <div className="space-y-2 mb-4">
              <div className="h-2 w-full bg-gray-300 rounded"></div>
              <div className="h-2 w-11/12 bg-gray-300 rounded"></div>
              <div className="h-2 w-5/6 bg-gray-300 rounded"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((__, i) => (
                <div key={i} className="h-4 w-16 bg-yellow-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentBlogSkelton;
