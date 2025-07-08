import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import PremiumImageModal from "../modal/previewImageModal";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew: boolean;
}

interface WishListCardProps {
  item: Product;
  index: number;
  viewMode: "grid" | "list";
  hoveredItem: number | null;
  setHoveredItem: Dispatch<SetStateAction<number | null>>;
  removingItem: number | null;
  removeFromWishlist: (id: number) => void;
}

const WishListCard = ({
  item,
  index,
  viewMode,
  hoveredItem,
  setHoveredItem,
  removingItem,
  removeFromWishlist,
}: WishListCardProps) => {
    
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        key={item.id}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        className={`group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl overflow-hidden backdrop-blur-lg border border-gray-700 hover:border-white/30 transition-all duration-700 hover:shadow-2xl hover:shadow-white/20 animate-fadeInUp ${
          removingItem === item.id ? "opacity-50 scale-95" : ""
        } ${
          viewMode === "list"
            ? "flex items-center p-8 hover:bg-gradient-to-r hover:from-gray-900/90 hover:to-gray-800/90"
            : "flex-col hover:bg-gradient-to-br hover:from-gray-900/90 hover:to-gray-700/90"
        }`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* New Badge */}
        {item.isNew && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            NEW
          </div>
        )}

        {/* Remove from Wishlist Button */}
        <button
          onClick={() => removeFromWishlist(item.id)}
          className={`absolute top-4 right-4 z-10 p-3 bg-white/90 rounded-full hover:bg-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm ${
            hoveredItem === item.id ? "animate-pulse" : ""
          }`}
        >
          <Heart className="h-5 w-5 text-red-500 hover:text-white fill-current transition-colors duration-300" />
        </button>

        {/* Image Container */}
        <div
          className={`relative overflow-hidden ${
            viewMode === "list"
              ? "w-40 h-40 flex-shrink-0 mr-8 rounded-2xl"
              : "w-full h-72"
          }`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Quick Actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex space-x-4">
              <button
                onClick={() => setIsModalOpen(true)} // Open modal on click
                className="p-4 bg-white/95 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-lg"
              >
                <Eye className="h-6 w-6 text-black" />
              </button>
              <button className="p-4 bg-white/95 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-lg">
                <ShoppingCart className="h-6 w-6 text-black" />
              </button>
            </div>
          </div>

          {/* Stock Status */}
          {!item.inStock && (
            <div className="absolute bottom-4 left-4 bg-red-500/95 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm shadow-lg">
              Out of Stock
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`${viewMode === "list" ? "flex-1 py-4" : "p-8"}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-2xl text-white group-hover:text-gray-200 transition-colors leading-tight">
                {item.name}
              </h3>
              <p className="text-gray-400 text-base mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(item.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="ml-3 text-gray-400 text-sm">
              {item.rating} ({item.reviews} reviews)
            </span>
          </div>

          {/* Price and Category */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors">
              {item.price}
            </div>
            <span className="px-4 py-2 bg-gray-800/60 text-gray-300 rounded-full text-sm font-medium backdrop-blur-sm">
              {item.category}
            </span>
          </div>

          {/* Action Button */}
          <button
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
              item.inStock
                ? "bg-gradient-to-r from-white to-gray-200 text-black hover:shadow-lg hover:shadow-white/30 hover:from-gray-100 hover:to-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!item.inStock}
          >
            {item.inStock ? "Add to Cart" : "Notify When Available"}
          </button>
        </div>
      </div>

      {/* Render PremiumImageModal */}
      <PremiumImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={item}
      />
    </>
  );
};

export default WishListCard;
