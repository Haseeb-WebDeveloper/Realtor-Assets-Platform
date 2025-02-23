import { AuthLayout } from "@/components/layout/auth-layout";
import { AdminLoginForm } from "@/components/admin/auth/admin-login-form";

export default function AdminLoginPage() {
  return (
    <AuthLayout
      title="Admin Login"
      subtitle="Enter your credentials to access the admin dashboard"
    >
      <AdminLoginForm />
    </AuthLayout>
  );
} 