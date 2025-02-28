
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserType } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";
import { User, Mail, Phone, DollarSign } from "lucide-react";

interface ProfileCardProps {
  user: UserType;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Your personal and account details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-[24px_1fr] gap-3 items-center">
          <User className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Full Name</p>
            <p className="text-sm text-muted-foreground">{user.fullName}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-[24px_1fr] gap-3 items-center">
          <Mail className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-[24px_1fr] gap-3 items-center">
          <Phone className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Phone</p>
            <p className="text-sm text-muted-foreground">{user.phone}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-[24px_1fr] gap-3 items-center">
          <DollarSign className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Intended Investment</p>
            <p className="text-sm text-muted-foreground">{formatCurrency(user.intendedInvestment)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
