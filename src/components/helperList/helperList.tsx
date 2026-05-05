import { motion } from "framer-motion";
// import Discover from "../home/learnMore";
import useInView from "../../hooks/useInView";

const HelperList = ({
  data,
  label,
}: {
  data: { title: string; description: string }[];
  label: string;
}) => {
  const { ref, isInView } = useInView(0.3, false);

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-start items-start gap-2 md:gap-5 px-5 sm:px-10 lg:px-20  w-full bg-[url('/assets/background/section/stars_background.png')] bg-center overflow-hidden"
    >
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-montserrat font-semibold text-2xl sm:text-4xl tracking-[2.5px] "
      >
        {label}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed"
      >
        Everything you need to understand yourself, explore your potential, and
        make the right career choices.
      </motion.p>

      <div className="flex gap-10">
        <motion.img
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay:  0.2 }}
          className="rounded-lg"
          src="assets/about/bg.jpg"
          alt="help"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6  w-full">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group p-6 rounded-2xl bg-foreground/5 backdrop-blur-md border border-foreground/10 hover:scale-[1.02] transition"
            >
              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10"
      >
        {/* <Discover label="LEARN MORE" /> */}
      </motion.div>
    </section>
  );
};

export default HelperList;
