interface PostImageProps {
  src?: string;
  alt?: string;
}

const BlogImage: React.FC<PostImageProps> = ({ src, alt }) => {
  return (
    <img
      src={src || "/assets/logo/Logo 2.png"}
      alt={alt}
      className="w-full h-58 object-cover rounded-md mb-4"
    />
  );
};

export default BlogImage;