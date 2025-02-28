import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="border-t border-border/40 bg-secondary/30 backdrop-blur-sm py-8 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                B
              </div>
              <span className="font-semibold text-lg">Clube de Investimento</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">Uma plataforma de investimento segura para nossos clientes.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} BankApp. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-4 sm:mt-0">
            Secure Banking & Investment Platform
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;