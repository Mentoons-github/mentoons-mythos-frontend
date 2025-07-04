import { useState, useEffect } from "react";
import { Heart, ArrowRight } from "lucide-react";
import WishListHeader from "../components/wishlist/header";
import ControlsAndFilters from "../components/wishlist/controlsAndFilters";
import WishListCard from "../components/cards/wishListCard";

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

const PremiumWishlist = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Zodiac T-Shirt",
      description: "Perfect Aries design for fire signs",
      price: "₹1,999",
      image: "/assets/mythosProducts/mockup-1.png",
      category: "Apparel",
      rating: 4.8,
      reviews: 124,
      inStock: true,
      isNew: true,
    },
    {
      id: 2,
      name: "Planet Hoodie",
      description: "Jupiter-inspired cosmic comfort",
      price: "₹3,499",
      image: "/assets/mythosProducts/mockup5.png",
      category: "Apparel",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      isNew: false,
    },
    {
      id: 3,
      name: "Constellation Cap",
      description: "Night sky pattern, adjustable fit",
      price: "₹1,499",
      image: "/assets/mythosProducts/tote-bag-mockup.png",
      category: "Accessories",
      rating: 4.7,
      reviews: 56,
      inStock: false,
      isNew: false,
    },
    {
      id: 4,
      name: "Mythology Tote",
      description: "Greek gods artwork, eco-friendly",
      price: "₹999",
      image: "/assets/mythosProducts/image 23.png",
      category: "Accessories",
      rating: 4.6,
      reviews: 78,
      inStock: true,
      isNew: true,
    },
  ];

  const [wishlistItems, setWishlistItems] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [removingItem, setRemovingItem] = useState<number | null>(null);

  const categories = ["All", "Apparel", "Accessories"];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const removeFromWishlist = (id: number) => {
    setRemovingItem(id);
    setTimeout(() => {
      setWishlistItems((items) => items.filter((item) => item.id !== id));
      setRemovingItem(null);
    }, 500);
  };

  const filteredItems = wishlistItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalValue = filteredItems.reduce((sum, item) => {
    return sum + parseInt(item.price.replace("₹", "").replace(",", ""));
  }, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white opacity-3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <WishListHeader itemsLength={wishlistItems.length} />

      {/* Controls */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ControlsAndFilters
          categories={categories}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          setSearchTerm={setSearchTerm}
          setSelectedCategory={setSelectedCategory}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />

        {/* Stats Bar */}
        <div className="flex items-center justify-between mb-8 p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700">
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {filteredItems.length}
              </div>
              <div className="text-gray-400 text-sm">Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                ₹{totalValue.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {filteredItems.filter((item) => item.inStock).length}
              </div>
              <div className="text-gray-400 text-sm">In Stock</div>
            </div>
          </div>
          <button className="bg-gradient-to-r from-white to-gray-200 text-black px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-105 group">
            Add All to Cart
            <ArrowRight className="inline ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="relative">
              <Heart className="h-24 w-24 text-gray-700 mx-auto mb-6 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-gray-600 rounded-full animate-spin"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No cosmic treasures found
            </h3>
            <p className="text-gray-400 text-lg">
              {searchTerm || selectedCategory !== "All"
                ? "Try adjusting your search or explore different categories"
                : "Start your mythical journey by adding items to your wishlist"}
            </p>
          </div>
        )}

        {/* Wishlist Grid/List */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              : "space-y-8"
          }`}
        >
          {filteredItems.map((item, index) => (
            <WishListCard
              key={item.id}
              item={item}
              index={index}
              viewMode={viewMode}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              removingItem={removingItem}
              removeFromWishlist={removeFromWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumWishlist;
