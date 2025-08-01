import { motion } from "framer-motion";
import { RiArrowRightUpLine } from "react-icons/ri";

const CreateBlogBottom = () => {
  return (
    <motion.div
      className="mt-10 md:flex hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.img
        src="assets/planets/blogplanet.jpg"
        alt="blogplanet.jpg"
        className="md:w-80 px-3 w-full h-96 md:px-0"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="px-3 md:px-0 md:pl-5 space-y-2"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p className="text-[#6941C6] font-medium text-sm mt-3 md:mt-0">
          Olivia Rhye • 1 Jan 2023
        </p>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            The Planets Can Tell You More!
          </h1>
          <RiArrowRightUpLine className="text-2xl" />
        </div>
        <p className="w-full text-gray-500">
          A grid system is a design tool used to arrange content on a webpage.
          It is a series of vertical and horizontal lines that create a matrix
          of intersecting points, which can be used to align and organize page
          elements. Grid systems are used to create a consistent look and feel
          across a website, and can help to make the layout more visually
          appealing and easier to navigate.
        </p>
        <div className="flex gap-5 ml-5">
          <p className="bg-[#F9F5FF] text-[#6941C6] rounded p-1 text-sm font-medium">
            Planets
          </p>
          <p className="bg-[#FDF2FA] text-[#C11574] rounded p-1 text-sm font-medium">
            Life path
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateBlogBottom;
