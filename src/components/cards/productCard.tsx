import { motion } from "framer-motion";
import { Product } from "../../types";

export interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  if (!product) return;

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      key={product.id}
      variants={itemVariants}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px rgba(227, 151, 18, 0.3)",
      }}
      className="bg-gray-900 rounded-lg overflow-hidden transition-all relative mt-10"
    >
      {/* <div className="absolute inset-0  bg-black/70 bg-opacity-60 flex items-center justify-center z-10">
        <span className="text-[#E39712] text-lg md:text-xl font-semibold opacity-90">
          Coming Soon...
        </span>
      </div> */}

      <div className="z-0">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover object-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="p-3 md:p-4">
          <h3 className="text-base md:text-lg font-semibold text-white">
            {product.name}
          </h3>
          <p className="text-gray-400 text-xs md:text-sm mt-1 truncate">
            {product.description}
          </p>
           {/* <p className="text-gray-400 text-2xl mt-1 truncate">
            {product.price}
          </p> */}
          {/* <div className="mt-3 md:mt-4 grid grid-cols-2 gap-2">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#E39712] text-black font-bold py-1 md:py-2 px-2 md:px-3 rounded hover:bg-[#c17e0f] transition-colors text-xs md:text-sm"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="bg-transparent border border-[#E39712] text-[#E39712] font-bold py-1 md:py-2 px-2 md:px-3 rounded hover:bg-[#E39712]/10 transition-colors text-xs md:text-sm"
            >
              Save Later
            </motion.button>
          </div> */}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
