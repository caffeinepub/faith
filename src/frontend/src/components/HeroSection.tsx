import { Button } from "@/components/ui/button";
import { ArrowDown, Heart, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 15% 25%, oklch(0.45 0.22 295 / 0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 15%, oklch(0.65 0.2 78 / 0.25) 0%, transparent 45%),
          radial-gradient(ellipse at 55% 80%, oklch(0.42 0.18 155 / 0.2) 0%, transparent 45%),
          radial-gradient(ellipse at 5% 75%, oklch(0.5 0.2 35 / 0.18) 0%, transparent 40%),
          url('/assets/generated/faith-hero-bg.dim_1600x900.jpg') center/cover no-repeat,
          oklch(0.1 0.025 265)
        `,
      }}
    >
      {/* Decorative floating orbs */}
      <div
        className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl animate-float"
        style={{
          background: "oklch(0.55 0.22 295 / 0.2)",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute top-40 right-20 w-24 h-24 rounded-full blur-2xl animate-float"
        style={{
          background: "oklch(0.82 0.16 78 / 0.25)",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full blur-2xl animate-float"
        style={{
          background: "oklch(0.62 0.18 155 / 0.2)",
          animationDelay: "4s",
        }}
      />
      <div
        className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full blur-2xl animate-float"
        style={{ background: "oklch(0.68 0.2 35 / 0.2)", animationDelay: "1s" }}
      />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.6 0.1 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.6 0.1 265) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass-light"
        >
          <Heart
            className="w-4 h-4"
            style={{ color: "oklch(0.78 0.15 155)" }}
          />
          <span className="text-xs font-heading uppercase tracking-widest text-muted-foreground">
            Empowering Youth Since 2024
          </span>
          <Star className="w-4 h-4" style={{ color: "oklch(0.88 0.15 78)" }} />
        </motion.div>

        {/* FAITH Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <h1
            className="text-8xl md:text-[10rem] lg:text-[12rem] font-display font-black leading-none tracking-tight mb-4 faith-glow"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.92 0.18 78), oklch(0.75 0.22 78), oklch(0.88 0.14 95), oklch(0.7 0.18 55))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200% 200%",
              animation: "shimmer 4s linear infinite",
            }}
          >
            FAITH
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl md:text-2xl font-display font-medium text-foreground mb-4 leading-snug"
        >
          Empowering{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, oklch(0.78 0.15 155), oklch(0.62 0.18 155))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Orphans
          </span>{" "}
          &{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, oklch(0.8 0.15 295), oklch(0.65 0.18 280))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Semi-Orphans
          </span>{" "}
          Through Opportunity
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed"
        >
          FAITH connects vulnerable youth with employers who care. Browse
          verified jobs with fair pay, flexible hours, and real career growth —
          because everyone deserves a chance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="text-white font-heading px-8 py-6 text-base rounded-2xl animate-pulse-gold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.45 0.18 280))",
            }}
            onClick={() =>
              document
                .getElementById("jobs")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.primary_button"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Browse Jobs
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="font-heading px-8 py-6 text-base rounded-2xl border-border/50 hover:bg-muted/30"
            data-ocid="hero.secondary_button"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { value: "500+", label: "Jobs Listed" },
            { value: "1,200+", label: "Youth Hired" },
            { value: "98%", label: "Satisfaction" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-light rounded-2xl p-4 text-center"
            >
              <p className="text-2xl font-display font-bold gold-text">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground font-heading mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex justify-center pb-8"
        >
          <button
            type="button"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() =>
              document
                .getElementById("jobs")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.secondary_button"
          >
            <span className="text-xs font-heading uppercase tracking-widest">
              Scroll to explore
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
