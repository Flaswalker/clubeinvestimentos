
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getCurrentUser, useAuthProtection } from "@/lib/auth";
import DataSummary from "@/components/admin/DataSummary";
import InvestmentTable from "@/components/admin/InvestmentTable";
import ClientsTable from "@/components/admin/ClientsTable";
import InvestmentForm from "@/components/admin/InvestmentForm";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const AdminPage = () => {
  const navigate = useNavigate();
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  
  // Check if user is logged in and is an admin
  const isAuthorized = useAuthProtection("admin");
  
  useEffect(() => {
    if (!isAuthorized) return;
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/login");
    }
  }, [isAuthorized, navigate]);
  
  return (
    <PageLayout className="bg-gradient-to-b from-white to-secondary/30 min-h-screen py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">
              Manage clients, investments, and monitor performance.
            </p>
          </div>
          <Button onClick={() => setShowInvestmentForm(true)} className="w-full md:w-auto elegant-hover">
            <Plus className="mr-2 h-4 w-4" />
            New Investment
          </Button>
        </div>
        
        <DataSummary />
        
        <Separator className="my-8" />
        
        <Tabs defaultValue="investments" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-2 animate-fade-in">
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
          </TabsList>
          
          <TabsContent value="investments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Investment Records</h2>
            </div>
            <InvestmentTable />
          </TabsContent>
          
          <TabsContent value="clients" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Client Database</h2>
            </div>
            <ClientsTable />
          </TabsContent>
        </Tabs>
        
        <InvestmentForm 
          open={showInvestmentForm} 
          onOpenChange={setShowInvestmentForm} 
        />
      </div>
    </PageLayout>
  );
};

export default AdminPage;
