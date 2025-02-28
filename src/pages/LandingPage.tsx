import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { ChevronRight, Shield, Lock, BarChart3 } from "lucide-react";
const LandingPage = () => {
  const navigate = useNavigate();
  return <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-white to-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 animate-slide-up">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Investment Banking Platform
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center">Invista e ganhe</h1>
              <p className="text-muted-foreground text-lg max-w-[600px]">Uma plataforma bancária completa os clientes podem monitorar seu portfólio com segurança.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => navigate("/register")} className="elegant-hover shadow-md">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="elegant-hover border border-primary/20">
                  Login
                </Button>
              </div>
            </div>
            <div className="relative lg:ml-10 animate-float">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/20 to-primary/40 filter blur opacity-70"></div>
              <div className="relative glass-panel rounded-lg p-6 shadow-xl">
                <div className="space-y-4">
                  <div className="h-2 w-20 rounded-full bg-primary/30"></div>
                  <div className="h-12 rounded-lg bg-primary/10"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 rounded-lg bg-primary/5"></div>
                    <div className="h-24 rounded-lg bg-primary/5"></div>
                  </div>
                  <div className="h-12 rounded-lg bg-primary/10"></div>
                  <div className="h-12 rounded-lg bg-primary/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key Features</h2>
            <p className="text-muted-foreground text-lg max-w-[800px] mx-auto">Acesso Seguro</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg glass-card elegant-hover">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Acesso Seguro</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security with email authentication and secure login procedures.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg glass-card elegant-hover">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Protected Database</h3>
              <p className="text-muted-foreground">
                DDoS protection, SSL encryption, and strict access controls for administrators.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg glass-card elegant-hover">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Investment Management</h3>
              <p className="text-muted-foreground">
                Complete tools for administrators to manage client investments and track performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pronto para proteger seus investimentos?</h2>
              <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">Junte-se à nossa plataforma hoje mesmo e conheça o futuro do Clube de investimento.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate("/register")} className="elegant-hover shadow-md">
                Create an Account
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="elegant-hover">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>;
};
export default LandingPage;