import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Clock,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { Gender, Shift } from "../backend.d";
import type { MockJob } from "../data/mockJobs";
import {
  formatDistance,
  formatSalary,
  getGenderLabel,
  getShiftLabel,
} from "../data/mockJobs";

interface Props {
  job: MockJob;
  index: number;
  onApply: (job: MockJob) => void;
}

const shiftColors: Record<Shift, string> = {
  [Shift.day]: "badge-gold",
  [Shift.night]: "badge-violet",
  [Shift.flexibleShifts]: "badge-sky",
};

const shiftIcons: Record<Shift, string> = {
  [Shift.day]: "🌅",
  [Shift.night]: "🌙",
  [Shift.flexibleShifts]: "⚡",
};

const genderColors: Record<Gender, string> = {
  [Gender.male]: "badge-sky",
  [Gender.female]: "badge-coral",
  [Gender.any_]: "badge-emerald",
};

const cardAccents = [
  "from-violet/20 to-transparent",
  "from-yellow-500/20 to-transparent",
  "from-emerald/20 to-transparent",
  "from-coral/20 to-transparent",
  "from-sky/20 to-transparent",
];

export function JobCard({ job, index, onApply }: Props) {
  const accent = cardAccents[index % cardAccents.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      data-ocid={`jobs.item.${index + 1}`}
    >
      <div className="glass gradient-border rounded-2xl overflow-hidden card-hover h-full flex flex-col">
        {/* Top gradient accent */}
        <div className={`h-1 w-full bg-gradient-to-r ${accent}`} />

        <div className="p-5 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.22 295 / 0.3), oklch(0.45 0.18 280 / 0.2))",
                  border: "1px solid oklch(0.55 0.22 295 / 0.3)",
                }}
              >
                <Building2
                  className="w-5 h-5"
                  style={{ color: "oklch(0.8 0.15 295)" }}
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold text-foreground leading-tight truncate">
                  {job.title}
                </h3>
                <p className="text-xs text-muted-foreground font-body truncate">
                  {job.company}
                </p>
              </div>
            </div>
            <span className="badge-emerald text-xs px-2.5 py-1 rounded-full font-heading shrink-0 whitespace-nowrap">
              <MapPin className="w-3 h-3 inline mr-1" />
              {formatDistance(job.distance)}
            </span>
          </div>

          {/* Location */}
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
            <MapPin className="w-3 h-3 shrink-0" />
            {job.location}
          </p>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
            {job.description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`${shiftColors[job.shift]} text-xs px-2.5 py-1 rounded-full font-heading flex items-center gap-1`}
            >
              <span>{shiftIcons[job.shift]}</span>
              <Clock className="w-3 h-3" />
              {getShiftLabel(job.shift)}
            </span>
            <span
              className={`${genderColors[job.genderPreference]} text-xs px-2.5 py-1 rounded-full font-heading flex items-center gap-1`}
            >
              <Users className="w-3 h-3" />
              {getGenderLabel(job.genderPreference)}
            </span>
          </div>

          {/* Salary & CTA */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/30">
            <div>
              <p className="text-xs text-muted-foreground font-heading uppercase tracking-wider">
                Salary
              </p>
              <p
                className="text-sm font-display font-semibold"
                style={{ color: "oklch(0.88 0.15 78)" }}
              >
                <DollarSign className="w-3 h-3 inline" />
                {formatSalary(job.salary.min, job.salary.max)}
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => onApply(job)}
              className="text-white font-heading text-xs px-4 rounded-xl group shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.82 0.16 78 / 0.8))",
              }}
              data-ocid={`jobs.item.${index + 1}`}
            >
              Apply Now
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
