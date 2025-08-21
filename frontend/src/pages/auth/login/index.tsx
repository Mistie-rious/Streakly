import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout"
import LoginForm from "../login/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
      footer={
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-foreground hover:text-primary font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
