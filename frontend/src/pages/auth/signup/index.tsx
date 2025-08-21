import AuthLayout from "../components/AuthLayout";
import { SignUpForm } from "./components/SignUpForm";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us to start tracking your habits"
      footer={
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-foreground hover:text-primary font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <SignUpForm />
    </AuthLayout>
  );
}
