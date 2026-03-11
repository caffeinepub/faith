import { Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  const quickLinks = [
    { label: "Browse Jobs", href: "#jobs" },
    { label: "Post a Job", href: "#post" },
    { label: "About FAITH", href: "#about" },
    { label: "Success Stories", href: "#stories" },
  ];

  return (
    <footer
      className="relative py-16 px-4 border-t border-border/30 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, transparent, oklch(0.08 0.02 265))",
      }}
    >
      {/* Decorative */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.82 0.16 78))",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-display font-black mb-3 gold-text">
              FAITH
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A platform dedicated to connecting orphans and semi-orphan
              students with dignified employment opportunities across Kenya.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-heading uppercase tracking-widest text-muted-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-heading uppercase tracking-widest text-muted-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                📧 support@faith.co.ke
              </li>
              <li className="text-sm text-muted-foreground">
                📞 +254 800 FAITH (32484)
              </li>
              <li className="text-sm text-muted-foreground">
                📍 Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} FAITH. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Built with <Heart className="w-3 h-3 inline text-red-400" /> using
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
