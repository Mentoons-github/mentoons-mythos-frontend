import { useEffect } from "react";
import BlogsCard from "../../cards/blogsCard";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchByMostReadThunk } from "../../../features/blog/blogThunk";

const LeftSection = () => {
  const dispatch = useAppDispatch();
  const { mostReadBlogs } = useAppSelector((state) => state.blog);
  const { user } = useAppSelector((state) => state.user);
  const userId = user?._id;

  useEffect(() => {
    dispatch(fetchByMostReadThunk());
  }, []);

  return (
    <div className="flex flex-col items-start gap-5 w-full">
      <BlogsCard blogs={mostReadBlogs} userId={userId ?? ""} />
    </div>
  );
};

export default LeftSection;
