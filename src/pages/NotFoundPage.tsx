
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout className="bg-gradient-to-b from-white to-secondary/30">
      <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 text-center animate-fade-in">
        <div className="space-y-6 max-w-md">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-6">
              <div className="text-6xl font-bold text-primary">404</div>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              className="elegant-hover shadow-md"
            >
              Return to home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="elegant-hover border border-primary/20"
            >
              Go back
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage;
