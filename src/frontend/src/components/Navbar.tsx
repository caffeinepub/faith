import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  Bot,
  LogOut,
  ShoppingCart,
  Store,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { User } from "../App";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  cartCount?: number;
  activePage?: string;
}

export function Navbar({
  user,
  onLogout,
  cartCount = 0,
  activePage,
}: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate({ to: "/" });
  };

  const navLinks = [
    { path: "/compare", label: "Compare", icon: TrendingUp },
    { path: "/marketplace", label: "Marketplace", icon: Store },
    { path: "/assistant", label: "AI Assistant", icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate({ to: "/compare" })}
          className="flex items-center gap-2 cursor-pointer"
          data-ocid="nav.link"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.7 0.22 50))",
            }}
          >
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-display font-extrabold gradient-text">
            PriceHunt
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.path;
            return (
              <button
                type="button"
                key={link.path}
                onClick={() =>
                  navigate({
                    to: link.path as "/compare" | "/marketplace" | "/assistant",
                  })
                }
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                style={
                  isActive
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.7 0.22 50))",
                      }
                    : {}
                }
                data-ocid="nav.link"
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            data-ocid="nav.button"
          >
            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            {cartCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs text-white"
                style={{ background: "oklch(0.62 0.25 345)" }}
              >
                {cartCount}
              </Badge>
            )}
          </button>
          {user && (
            <>
              <span className="hidden sm:block text-sm font-medium">
                Hi, {user.name.split(" ")[0]}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-1.5"
                data-ocid="nav.button"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </Button>
            </>
          )}
        </div>
      </nav>

      <div className="md:hidden flex border-t border-border">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activePage === link.path;
          return (
            <button
              type="button"
              key={link.path}
              onClick={() =>
                navigate({
                  to: link.path as "/compare" | "/marketplace" | "/assistant",
                })
              }
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors ${
                isActive ? "text-purple-600" : "text-muted-foreground"
              }`}
              data-ocid="nav.link"
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
