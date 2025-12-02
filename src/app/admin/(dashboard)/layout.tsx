import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { IAuthService } from "@/core/services/interfaces";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resolve AuthService from DI container to support mocking
  const authService = container.get<IAuthService>(TYPES.AuthService);
  const session = await authService.getCurrentSession();

  // Check if user is admin
  // Note: In mock mode, this will always return true if MockAuthService returns an admin
  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <AdminHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/40">
          {children}
        </main>
      </div>
    </div>
  );
}
