import { Dispatch, SetStateAction } from "react";

const BlogHiring = ({
  setApplyJob,
}: {
  setApplyJob: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <div className="space-y-5">
      <div className="bg-background border rounded-2xl p-5 flex flex-col gap-4">
        <h2 className="text-lg font-semibold leading-snug">
          Become a Mythology Story Teller
        </h2>

        <img
          src="/assets/blog/mythology-story-teller.png"
          alt="Mythology Story Teller"
          className="w-full object-cover rounded-xl"
        />

        <p className="text-sm text-muted-foreground">
          Share your stories, inspire others, and become part of our
          storytelling community.
        </p>

        <button
          className="w-full bg-foreground/90 text-background py-2 rounded-lg font-medium hover:bg-foreground/80 transition"
          onClick={() => setApplyJob("Mythology Story Teller")}
        >
          Apply Now
        </button>
      </div>
      <div className="bg-background border rounded-2xl p-5 flex flex-col gap-4">
        <h2 className="text-lg font-semibold leading-snug">
          Join us as a Sanskrit Teacher
        </h2>

        <img
          src="/assets/hiring/Psychology.png"
          alt="Mythology Story Teller"
          className="w-full object-cover rounded-xl"
        />

        <p className="text-sm text-muted-foreground">
          Share your stories, inspire others, and become part of our
          storytelling community.
        </p>

        <button
          className="w-full bg-foreground/90 text-background py-2 rounded-lg font-medium hover:bg-foreground/80 transition"
          onClick={() => setApplyJob("Sanskrit Teacher")}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default BlogHiring;
