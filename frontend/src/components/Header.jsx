import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="py-6 border-b border-white/10 sticky top-0 bg-background/80 backdrop-blur-md z-50"
    >
      <div className="w-full px-4 lg:px-6 flex flex-col items-start">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-white">Beyond</span>
          <span className="text-gradient">Chats</span>
          <span className="ml-2 text-white">AI Articles</span>
        </h1>
        <p className="text-gray-400 mt-1.5 text-sm font-medium tracking-wide uppercase">
          Original vs AI-Enhanced Content Comparison
        </p>
      </div>
    </motion.header>
  );
}
