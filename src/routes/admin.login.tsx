import React, { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react";
import logo from "@/assets/planning-logo-white.png";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Sign In — Planning CMS" }],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Successful login will be captured by AuthContext state listener 
      // which automatically triggers layout routing redirect to /admin
      navigate({ to: "/admin" });
    } catch (err: any) {
      console.error("Login failure:", err);
      setErrorMsg(err.message || "Invalid credentials. Please verify your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-deep flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative premium radial mesh overlay */}
      <div className="absolute top-1/4 left-1/4 h-[40vw] w-[40vw] bg-white/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[35vw] w-[35vw] bg-white/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo Zone */}
        <div className="flex flex-col items-center gap-4 mb-8 text-center">
          <img src={logo} alt="Planning Kenya" className="h-10 w-auto object-contain" />
          <div>
            <h1 className="text-white font-extralight text-2xl tracking-[0.1em] mt-2">
              ADMIN <span className="font-semibold text-white/90">CMS</span>
            </h1>
            <p className="text-white/40 text-xs tracking-wider uppercase mt-1">INTERNAL ACCESS PORTAL</p>
          </div>
        </div>

        {/* Card Component */}
        <div className="pk-glass-pop p-8 rounded-2xl w-full border border-white/10 shadow-2xl relative">
          <div className="absolute top-0 right-8 -translate-y-1/2 p-2 rounded-xl bg-white/10 border border-white/20 text-white/80">
            <ShieldCheck size={20} />
          </div>

          <h2 className="text-xl font-light text-white mb-6">Workspace Sign In</h2>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/10 flex items-start gap-3 text-red-200 text-sm font-light">
              <AlertCircle className="shrink-0 text-red-400 mt-0.5" size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@planning-kenya.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/50 mb-2 font-normal flex items-center justify-between">
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs font-light mt-8">
          Confidential System. Unauthorized login attempts are logged and monitored.
        </p>
      </div>
    </div>
  );
}
