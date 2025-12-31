import { motion } from "framer-motion";

export default function Background({ children }) {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white"
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ backgroundSize: "200% 200%" }}
    >
      {children}
    </motion.div>
  );
}
