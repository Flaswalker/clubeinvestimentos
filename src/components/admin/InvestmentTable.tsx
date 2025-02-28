
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Investment,
  getInvestments,
  getUsers,
  deleteInvestment,
  User,
} from "@/lib/auth";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import InvestmentForm from "./InvestmentForm";

const InvestmentTable = () => {
  const [investments, setInvestments] = useState<Investment[]>(getInvestments());
  const [users] = useState<User[]>(getUsers());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const getUserName = (userId: string): string => {
    const user = users.find((u) => u.id === userId);
    return user ? user.fullName : "Unknown";
  };

  const handleDelete = (id: string) => {
    if (deleteInvestment(id)) {
      setInvestments(getInvestments());
    }
    setDeleteDialogOpen(false);
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "";
    }
  };

  const openEditDialog = (investment: Investment) => {
    setSelectedInvestment(investment);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (investment: Investment) => {
    setSelectedInvestment(investment);
    setDeleteDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedInvestment(null);
    setEditDialogOpen(false);
    setInvestments(getInvestments());
  };

  return (
    <>
      <div className="rounded-md border animate-fade-in">
        <Table>
          <TableCaption>A list of all investments</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Interest Rate</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No investments found
                </TableCell>
              </TableRow>
            ) : (
              investments.map((investment) => (
                <TableRow key={investment.id} className="transition-colors hover:bg-secondary/40">
                  <TableCell>{getUserName(investment.userId)}</TableCell>
                  <TableCell>{formatCurrency(investment.amount)}</TableCell>
                  <TableCell>{investment.interestRate}%</TableCell>
                  <TableCell>{formatDate(investment.startDate)}</TableCell>
                  <TableCell>{formatDate(investment.endDate)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getBadgeColor(investment.status)}
                    >
                      {investment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(investment)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(investment)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              investment record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedInvestment && handleDelete(selectedInvestment.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <InvestmentForm
        open={editDialogOpen}
        onOpenChange={handleEditClose}
        investmentData={selectedInvestment || undefined}
      />
    </>
  );
};

export default InvestmentTable;
