import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";

export const Route = createFileRoute("/admin/staff")({
  component: StaffPage,
  head: () => ({
    meta: [{ title: "Staff Management — Planning CMS" }],
  }),
});

function StaffPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-white/50 text-xs tracking-[0.2em] uppercase">
        <Users size={14} />
        <span>CONTENT MANAGEMENT SYSTEM</span>
      </div>
      <h1 className="text-3xl font-extralight text-white">Staff Management</h1>
      
      <div className="pk-glass-pop p-8 rounded-2xl border border-white/10 shadow-lg text-center space-y-4">
        <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center mx-auto text-white/60">
          <Users size={22} />
        </div>
        <h3 className="text-lg font-light text-white">Staff Manager Coming in Phase 2</h3>
        <p className="text-white/55 font-light text-sm max-w-md mx-auto leading-relaxed">
          This panel will manage the active roster of architects and designers, including input fields for names, roles, biographic summaries, and profile picture uploads.
        </p>
      </div>
    </div>
  );
}
