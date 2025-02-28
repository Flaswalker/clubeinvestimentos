
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate, getPercentComplete } from "@/lib/utils";
import { Investment } from "@/lib/auth";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, DollarSign, TrendingUp } from "lucide-react";

interface InvestmentCardProps {
  investment: Investment;
}

const InvestmentCard = ({ investment }: InvestmentCardProps) => {
  const percentComplete = getPercentComplete(investment.startDate, investment.endDate);
  
  return (
    <Card className="overflow-hidden elegant-hover glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Investment</span>
          <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
            {investment.status}
          </span>
        </CardTitle>
        <CardDescription>Created on {formatDate(investment.createdAt)}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="font-semibold">{formatCurrency(investment.amount)}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Interest Rate</p>
              <p className="font-semibold">{investment.interestRate}% per year</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-2 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Period</p>
              <p className="font-semibold">
                {formatDate(investment.startDate)} - {formatDate(investment.endDate)}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{percentComplete}%</span>
            </div>
            <Progress value={percentComplete} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="w-full rounded-md bg-secondary/50 p-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Estimated Return</span>
            <span className="font-bold text-primary">
              {formatCurrency(investment.amount * (1 + investment.interestRate / 100))}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InvestmentCard;
