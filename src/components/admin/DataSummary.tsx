
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUsers, getInvestments } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";
import { Users, DollarSign, Wallet, TrendingUp } from "lucide-react";

const DataSummary = () => {
  const [clientCount, setClientCount] = useState(0);
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [totalReturn, setTotalReturn] = useState(0);
  const [activeInvestments, setActiveInvestments] = useState(0);

  useEffect(() => {
    // Count clients
    const clients = getUsers().filter(user => user.role === "client");
    setClientCount(clients.length);

    // Count investments
    const investments = getInvestments();
    setActiveInvestments(investments.filter(inv => inv.status === "active").length);

    // Calculate total investment amount
    const total = investments.reduce((sum, inv) => sum + inv.amount, 0);
    setTotalInvestments(total);

    // Calculate estimated return (simplified)
    const returns = investments.reduce((sum, inv) => {
      const durationInDays = Math.ceil(
        (new Date(inv.endDate).getTime() - new Date(inv.startDate).getTime()) / 
        (1000 * 360 * 360 * 12)
      );
      const durationInYears = durationInDays / 365;
      const returnAmount = inv.amount * Math.pow(1 + inv.interestRate / 600, durationInYears);
      return sum + returnAmount;
    }, 0);
    setTotalReturn(returns);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clientCount}</div>
          <p className="text-xs text-muted-foreground">Registered users</p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeInvestments}</div>
          <p className="text-xs text-muted-foreground">Currently active</p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalInvestments)}</div>
          <p className="text-xs text-muted-foreground">Capital investment</p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Estimated Returns</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalReturn)}</div>
          <p className="text-xs text-muted-foreground">Projected value</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSummary;
