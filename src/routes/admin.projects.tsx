import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";

export const Route = createFileRoute("/admin/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [{ title: "Projects Management — Planning CMS" }],
  }),
});

function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-white/50 text-xs tracking-[0.2em] uppercase">
        <Briefcase size={14} />
        <span>CONTENT MANAGEMENT SYSTEM</span>
      </div>
      <h1 className="text-3xl font-extralight text-white">Projects Management</h1>
      
      <div className="pk-glass-pop p-8 rounded-2xl border border-white/10 shadow-lg text-center space-y-4">
        <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center mx-auto text-white/60">
          <Briefcase size={22} />
        </div>
        <h3 className="text-lg font-light text-white">Project Manager Coming in Phase 2</h3>
        <p className="text-white/55 font-light text-sm max-w-md mx-auto leading-relaxed">
          This panel will contain the comprehensive list of architectural projects, with visual lists, forms to add/edit titles, locations, descriptions, and drag-and-drop cover image uploads.
        </p>
      </div>
    </div>
  );
}
