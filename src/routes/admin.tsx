import { createFileRoute, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "@/components/admin/AuthContext";
import { AdminLayout } from "@/components/admin/AdminLayout";
import React, { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminRouteWrapper,
});

function AdminRouteWrapper() {
  return (
    <AuthProvider>
      <AdminProtectionContainer />
    </AuthProvider>
  );
}

function AdminProtectionContainer() {
  const { user, loading } = useAuth();
  const routerState = useRouterState();
  const navigate = useNavigate();
  
  // Normalize the active route checking
  const currentPath = routerState.location.pathname.replace(/\/$/, "");
  const isLoginPage = currentPath === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      navigate({ to: "/admin/login", replace: true });
    } else if (!loading && user && isLoginPage) {
      navigate({ to: "/admin", replace: true });
    }
  }, [user, loading, isLoginPage, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b13] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-10 w-10 border-t-2 border-white/80 rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-[0.2em] text-white/50 animate-pulse">Initializing CMS Workspace...</p>
      </div>
    );
  }

  if (isLoginPage) {
    return <Outlet />;
  }

  if (!user) {
    return null; // Prevents flashing layout elements before the useEffect redirect triggers
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
