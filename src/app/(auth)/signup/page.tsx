import { AuthLayout } from "@/components/layout/auth-layout";
import { SignUpForm } from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter your details to create your account"
    >
      <SignUpForm />
    </AuthLayout>
  );
} 