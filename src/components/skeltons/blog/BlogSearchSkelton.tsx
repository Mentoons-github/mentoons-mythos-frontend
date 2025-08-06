
const BlogSearchSkelton = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="mb-4 border-b pb-2 animate-pulse">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="flex flex-wrap gap-2 mt-1">
            {Array.from({ length: 3 }).map((__, i) => (
              <div key={i} className="h-4 w-12 bg-yellow-100 rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSearchSkelton;
