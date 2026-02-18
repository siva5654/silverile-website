import SilerileLogo from "./SilerileLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkGroups = [
    {
      title: "Product",
      links: [
        { label: "Home", href: "#" },
        { label: "Pricing", href: "#pricing" },
        { label: "Contact Us", href: "#contact" },
      ],
    },
    {
      title: "Features",
      links: [
        { label: "StoryCraft-AI", href: "#" },
        { label: "Monty's Views", href: "#" },
        { label: "Virtual Huddle", href: "#" },
        { label: "Compendium", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <SilerileLogo className="h-8 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              (Ag)ile for All, Time gAIned.<br />
              Your AI-powered Co-Project Manager.
            </p>
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Silverile. All rights reserved.
          </p>
          <a
            href="https://www.silverile.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            www.silverile.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
