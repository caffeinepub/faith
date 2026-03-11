import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { JobListings } from "./components/JobListings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});

function NavBar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <nav
        className="max-w-7xl mx-auto glass rounded-2xl px-5 py-3 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-2">
          <Sparkles
            className="w-5 h-5"
            style={{ color: "oklch(0.88 0.15 78)" }}
          />
          <span className="text-2xl font-display font-black gold-text tracking-tight">
            FAITH
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {[
            { href: "#jobs", label: "Browse Jobs" },
            { href: "#about", label: "About" },
            { href: "#contact", label: "Contact" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-heading text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#jobs"
          className="text-sm font-heading text-white px-4 py-2 rounded-xl transition-opacity hover:opacity-90"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.82 0.16 78 / 0.8))",
          }}
          data-ocid="nav.primary_button"
        >
          Find a Job
        </a>
      </nav>
    </motion.header>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen mesh-bg">
        <NavBar />
        <main>
          <HeroSection />
          <JobListings />
        </main>
        <Footer />
      </div>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
