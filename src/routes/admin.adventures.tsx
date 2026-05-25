import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  UploadCloud,
  FileText,
  Calendar,
  MapPin,
  Eye,
  CheckCircle,
  FileEdit
} from "lucide-react";
import { adventures as initialAdventures, Adventure } from "@/data/adventures";

export const Route = createFileRoute("/admin/adventures")({
  component: AdventuresPage,
  head: () => ({
    meta: [{ title: "Adventures CMS — Planning Admin" }],
  }),
});

function AdventuresPage() {
  const [adventures, setAdventures] = useState<Adventure[]>(initialAdventures);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Partial<Adventure>>({});
  const [simulatedCover, setSimulatedCover] = useState("");

  const filteredAdventures = adventures.filter(a => {
    return a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           a.location.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const openForm = (article?: Adventure) => {
    if (article) {
      setCurrentArticle(article);
      setSimulatedCover(article.cover);
    } else {
      setCurrentArticle({
        slug: "",
        title: "",
        date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        location: "Nairobi",
        excerpt: "",
        cover: "",
        body: [],
        gallery: []
      });
      setSimulatedCover("");
    }
    setIsEditing(true);
    setIsPreviewMode(false);
  };

  const closeForm = () => {
    setIsEditing(false);
    setCurrentArticle({});
  };

  const triggerCoverSimulation = () => {
    const covers = [
      "/assets/project-tower.jpg",
      "/assets/project-villa.jpg",
      "/assets/project-urban.jpg",
      "/assets/project-interior.jpg"
    ];
    const randomCover = covers[Math.floor(Math.random() * covers.length)];
    setSimulatedCover(randomCover);
  };

  const saveArticle = (e: React.FormEvent) => {
    e.preventDefault();

    const bodyParagraphs = typeof currentArticle.body === "string" 
      ? (currentArticle.body as string).split("\n\n").filter(p => p.trim() !== "")
      : currentArticle.body || [];

    const formattedArticle: Adventure = {
      slug: currentArticle.slug || currentArticle.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "new-article",
      title: currentArticle.title || "Untitled Article",
      date: currentArticle.date || "September 2024",
      location: currentArticle.location || "Nairobi",
      excerpt: currentArticle.excerpt || "Article preview text...",
      cover: simulatedCover || "/assets/project-urban.jpg",
      body: bodyParagraphs,
      gallery: currentArticle.gallery || [{ src: simulatedCover || "/assets/project-urban.jpg", caption: currentArticle.title || "" }]
    };

    const exists = adventures.some(a => a.slug === formattedArticle.slug);

    if (exists) {
      setAdventures(prev => prev.map(a => a.slug === formattedArticle.slug ? formattedArticle : a));
    } else {
      setAdventures(prev => [formattedArticle, ...prev]);
    }

    closeForm();
  };

  const deleteArticle = (slug: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setAdventures(prev => prev.filter(a => a.slug !== slug));
    }
  };

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-white/50 text-[10px] tracking-[0.25em] uppercase">
            <BookOpen size={12} />
            <span>STUDIO NEWS FEED</span>
          </div>
          <h1 className="text-3xl font-extralight text-white tracking-tight">Adventures Management</h1>
        </div>

        <button
          onClick={() => openForm()}
          className="self-start sm:self-auto flex items-center justify-center gap-2 bg-white text-black font-medium text-sm px-5 py-3 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all cursor-pointer shadow-lg"
        >
          <Plus size={16} />
          <span>Draft New Article</span>
        </button>
      </div>

      {/* Control Search Panel */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles by title, event, or location..."
          className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm"
        />
      </div>

      {/* Articles List Workspace */}
      <div className="grid gap-6">
        {filteredAdventures.map(article => (
          <div 
            key={article.slug} 
            className="pk-glass-pop overflow-hidden rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row gap-6 items-start group shadow-md"
          >
            {/* Banner preview thumbnail */}
            <div className="relative w-full md:w-56 aspect-[16/10] bg-white/5 overflow-hidden rounded-xl shrink-0">
              <img 
                src={article.cover} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" 
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between h-full gap-4 w-full">
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-white/45 text-[10px] tracking-wider uppercase">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={11} />
                    {article.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/5 px-2 py-0.5 rounded border border-emerald-400/10">
                    <CheckCircle size={10} />
                    Published
                  </span>
                </div>

                <h3 className="text-xl font-light text-white leading-snug group-hover:text-white/95 transition-colors">
                  {article.title}
                </h3>

                <p className="text-white/60 font-light text-sm line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              {/* Roster actions */}
              <div className="flex gap-2 pt-2 border-t border-hairline max-w-xs">
                <button
                  onClick={() => openForm(article)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/15 text-white/80 hover:text-white text-xs tracking-wider uppercase rounded-lg transition-all cursor-pointer"
                >
                  <Edit3 size={13} />
                  <span>Edit Draft</span>
                </button>
                <button
                  onClick={() => deleteArticle(article.slug)}
                  className="flex items-center justify-center h-8.5 w-8.5 rounded-lg border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-300 hover:text-red-200 transition-all cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Adventures Draft Modal Form */}
      {isEditing && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          {/* Overlay */}
          <div 
            onClick={closeForm}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Form Workspace Slideout */}
          <div className="relative w-full max-w-3xl bg-background border-l border-hairline h-full flex flex-col justify-between z-10 animate-pk-backdrop-in">
            {/* Header */}
            <div className="p-6 border-b border-hairline flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.25em] text-white/50 uppercase font-light">CMS FORM EDITOR</span>
                <h2 className="text-xl font-light text-white">
                  {currentArticle.slug ? "Modify Article Draft" : "Draft New Studio Article"}
                </h2>
              </div>
              <button 
                onClick={closeForm}
                className="p-2 rounded-lg bg-white/5 border border-hairline text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Toggle Tabs: Edit vs Preview */}
            <div className="flex px-6 pt-4 gap-2 border-b border-hairline shrink-0">
              <button
                type="button"
                onClick={() => setIsPreviewMode(false)}
                className={`pb-3 px-4 text-xs font-medium tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                  !isPreviewMode 
                    ? "border-white text-white" 
                    : "border-transparent text-white/45 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <FileEdit size={13} />
                  Drafting Editor
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIsPreviewMode(true)}
                className={`pb-3 px-4 text-xs font-medium tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                  isPreviewMode 
                    ? "border-white text-white" 
                    : "border-transparent text-white/45 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Eye size={13} />
                  Live Preview
                </span>
              </button>
            </div>

            {/* Scrollable Form Body */}
            {isPreviewMode ? (
              // Live Preview Layout matching public story pages
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-white bg-black/10 select-none">
                <p className="text-[10px] tracking-[0.25em] text-white/45 uppercase">
                  {currentArticle.date || "September 2024"} · {currentArticle.location || "Nairobi"}
                </p>
                <h1 className="text-3xl font-thin leading-tight">{currentArticle.title || "Untitled Draft"}</h1>
                <p className="text-white/80 font-normal italic text-sm border-l border-white/20 pl-4">
                  {currentArticle.excerpt || "Excerpt description draft..."}
                </p>
                {simulatedCover && (
                  <img src={simulatedCover} alt="" className="w-full aspect-[16/10] object-cover rounded-xl border border-white/10" />
                )}
                <div className="space-y-4 text-white/70 font-light text-sm leading-relaxed">
                  {typeof currentArticle.body === "string" ? (
                    (currentArticle.body as string).split("\n\n").map((p, i) => <p key={i}>{p}</p>)
                  ) : (
                    currentArticle.body?.map((p, i) => <p key={i}>{p}</p>) || <p>Article body drafting...</p>
                  )}
                </div>
              </div>
            ) : (
              // Editing Mode Form
              <form id="article-form" onSubmit={saveArticle} className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    value={currentArticle.title || ""}
                    onChange={(e) => setCurrentArticle(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Woodlife Sweden Study Tour"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Publish Date */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                      Publish Date
                    </label>
                    <input
                      type="text"
                      required
                      value={currentArticle.date || ""}
                      onChange={(e) => setCurrentArticle(prev => ({ ...prev, date: e.target.value }))}
                      placeholder="e.g. September 2024"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm"
                    />
                  </div>

                  {/* Location context */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                      Event Location
                    </label>
                    <input
                      type="text"
                      required
                      value={currentArticle.location || ""}
                      onChange={(e) => setCurrentArticle(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g. Stockholm, Sweden"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                    Excerpt Description / Intro
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={currentArticle.excerpt || ""}
                    onChange={(e) => setCurrentArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Short introduction for article listing cards..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm resize-none"
                  />
                </div>

                {/* Cover Image simulated zone */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                      Cover Hero Image
                    </label>
                  </div>
                  <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="h-20 w-32 rounded-xl bg-black/20 border border-white/15 overflow-hidden shrink-0 relative flex items-center justify-center">
                      {simulatedCover ? (
                        <img src={simulatedCover} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <FileText size={24} className="text-white/20 animate-pulse" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-normal text-white">Draft cover image</h4>
                      <button
                        type="button"
                        onClick={triggerCoverSimulation}
                        className="flex items-center justify-center gap-2 py-2 px-3 border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs tracking-wider uppercase rounded-lg transition-all cursor-pointer shadow-sm"
                      >
                        <UploadCloud size={14} />
                        <span>Upload Image</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Body paragraphs text editor */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                    Article Draft Body (Use double-enter to separate paragraphs)
                  </label>
                  <textarea
                    required
                    rows={8}
                    value={
                      Array.isArray(currentArticle.body) 
                        ? (currentArticle.body as string[]).join("\n\n") 
                        : currentArticle.body || ""
                    }
                    onChange={(e) => setCurrentArticle(prev => ({ ...prev, body: e.target.value as any }))}
                    placeholder="Draft article body. Use a blank line (double return) to create new paragraphs..."
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm font-sans leading-relaxed resize-none"
                  />
                </div>
              </form>
            )}

            {/* Footer */}
            <div className="p-6 border-t border-hairline bg-black/10 flex gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="flex-1 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/15 text-white text-sm font-light tracking-wide rounded-xl transition-all cursor-pointer"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                form="article-form"
                disabled={isPreviewMode}
                className="flex-1 py-3 bg-white text-black hover:bg-white/90 disabled:opacity-40 disabled:hover:bg-white font-medium text-sm tracking-wide rounded-xl transition-all cursor-pointer shadow-md"
              >
                Save Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
