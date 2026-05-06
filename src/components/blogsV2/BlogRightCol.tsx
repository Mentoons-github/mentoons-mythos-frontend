import ProblemCard from "../home/problemCard";
import { BABY_DEITIES_IMAGES } from "../../constants/babyDeities/babyDeitiesCard";

const BlogRightCol = ({
  handlePathClick,
}: {
  handlePathClick: (from: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-6 border rounded-2xl shadow-md p-5">
      <div className="bg-background shadow-md rounded-2xl p-5 border">
        <h2 className="text-lg font-semibold mb-2">
          Didn't test your intelligence yet?
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Take a quick test and see where you stand.
        </p>
        <button
          className="w-full bg-foreground/90 text-background py-2 rounded-lg hover:opacity-90 transition"
          onClick={() => handlePathClick("psychology")}
        >
          Take a Test
        </button>
      </div>

      <div className="bg-background shadow-md rounded-2xl p-5 border">
        <h2 className="text-lg font-semibold mb-2">Know your birth sign</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Discover insights based on your birth details.
        </p>
        <button
          className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition"
          onClick={() => handlePathClick("astrology")}
        >
          Check Now
        </button>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <ProblemCard
            from="blog"
            data={BABY_DEITIES_IMAGES.slice(0, BABY_DEITIES_IMAGES.length / 2)}
          />
        </div>
        <div>
          <ProblemCard
            from="blog"
            data={BABY_DEITIES_IMAGES.slice(
              BABY_DEITIES_IMAGES.length / 2,
              BABY_DEITIES_IMAGES.length,
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogRightCol;
