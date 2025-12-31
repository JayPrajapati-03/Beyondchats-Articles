import { ExternalLink, Sparkles, FileText, ArrowUpRight, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ArticleContent({ article }) {
    const hasEnhanced = !!article.enhancedVersion;

    return (
        <div className="space-y-12">
            <Tabs defaultValue={hasEnhanced ? "enhanced" : "original"} className="w-full">
                <TabsList className="grid w-full max-w-lg grid-cols-2 rounded-2xl bg-card/50 border border-border/50 p-1.5 backdrop-blur-sm">
                    <TabsTrigger
                        value="original"
                        className="flex items-center gap-2 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-300 font-semibold"
                    >
                        <FileText className="h-4 w-4" />
                        <span>Original</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="enhanced"
                        disabled={!hasEnhanced}
                        className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 font-semibold"
                    >
                        <Sparkles className="h-4 w-4" />
                        <span>AI Enhanced</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="original" className="mt-10 animate-fade-in">
                    <div className="article-card">
                        <div className="mb-8 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted border border-border">
                                <FileText className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                                <span className="badge-original">Original Article</span>
                                <p className="mt-1 text-xs text-muted-foreground">Scraped from BeyondChats</p>
                            </div>
                        </div>
                        <div className="prose-article whitespace-pre-wrap">
                            {article.content}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="enhanced" className="mt-10 animate-fade-in">
                    {hasEnhanced ? (
                        <div className="relative article-card overflow-hidden">
                            {/* Gradient border effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-success/20 opacity-50" />
                            <div className="absolute inset-px rounded-2xl bg-background" />

                            <div className="relative">
                                <div className="mb-8 flex items-center gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-xl bg-success/30 blur-lg animate-pulse-soft" />
                                        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                                            <Sparkles className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="badge-enhanced">
                                            <Zap className="mr-1 h-3 w-3" />
                                            AI Enhanced
                                        </span>
                                        <p className="mt-1 text-xs text-muted-foreground">Improved by LLaMA 3</p>
                                    </div>
                                </div>
                                <div className="prose-article whitespace-pre-wrap">
                                    {article.enhancedVersion?.updatedContent}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="article-card text-center py-20">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted border border-border">
                                <Sparkles className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h4 className="text-xl font-bold text-foreground">Not Available Yet</h4>
                            <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
                                Run the AI enhancement script to generate an improved version of this article.
                            </p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* References Section */}
            {article.references.length > 0 && (
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-xl bg-highlight/30 blur-lg" />
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-highlight/10 border border-highlight/20">
                                <ExternalLink className="h-6 w-6 text-highlight" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-display text-xl font-bold text-foreground">
                                References
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Sources used for AI enhancement
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {article.references.map((ref, index) => (
                            <a
                                key={ref._id}
                                href={ref.referenceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="reference-card group flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-highlight/10 border border-highlight/20 text-lg font-bold text-highlight transition-all duration-300 group-hover:bg-highlight group-hover:text-white group-hover:scale-110">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm font-medium text-foreground/80 line-clamp-1 max-w-lg group-hover:text-foreground transition-colors">
                                        {ref.referenceUrl}
                                    </span>
                                </div>
                                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-highlight group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}