
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
import { User, getUsers } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";

const ClientsTable = () => {
  const [clients] = useState<User[]>(getUsers().filter(user => user.role === "client"));

  return (
    <div className="rounded-md border animate-fade-in">
      <Table>
        <TableCaption>A list of all registered clients</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Intended Investment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No clients found
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow key={client.id} className="transition-colors hover:bg-secondary/40">
                <TableCell className="font-medium">{client.fullName}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{formatCurrency(client.intendedInvestment)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientsTable;
