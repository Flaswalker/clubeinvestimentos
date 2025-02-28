
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import LoginForm from "@/components/auth/LoginForm";
import { getCurrentSession } from "@/lib/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      // Redirect logged in users
      navigate(session.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [navigate]);

  return (
    <PageLayout className="bg-gradient-to-b from-white to-secondary/30 py-16 md:py-24">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Secure Access
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-lg max-w-[600px]">
              Sign in to access your investment dashboard and monitor your portfolio.
            </p>
          </div>
          <div className="mx-auto w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
