interface BlogContentProps {
  description: string;
  tags?: string[];
}

const BlogContent: React.FC<BlogContentProps> = ({ description, tags }) => {
  return (
    <div>
      <div className="max-h-60 hide-scrollbar overflow-y-auto pr-2 mb-4 will-change-scroll transform-gpu">
        <p className="text-gray-800 whitespace-pre-line">
          {description}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {Array.isArray(tags) &&
          tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-sm text-green-600 font-medium px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default BlogContent;