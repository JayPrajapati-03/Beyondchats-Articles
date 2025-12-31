import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ArticleModal({ article, aiVersion, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-[#0b0f1a] text-white max-w-6xl w-full rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-semibold">{article.title}</h2>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 transition"
          >
            Close ✕
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6 p-6 h-[80vh]">

          {/* Original Article */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col h-full">
            <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 w-fit">
              Original Article
            </span>

            <div className="text-sm text-gray-300 leading-relaxed overflow-y-auto pr-3 scroll-hint">
              {article.content}
            </div>
          </div>

          {/* AI Enhanced */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col h-full">
            <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-300 w-fit">
              AI Enhanced Version
            </span>

            <div className="text-sm text-gray-300 leading-relaxed overflow-y-auto pr-3 scroll-hint">
              {aiVersion?.updatedContent ? (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {aiVersion.updatedContent}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="italic text-gray-400">
                  AI version not generated yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
