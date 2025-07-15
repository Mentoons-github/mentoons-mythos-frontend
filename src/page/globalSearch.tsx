import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  Moon,
  Sparkles,
  Filter,
  Grid,
  List,
  X,
  ChevronDown,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Zodiac T-Shirt",
    description: "Perfect Aries design for fire signs",
    price: "₹1,999",
    image: "/assets/mythosProducts/mockup-1.png",
    category: "Apparel",
  },
  {
    id: 2,
    name: "Planet Hoodie",
    description: "Jupiter-inspired cosmic comfort",
    price: "₹3,499",
    image: "/assets/mythosProducts/mockup5.png",
    category: "Apparel",
  },
  {
    id: 3,
    name: "Constellation Cap",
    description: "Night sky pattern, adjustable fit",
    price: "₹1,499",
    image: "/assets/mythosProducts/tote-bag-mockup.png",
    category: "Accessories",
  },
  {
    id: 4,
    name: "Mythology Tote",
    description: "Greek gods artwork, eco-friendly",
    price: "₹999",
    image: "/assets/mythosProducts/image 23.png",
    category: "Accessories",
  },
  {
    id: 5,
    name: "Zodiac T-Shirt",
    description: "Perfect Aries design for fire signs",
    price: "₹1,999",
    image: "/assets/mythosProducts/mockup6.png",
    category: "Apparel",
  },
  {
    id: 6,
    name: "Planet Hoodie",
    description: "Jupiter-inspired cosmic comfort",
    price: "₹3,499",
    image: "/assets/mythosProducts/mock6 1.png",
    category: "Apparel",
  },
  {
    id: 7,
    name: "Constellation Cap",
    description: "Night sky pattern, adjustable fit",
    price: "₹1,499",
    image: "/assets/mythosProducts/mockup4.png",
    category: "Accessories",
  },
  {
    id: 8,
    name: "Mythology Tote",
    description: "Greek gods artwork, eco-friendly",
    price: "₹999",
    image: "/assets/mythosProducts/mockup-2.png",
    category: "Accessories",
  },
];

const GlobalSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ["All", "Apparel", "Accessories"];

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return (
            parseInt(a.price.replace("₹", "").replace(",", "")) -
            parseInt(b.price.replace("₹", "").replace(",", ""))
          );
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const starVariants = {
    twinkle: {
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 180, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const ProductCard = ({
    product,
    index,
  }: {
    product: Product;
    index: number;
  }) => (
    <motion.div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-200"
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
    >
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Star className="w-12 h-12 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
        <motion.div
          className="absolute top-2 right-2 w-3 h-3 bg-gray-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {product.price}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const ProductListItem = ({
    product,
    index,
  }: {
    product: Product;
    index: number;
  }) => (
    <motion.div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-200"
      variants={itemVariants}
      whileHover={{ x: 5 }}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <Star className="w-8 h-8 text-gray-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {product.price}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Animated Background Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={starVariants}
            animate="twinkle"
            transition={{ delay: Math.random() * 3 }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        className="relative bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Moon className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900">
                Cosmic Search
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              {filteredProducts.length} products found
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search and Filters */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Search Bar */}
        <motion.div className="relative mb-6" variants={itemVariants}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search through the cosmos..."
              className="w-full pl-12 pr-4 py-4 text-lg bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <motion.div
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Filters and View Controls */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8"
          variants={itemVariants}
        >
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>{selectedCategory}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                          selectedCategory === category
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {filteredProducts.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center py-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <motion.div
                className="relative mb-8"
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-white" />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <X className="w-3 h-3 text-white" />
                </motion.div>
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No cosmic products found
              </h2>
              <p className="text-gray-600 text-center max-w-md mb-6">
                The stars haven't aligned for your search. Try exploring
                different keywords or categories.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Zodiac", "Planet", "Constellation", "Mythology"].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              }
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product, index) =>
                viewMode === "grid" ? (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ) : (
                  <ProductListItem
                    key={product.id}
                    product={product}
                    index={index}
                  />
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GlobalSearchPage;
