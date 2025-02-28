import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { registerUser } from "@/lib/auth";
import { Eye, EyeOff, Lock, Mail, User, Phone, DollarSign } from "lucide-react";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    intendedInvestment: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      const user = registerUser({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        intendedInvestment: parseFloat(formData.intendedInvestment) || 0,
        password: formData.password
      });
      if (user) {
        navigate("/login");
      }
    } catch (err) {
      setError("An error occurred during registration");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return <Card className="w-full max-w-md mx-auto glass-panel animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Crie sua Conta</CardTitle>
        <CardDescription className="text-center">Insira suas informações</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="fullName" name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} className="pl-10" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="email" name="email" type="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} className="pl-10" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="phone" name="phone" placeholder="(00) 00000-0000" value={formData.phone} onChange={handleChange} className="pl-10" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="intendedInvestment">Intended Investment (R$)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="intendedInvestment" name="intendedInvestment" type="number" placeholder="1000.00" value={formData.intendedInvestment} onChange={handleChange} className="pl-10" required min="0" step="0.01" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={handleChange} className="pl-10" required minLength={6} />
              <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-10 w-10" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} className="pl-10" required minLength={6} />
            </div>
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground text-center w-full">
          Already have an account?{" "}
          <Button variant="link" className="h-auto p-0" onClick={() => navigate("/login")}>
            Sign in
          </Button>
        </div>
      </CardFooter>
    </Card>;
};
export default RegisterForm;