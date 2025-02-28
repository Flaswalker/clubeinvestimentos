
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  createInvestment,
  getUsers,
  User,
  Investment,
  updateInvestment,
} from "@/lib/auth";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InvestmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  investmentData?: Investment;
}

const InvestmentForm = ({ open, onOpenChange, investmentData }: InvestmentFormProps) => {
  const [users] = useState<User[]>(getUsers());
  const [formData, setFormData] = useState<{
    userId: string;
    amount: string;
    interestRate: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    status: "active" | "pending" | "completed";
  }>({
    userId: investmentData?.userId || "",
    amount: investmentData ? investmentData.amount.toString() : "",
    interestRate: investmentData ? investmentData.interestRate.toString() : "",
    startDate: investmentData ? new Date(investmentData.startDate) : undefined,
    endDate: investmentData ? new Date(investmentData.endDate) : undefined,
    status: investmentData?.status || "pending",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      !formData.userId ||
      !formData.amount ||
      !formData.interestRate ||
      !formData.startDate ||
      !formData.endDate
    ) {
      return;
    }

    const investmentPayload = {
      userId: formData.userId,
      amount: parseFloat(formData.amount),
      interestRate: parseFloat(formData.interestRate),
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
      status: formData.status,
    };

    if (investmentData) {
      // Update existing investment
      updateInvestment(investmentData.id, investmentPayload);
    } else {
      // Create new investment
      createInvestment(investmentPayload);
    }

    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{investmentData ? "Edit Investment" : "Create Investment"}</SheetTitle>
          <SheetDescription>
            {investmentData 
              ? "Update the investment details for this client."
              : "Create a new investment for a client."}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">Client</Label>
            <Select
              value={formData.userId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, userId: value }))
              }
              disabled={!!investmentData}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (R$)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%/year)</Label>
            <Input
              id="interestRate"
              name="interestRate"
              type="number"
              step="0.01"
              min="0"
              value={formData.interestRate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? (
                      format(formData.startDate, "PP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) =>
                      setFormData((prev) => ({ ...prev, startDate: date }))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? (
                      format(formData.endDate, "PP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) =>
                      setFormData((prev) => ({ ...prev, endDate: date }))
                    }
                    disabled={(date) =>
                      formData.startDate
                        ? date < formData.startDate
                        : false
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "pending" | "completed") =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button onClick={handleSubmit}>
            {investmentData ? "Update" : "Create"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default InvestmentForm;
