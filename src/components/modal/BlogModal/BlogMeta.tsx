import { format } from "date-fns";

interface BlogMetaProps {
  writer?: string;
  createdAt?: string | Date;
}

const BlogMeta: React.FC<BlogMetaProps> = ({ writer, createdAt }) => {
  return (
    <p className="text-sm text-gray-600 mb-2">
      <span className="font-semibold text-purple-700">{writer}</span> •{" "}
      {createdAt && (
        <span>{format(new Date(createdAt), "dd MMM yyyy")}</span>
      )}
    </p>
  );
};

export default BlogMeta;