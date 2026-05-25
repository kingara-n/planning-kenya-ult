import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/admin/adventures")({
  component: AdventuresPage,
  head: () => ({
    meta: [{ title: "Adventures Management — Planning CMS" }],
  }),
});

function AdventuresPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-white/50 text-xs tracking-[0.2em] uppercase">
        <BookOpen size={14} />
        <span>CONTENT MANAGEMENT SYSTEM</span>
      </div>
      <h1 className="text-3xl font-extralight text-white">Adventures Management</h1>
      
      <div className="pk-glass-pop p-8 rounded-2xl border border-white/10 shadow-lg text-center space-y-4">
        <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center mx-auto text-white/60">
          <BookOpen size={22} />
        </div>
        <h3 className="text-lg font-light text-white">Adventures Editor Coming in Phase 2</h3>
        <p className="text-white/55 font-light text-sm max-w-md mx-auto leading-relaxed">
          This panel will facilitate drafting news, publications, and tour journals, complete with a rich-text / markdown drafting editor, slugs generation, and image gallery uploads.
        </p>
      </div>
    </div>
  );
}
