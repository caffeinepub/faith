import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Briefcase, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Gender, Shift } from "../backend.d";
import type { MockJob } from "../data/mockJobs";
import { useGetAllJobs } from "../hooks/useQueries";
import { ApplicationModal } from "./ApplicationModal";
import { JobCard } from "./JobCard";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

export function JobListings() {
  const { data: jobs = [], isLoading } = useGetAllJobs();
  const [search, setSearch] = useState("");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<MockJob | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleApply(job: MockJob) {
    setSelectedJob(job);
    setModalOpen(true);
  }

  const filtered = (jobs as unknown as MockJob[]).filter((job) => {
    const matchSearch =
      !search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    const matchShift =
      shiftFilter === "all" ||
      (shiftFilter === "day" && job.shift === Shift.day) ||
      (shiftFilter === "night" && job.shift === Shift.night) ||
      (shiftFilter === "flexible" && job.shift === Shift.flexibleShifts);

    const matchGender =
      genderFilter === "all" ||
      (genderFilter === "male" && job.genderPreference === Gender.male) ||
      (genderFilter === "female" && job.genderPreference === Gender.female) ||
      (genderFilter === "any" && job.genderPreference === Gender.any_);

    return matchSearch && matchShift && matchGender;
  });

  return (
    <section id="jobs" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div
              className="h-px w-8"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.82 0.16 78))",
              }}
            />
            <span
              className="text-xs font-heading uppercase tracking-widest"
              style={{ color: "oklch(0.82 0.16 78)" }}
            >
              Available Positions
            </span>
            <div
              className="h-px w-8"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.82 0.16 78), transparent)",
              }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Find Your <span className="gold-text">Opportunity</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Carefully curated jobs for orphans and semi-orphan students across
            Nairobi. Every role comes with support.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-4 mb-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-wrap"
        >
          <div className="relative flex-1 w-full min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-muted/50 border-border/50 w-full"
              data-ocid="jobs.search_input"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-heading">
                Shift:
              </span>
            </div>
            <ToggleGroup
              type="single"
              value={shiftFilter}
              onValueChange={(v) => setShiftFilter(v || "all")}
              className="gap-1"
            >
              {[
                { value: "all", label: "All" },
                { value: "day", label: "🌅 Day" },
                { value: "night", label: "🌙 Night" },
                { value: "flexible", label: "⚡ Flex" },
              ].map((opt) => (
                <ToggleGroupItem
                  key={opt.value}
                  value={opt.value}
                  className="text-xs h-8 px-3 rounded-lg font-heading data-[state=on]:text-white"
                  data-ocid="jobs.tab"
                >
                  {opt.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-xs text-muted-foreground font-heading">
              Gender:
            </span>
            <ToggleGroup
              type="single"
              value={genderFilter}
              onValueChange={(v) => setGenderFilter(v || "all")}
              className="gap-1"
            >
              {[
                { value: "all", label: "All" },
                { value: "male", label: "♂ Male" },
                { value: "female", label: "♀ Female" },
                { value: "any", label: "⚧ Any" },
              ].map((opt) => (
                <ToggleGroupItem
                  key={opt.value}
                  value={opt.value}
                  className="text-xs h-8 px-3 rounded-lg font-heading data-[state=on]:text-white"
                  data-ocid="jobs.tab"
                >
                  {opt.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </motion.div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6 font-heading">
          Showing{" "}
          <span className="text-foreground font-semibold">
            {filtered.length}
          </span>{" "}
          positions
        </p>

        {/* Job Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SKELETON_KEYS.map((k) => (
              <div
                key={k}
                className="glass rounded-2xl h-72 animate-pulse"
                data-ocid="jobs.loading_state"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
            data-ocid="jobs.empty_state"
          >
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-display text-foreground mb-2">
              No jobs found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((job, i) => (
              <JobCard
                key={String(job.id)}
                job={job}
                index={i}
                onApply={handleApply}
              />
            ))}
          </div>
        )}
      </div>

      <ApplicationModal
        job={selectedJob}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
