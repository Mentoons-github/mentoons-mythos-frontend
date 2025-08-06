const ProfileBlogSkelton = () => {
  return (
    <div className="grid gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse"
        >
          <div className="space-y-3">
            <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileBlogSkelton;
