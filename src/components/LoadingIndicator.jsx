import { motion } from "framer-motion";

const LoadingIndicator = () => {
  return (
    <motion.div
      className="flex space-x-2 justify-center items-center mt-4"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
    >
      <motion.div
        className="w-3 h-3 bg-blue-600 dark:bg-amber-400 rounded-full"
        animate={{ y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0 }}
      />
      <motion.div
        className="w-3 h-3 bg-blue-600 dark:bg-amber-400 rounded-full"
        animate={{ y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.div
        className="w-3 h-3 bg-blue-600 dark:bg-amber-400 rounded-full"
        animate={{ y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.4 }}
      />
    </motion.div>
  );
};

export default LoadingIndicator;
