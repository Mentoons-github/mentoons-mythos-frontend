import { motion } from "framer-motion";
import useInView from "../hooks/useInView";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import FAQ from "../components/about/FAQ";
import { NavLink } from "react-router-dom";
import ProductCard from "../components/cards/productCard";

const Shop = () => {
  const { ref: heroRef, isInView: heroInView } = useInView(0.3, true);
  const { ref: productsRef, isInView: productsInView } = useInView(0.2, true);
  const { ref: tattoosRef, isInView: tattoosInView } = useInView(0.2, true);

  const products = [
    {
      id: 1,
      name: "Zodiac T-Shirt",
      description: "Perfect Aries design for fire signs",
      price: "₹1,999",
      image: "/assets/mythosProducts/mockup-1.png",
    },
    {
      id: 2,
      name: "Planet Hoodie",
      description: "Jupiter-inspired cosmic comfort",
      price: "₹3,499",
      image: "/assets/mythosProducts/mockup5.png",
    },
    {
      id: 3,
      name: "Constellation Cap",
      description: "Night sky pattern, adjustable fit",
      price: "₹1,499",
      image: "/assets/mythosProducts/tote-bag-mockup.png",
    },
    {
      id: 4,
      name: "Mythology Tote",
      description: "Greek gods artwork, eco-friendly",
      price: "₹999",
      image: "/assets/mythosProducts/image 23.png",
    },
    {
      id: 5,
      name: "Zodiac T-Shirt",
      description: "Perfect Aries design for fire signs",
      price: "₹1,999",
      image: "/assets/mythosProducts/mockup6.png",
    },
    {
      id: 6,
      name: "Planet Hoodie",
      description: "Jupiter-inspired cosmic comfort",
      price: "₹3,499",
      image: "/assets/mythosProducts/mock6 1.png",
    },
    {
      id: 7,
      name: "Constellation Cap",
      description: "Night sky pattern, adjustable fit",
      price: "₹1,499",
      image: "/assets/mythosProducts/mockup4.png",
    },
    {
      id: 8,
      name: "Mythology Tote",
      description: "Greek gods artwork, eco-friendly",
      price: "₹999",
      image: "/assets/mythosProducts/mockup-2.png",
    },
  ];

  const Tattoos = [
    "/assets/tattoos/2023-06-16_13-36 1.png",
    "/assets/tattoos/Frame (1).png",
    "/assets/tattoos/Frame (2).png",
    "/assets/tattoos/image.png",
    "/assets/tattoos/Frame.png",
    "/assets/tattoos/image (1).png",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="bg-black text-white">
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="p-4 md:p-10 lg:p-20 bg-black bg-[url('/assets/background/section/stars_background.png')] min-h-[50vh] flex flex-col justify-center items-center"
      >
        <motion.h1
          initial={{ x: "100%", opacity: 0 }}
          animate={
            heroInView ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#E39712] font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wider text-center"
        >
          REPRESENT YOURSELF BY WEARING <br className="hidden md:block" />
          OUR RANGE OF MERCHANDISE
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={heroInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-[#FBF9F9] text-center mt-4 md:mt-7 max-w-3xl px-2"
        >
          Wear your planets, rising stars, birth signs, your favorite
          mythological characters and let that do all the talking!
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center items-center py-5 bg-[#9FE9FF]"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex relative p-1 rounded-lg border-2 border-gray-600 w-full max-w-xl mx-4"
        >
          <input
            type="text"
            placeholder="Search for products"
            className="outline-none p-2 text-black w-full text-sm md:text-base"
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center items-center p-2 md:p-3 bg-black rounded-lg cursor-pointer"
          >
            <FaSearch className="text-white text-sm md:text-base" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        ref={productsRef}
        initial={{ opacity: 0 }}
        animate={productsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-8 md:py-12 px-4 md:px-10 lg:px-20 bg-[#FEEBD5]"
      >
        <div className="flex justify-between items-center flex-wrap gap-3">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={
              productsInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }
            }
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#E39712] font-semibold mb-5 md:mb-10"
          >
            New Arrival
          </motion.h2>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={
              productsInView ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 border border-black rounded-full flex items-center gap-2 text-black cursor-pointer text-sm md:text-base"
          >
            View All <FaArrowRight />
          </motion.div>
        </div>

        <NavLink to={"/products-details"}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={productsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </motion.div>
        </NavLink>
      </motion.div>

      <motion.div
        ref={tattoosRef}
        initial="hidden"
        animate={tattoosInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="flex flex-col justify-center items-center gap-5 md:gap-10 bg-[#E39712] py-6 md:py-10 px-4"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-xl sm:text-2xl md:text-3xl text-[#1A1D3B] tracking-[1.5px] md:tracking-[2.5px] font-bold text-center"
        >
          TATTOOS YOU WOULD LIKE TO HAVE!
        </motion.h1>
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 max-w-6xl mx-auto"
        >
          {Tattoos.map((url, index) => (
            <motion.img
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              alt={`${url}+${index}`}
              src={url}
              className="w-full rounded-lg shadow-md"
            />
          ))}
        </motion.div>
      </motion.div>

      <FAQ />
    </div>
  );
};

export default Shop;
