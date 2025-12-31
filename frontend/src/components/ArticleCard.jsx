import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ExternalLink, Sparkles, BookOpen } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function ArticleCard({ article, index, onView }) {
  const hasEnhanced = !!article?.enhancedVersion;
  const referenceCount = article?.references?.length || 0;

  // Get first 120 chars of content as preview
  const preview = article?.content?.slice(0, 120).trim() + "..." || "No content available";

  return (
    <article
      className="article-card group cursor-pointer animate-stagger"
      style={{ animationDelay: `${index * 0.08}s` }}
      onClick={() => onView && onView(article)}
    >
      <div className="flex flex-col gap-5 h-full">
        {/* Top Row - Icon & Badges */}
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-primary/30 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <BookOpen className="h-7 w-7 text-primary transition-colors group-hover:text-accent" />
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {hasEnhanced && (
              <span className="badge-enhanced text-[10px] py-1 px-2.5">
                <Sparkles className="mr-1 h-3 w-3" />
                AI
              </span>
            )}
            {referenceCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-highlight/10 border border-highlight/20 px-2.5 py-1 text-[10px] font-bold text-highlight uppercase tracking-wider">
                <ExternalLink className="h-3 w-3" />
                {referenceCount}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="font-display text-xl font-bold leading-tight text-foreground transition-all duration-300 group-hover:text-gradient line-clamp-2">
          {article?.title || "Untitled Article"}
        </h2>

        {/* Preview */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 flex-grow">
          {preview}
        </p>

        {/* Bottom Row - Meta & CTA */}
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-border/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {article?.createdAt ? formatDistanceToNow(new Date(article.createdAt), {
                addSuffix: true,
              }) : "Unknown date"}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all duration-300 group-hover:gap-3 group-hover:text-accent">
            <span>Read</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-accent/20">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
