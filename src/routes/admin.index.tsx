import React, { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { 
  Briefcase, 
  Users, 
  BookOpen, 
  Plus, 
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/components/admin/AuthContext";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
  head: () => ({
    meta: [{ title: "Dashboard — Planning CMS" }],
  }),
});

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  loading: boolean;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, loading, colorClass }) => (
  <div className="pk-glass-pop p-6 rounded-2xl border border-white/10 flex items-center justify-between shadow-lg">
    <div className="space-y-2">
      <p className="text-white/40 text-xs tracking-wider uppercase font-light">{title}</p>
      {loading ? (
        <div className="h-8 w-12 bg-white/10 animate-pulse rounded-lg" />
      ) : (
        <p className="text-3xl font-extralight text-white">{value}</p>
      )}
    </div>
    <div className={`h-12 w-12 rounded-xl flex items-center justify-center border border-white/15 bg-white/5 ${colorClass}`}>
      {icon}
    </div>
  </div>
);

function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ projects: 0, staff: 0, adventures: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        
        // Parallel counts fetching
        const [projectsRes, staffRes, adventuresRes] = await Promise.all([
          supabase.from("projects").select("*", { count: "exact", head: true }),
          supabase.from("staff").select("*", { count: "exact", head: true }),
          supabase.from("adventures").select("*", { count: "exact", head: true }),
        ]);

        setStats({
          projects: projectsRes.count || 0,
          staff: staffRes.count || 0,
          adventures: adventuresRes.count || 0,
        });
      } catch (err) {
        console.error("Error fetching statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const timeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-10">
      {/* Welcome Heading */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white/50 text-xs tracking-[0.2em] uppercase">
          <TrendingUp size={14} />
          <span>WORKSPACE OVERVIEW</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extralight text-white leading-tight">
          {timeGreeting()}, <span className="font-semibold text-white/95">{user?.email?.split("@")[0]}</span>
        </h1>
        <p className="text-white/60 font-light max-w-xl text-sm md:text-base leading-relaxed">
          Welcome to the Planning Kenya Content Management System. Use the quick cards or sidebar to manage your portfolio, roster, and adventures feed.
        </p>
      </div>

      {/* Statistics Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Active Projects"
          value={stats.projects}
          loading={loading}
          icon={<Briefcase size={20} className="text-white/80" />}
          colorClass="shadow-[0_0_15px_-3px_rgba(255,255,255,0.05)]"
        />
        <StatCard
          title="Roster Size"
          value={stats.staff}
          loading={loading}
          icon={<Users size={20} className="text-white/80" />}
          colorClass="shadow-[0_0_15px_-3px_rgba(255,255,255,0.05)]"
        />
        <StatCard
          title="News Articles"
          value={stats.adventures}
          loading={loading}
          icon={<BookOpen size={20} className="text-white/80" />}
          colorClass="shadow-[0_0_15px_-3px_rgba(255,255,255,0.05)]"
        />
      </div>

      {/* Quick Action Workspace Panels */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Actions panel */}
        <div className="pk-glass-pop p-8 rounded-2xl border border-white/10 shadow-xl space-y-6">
          <div>
            <h3 className="text-lg font-light text-white mb-1">Quick CMS Operations</h3>
            <p className="text-white/40 text-xs font-light">Frequently used administrative actions</p>
          </div>

          <div className="grid gap-3.5">
            <Link
              to="/admin/projects"
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/15 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center text-white/80 group-hover:scale-105 transition-transform">
                  <Plus size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-normal text-white group-hover:text-white/90">Add New Project</h4>
                  <p className="text-white/40 text-xs font-light">Input details and upload images</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/35 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              to="/admin/staff"
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/15 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center text-white/80 group-hover:scale-105 transition-transform">
                  <Plus size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-normal text-white group-hover:text-white/90">Add Staff Roster Member</h4>
                  <p className="text-white/40 text-xs font-light">Input roles, bios, and profile photos</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/35 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              to="/admin/adventures"
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/15 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center text-white/80 group-hover:scale-105 transition-transform">
                  <Plus size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-normal text-white group-hover:text-white/90">Draft News Article</h4>
                  <p className="text-white/40 text-xs font-light">Write structured studio blog posts</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/35 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        {/* Informative tips panel */}
        <div className="pk-glass-pop p-8 rounded-2xl border border-white/10 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-light text-white mb-1">System Health & Guidance</h3>
              <p className="text-white/40 text-xs font-light">Developer suggestions for successful content management</p>
            </div>
            <div className="space-y-3.5 text-sm font-light text-white/70 leading-relaxed">
              <p>
                💡 **Image Guidelines**: For premium rendering on the public site, ensure project cover photos and gallery items are high resolution (1920x1080px or higher recommended) and optimized for rapid web loading.
              </p>
              <p>
                🔒 **Database Security**: Timestamps, sort orders, and relationships are automatically managed by Supabase triggers. Deleted items are permanently purged.
              </p>
              <p>
                🚀 **Caching & Vercel**: Any changes made via this CMS will update your Supabase backend instantly. Re-drafted pages on Vercel will pick up updates automatically!
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-white/30 tracking-[0.25em] uppercase font-normal">PLANNING SYSTEMS SERVICES LTD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
