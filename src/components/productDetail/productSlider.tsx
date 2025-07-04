import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import ProductCard from "../cards/productCard";
import { motion } from "framer-motion";
import { Product } from "../../types";

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider = ({ products }: ProductSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 200 : 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition block"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Product Slider */}
      <motion.div
        ref={sliderRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-3 sm:gap-4 md:gap-6 px-2 sm:px-6 lg:px-8 pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="snap-start shrink-0 w-[180px] sm:w-[220px] md:w-[250px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </motion.div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition block"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Hide scrollbar */}
      <style>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductSlider;
