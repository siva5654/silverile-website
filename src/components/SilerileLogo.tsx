import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import { useTheme } from "./ThemeProvider";

interface SilverileLogoProps {
  className?: string;
}

const SilerileLogo = ({ className = "h-8 w-auto" }: SilverileLogoProps) => {
  const { theme } = useTheme();
  // Light background → blue/dark logo; Dark background → silver/white logo
  const src = theme === "dark" ? logoLight : logoDark;

  return <img src={src} alt="Silverile" className={className} />;
};

export default SilerileLogo;
