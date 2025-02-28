
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ProfileCard from "@/components/client/ProfileCard";
import InvestmentCard from "@/components/client/InvestmentCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, getUserInvestments, Investment, User, useAuthProtection } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  
  // Check if user is logged in and is a client
  const isAuthorized = useAuthProtection("client");
  
  useEffect(() => {
    if (!isAuthorized) return;
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "client") {
      navigate("/login");
      return;
    }
    
    setUser(currentUser);
    setInvestments(getUserInvestments(currentUser.id));
  }, [isAuthorized, navigate]);
  
  if (!user) return null;
  
  // Calculate total investment value
  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
  
  // Calculate total projected return (simplified)
  const totalReturn = investments.reduce((sum, inv) => {
    const durationInDays = Math.ceil(
      (new Date(inv.endDate).getTime() - new Date(inv.startDate).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    const durationInYears = durationInDays / 365;
    const returnAmount = inv.amount * Math.pow(1 + inv.interestRate / 100, durationInYears);
    return sum + returnAmount;
  }, 0);
  
  return (
    <PageLayout className="bg-gradient-to-b from-white to-secondary/30 min-h-screen py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Client Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.fullName}. Here's an overview of your investments.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6 mb-8">
          <Card className="md:col-span-2 glass-card animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle>Total Invested</CardTitle>
              <CardDescription>Your current investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(totalInvestment)}</div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 glass-card animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle>Projected Return</CardTitle>
              <CardDescription>Estimated final value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(totalReturn)}</div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 glass-card animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle>Investments</CardTitle>
              <CardDescription>Active investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{investments.length}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="md:col-span-1">
            <ProfileCard user={user} />
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Your Investments</h2>
            {investments.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="py-8">
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground">No investments found</p>
                    <p className="text-sm text-muted-foreground">
                      You don't have any active investments yet.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {investments.map((investment) => (
                  <InvestmentCard key={investment.id} investment={investment} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
