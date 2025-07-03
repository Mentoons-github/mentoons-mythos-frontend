import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import ProductCard from "../cards/productCard";
import { motion } from "framer-motion";
import { Product } from "../../types";

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider = ({ products }: ProductSliderProps) => {
  console.log("products :", products);
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
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition hidden sm:block"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <motion.div
        ref={sliderRef}
        variants={containerVariants}
        initial="hidden"
        animate={"visible"}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 md:gap-6 px-8"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
        }}
      >
        {products.map((product) => (
          <div key={product.id} className="snap-start shrink-0 w-[250px]">
            <ProductCard product={product} />
          </div>
        ))}
        <style>{`
          .scrollbar-hidden::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </motion.div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition hidden sm:block"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ProductSlider;
