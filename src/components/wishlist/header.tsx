import { Heart, Share2, Sparkles } from "lucide-react";

const WishListHeader = ({ itemsLength }: { itemsLength: number }) => {
  return (
    <div className="relative z-10 border-b border-gray-800 bg-black/80 backdrop-blur-xl sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Heart className="h-10 w-10 text-white" fill="currentColor" />
              <div className="absolute -top-2 -right-2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                {itemsLength}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                My Wishlist
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Curated collection of cosmic essentials
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-3 hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110 group">
              <Share2 className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
            </button>
            <button className="p-3 hover:bg-gray-800 rounded-full transition-all duration-300 hover:scale-110 group">
              <Sparkles className="h-5 w-5 group-hover:text-yellow-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListHeader;
