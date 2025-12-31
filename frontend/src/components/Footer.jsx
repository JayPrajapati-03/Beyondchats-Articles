import { motion } from "framer-motion";
import { Instagram, Youtube, Twitter, Linkedin, Github } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,      
    href: "https://www.instagram.com/i__am__jay__03?igsh=MTR3ZHo1d293ZmRteQ==",
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.6)]",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@jayprajapati9681?si=GMW2YoCj7Rvd-SP4",
    gradient: "from-red-600 via-red-500 to-rose-500",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.6)]",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://x.com/JayPrajapa70795",
    gradient: "from-sky-400 via-blue-500 to-cyan-400",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.6)]",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/jay-prajapati-57ab7b359",
    gradient: "from-blue-600 via-blue-500 to-sky-500",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.6)]",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/JayPrajapati-03",
    gradient: "from-gray-400 via-gray-300 to-white",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(156,163,175,0.6)]",
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 py-10 border-t border-white/10">
      <p className="text-center text-gray-400 mb-8 font-medium">
        Built for AI-Driven Content Evaluation & Knowledge Enhancement
      </p>

      <div className="flex justify-center gap-6">
        {socialLinks.map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative p-3 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 ${item.glow} hover:border-white/20`}
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <item.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
          </motion.a>
        ))}
      </div>
    </footer>
  );
}
