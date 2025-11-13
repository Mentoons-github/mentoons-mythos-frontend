import { motion } from "framer-motion";
import { useState } from "react";
import CareeGpsForm from "../components/modal/CareeGpsForm";

const CareerGPS = () => {
  const [viewModal, setViewModal] = useState(false);
  return (
    <div className="relative w-full h-screen">
      <img
        src="assets/careerGps/gpsBg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute z-10 flex flex-col -top-16 justify-center items-center w-full h-full">
        <img
          src="assets/careerGps/Logo.png"
          alt=""
          className="w-full md:w-[180vh] "
        />

        <motion.img
          src="assets/careerGps/cta button.png"
          alt="CTA Button"
          className="xl:absolute bottom-10 mx-auto z-20 w-48 md:w-60 cursor-pointer"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.2,
            rotate: 2,
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setViewModal(true)}
        />
      </div>
      {viewModal && <CareeGpsForm onClose={() => setViewModal(false)} />}
    </div>
  );
};

export default CareerGPS;
