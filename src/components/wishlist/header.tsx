import { Heart } from "lucide-react";

const WishListHeader = ({ itemsLength }: { itemsLength: number }) => {
  console.log(itemsLength)
  return (
    <div className=" z-10  backdrop-blur-xl sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Heart className="h-10 w-10 " fill="currentColor" />
              {/* <div className="absolute -top-2 -right-2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                {itemsLength}
              </div> */}
            </div>
            <div>
              <h1 className="text-3xl font-bold ">
                My Wishlist
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Curated collection of cosmic essentials
              </p>
            </div>
          </div>
          {/* <div className="flex items-center space-x-4">
            <button className="p-3 hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110 group">
              <Share2 className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
            </button>
            <button className="p-3 hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110 group">
              <Sparkles className="h-5 w-5 group-hover:text-yellow-400 transition-colors" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WishListHeader;
