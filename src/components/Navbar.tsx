import { motion } from "framer-motion";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import SilerileLogo from "./SilerileLogo";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <SilerileLogo className="h-8 w-auto" />
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Home
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </a>
          <a href="#register" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Register
          </a>
          <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Contact Us
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
            Sign In
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90">
            Sign Up <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
