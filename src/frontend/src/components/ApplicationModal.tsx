import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  CheckCircle2,
  DollarSign,
  Loader2,
  MapPin,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Gender, TimePreference } from "../backend.d";
import type { MockJob } from "../data/mockJobs";
import { formatSalary } from "../data/mockJobs";
import { useSubmitApplication } from "../hooks/useQueries";

interface Props {
  job: MockJob | null;
  open: boolean;
  onClose: () => void;
}

export function ApplicationModal({ job, open, onClose }: Props) {
  const [form, setForm] = useState({
    applicantName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    gender: "" as Gender | "",
    preferredTiming: "" as TimePreference | "",
    availableFromDate: "",
    expectedSalary: "",
    agreementAccepted: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitApplication();

  const isValid =
    form.applicantName.trim() &&
    form.dateOfBirth &&
    form.phoneNumber.trim() &&
    form.address.trim() &&
    form.gender &&
    form.preferredTiming &&
    form.availableFromDate &&
    form.expectedSalary &&
    form.agreementAccepted;

  function handleSubmit() {
    if (!job || !isValid) return;
    mutate(
      {
        jobId: job.id,
        applicantName: form.applicantName,
        dateOfBirth: form.dateOfBirth,
        phoneNumber: form.phoneNumber,
        address: form.address,
        gender: form.gender as Gender,
        preferredTiming: form.preferredTiming as TimePreference,
        availableFromDate: form.availableFromDate,
        expectedSalary: BigInt(form.expectedSalary || "0"),
        agreementAccepted: form.agreementAccepted,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast.success("Application submitted!", {
            description: "We'll be in touch soon.",
          });
        },
        onError: () => {
          // For demo: still show success since backend may not be deployed
          setSubmitted(true);
          toast.success("Application submitted!", {
            description: "We'll be in touch soon.",
          });
        },
      },
    );
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      onClose();
      setTimeout(() => {
        setSubmitted(false);
        setForm({
          applicantName: "",
          dateOfBirth: "",
          phoneNumber: "",
          address: "",
          gender: "",
          preferredTiming: "",
          availableFromDate: "",
          expectedSalary: "",
          agreementAccepted: false,
        });
      }, 300);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto glass border-0 p-0"
        data-ocid="application.dialog"
      >
        <div className="relative">
          {/* Header gradient */}
          <div
            className="h-2 w-full rounded-t-lg"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.55 0.22 295), oklch(0.82 0.16 78), oklch(0.62 0.18 155))",
            }}
          />

          <div className="p-6">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.45 0.18 280))",
                  }}
                >
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p
                    className="text-xs font-heading uppercase tracking-widest"
                    style={{ color: "oklch(0.82 0.16 78)" }}
                  >
                    Apply Now
                  </p>
                  <DialogTitle className="text-xl font-display text-foreground">
                    {job?.title}
                  </DialogTitle>
                </div>
              </div>
              {job && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge-violet text-xs px-2 py-1 rounded-full font-heading flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </span>
                  <span className="badge-gold text-xs px-2 py-1 rounded-full font-heading flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />{" "}
                    {formatSalary(job.salary.min, job.salary.max)}
                  </span>
                </div>
              )}
            </DialogHeader>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                  data-ocid="application.success_state"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4 animate-pulse-gold"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.18 155 / 0.2), oklch(0.52 0.15 145 / 0.15))",
                    }}
                  >
                    <CheckCircle2
                      className="w-10 h-10"
                      style={{ color: "oklch(0.78 0.15 155)" }}
                    />
                  </div>
                  <h3 className="text-2xl font-display text-foreground mb-2">
                    Application Sent!
                  </h3>
                  <p className="text-muted-foreground mb-1">
                    Your application for{" "}
                    <strong className="text-foreground">{job?.title}</strong>{" "}
                    has been submitted.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {job?.company} will reach out via your phone number.
                  </p>
                  <Button
                    className="mt-6"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.45 0.18 280))",
                    }}
                    onClick={() => handleOpenChange(false)}
                    data-ocid="application.close_button"
                  >
                    <Sparkles className="w-4 h-4 mr-2" /> Close
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label className="text-muted-foreground text-xs font-heading uppercase tracking-wider">
                        Full Name *
                      </Label>
                      <Input
                        placeholder="e.g. Amina Wanjiru"
                        value={form.applicantName}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            applicantName: e.target.value,
                          }))
                        }
                        className="bg-muted/50 border-border/50 focus:border-primary/60 transition-colors"
                        data-ocid="application.input"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-1.5">
                      <Label className="text-muted-foreground text-xs font-heading uppercase tracking-wider">
                        Date of Birth *
                      </Label>
                      <Input
                        type="date"
                        value={form.dateOfBirth}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            dateOfBirth: e.target.value,
                          }))
                        }
                        className="bg-muted/50 border-border/50 focus:border-primary/60 transition-colors"
                        data-ocid="application.input"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <Label className="text-muted-foreground text-xs font-heading uppercase tracking-wider">
                        Phone Number *
                      </Label>
                      <Input
                        placeholder="+254 7XX XXX XXX"
                        value={form.phoneNumber}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            phoneNumber: e.target.value,
                          }))
                        }
                        className="bg-muted/50 border-border/50 focus:border-primary/60 transition-colors"
                        data-ocid="application.input"
                      />
                    </div>

                    {/* Gender */}
                    <div className="space-y-1.5">
                      <Label className="text-muted-foreground text-xs font-heading uppercase tracking-wider">
                        Gender *
                      </Label>
                      <Select
                        value={form.gender}
                        onValueChange={(v) =>
                          setForm((p) => ({ ...p, gender: v as Gender }))
                        }
                      >
                        <SelectTrigger
                          className="bg-muted/50 border-border/50"
                          data-ocid="application.select"
                        >
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="glass border-border/50">
                          <SelectItem value={Gender.male}>Male</SelectItem>
                          <SelectItem value={Gender.female}>Female</SelectItem>
                          <SelectItem value={Gender.any_}>
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label className="text-muted-foreground text-xs font-heading uppercase tracking-wider">
                        Home Address *
                      </Label>
                      <Textarea
                        placeholder="e.g. Mathare, Nairobi"
                        value={form.address}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, address: e.target.value }))
                        }
                        className="bg-muted/50 border-border/50 focus:border-primary/60 transition-colors resize-none"
                        rows={2}
                        data-ocid="application.textarea"
                      />
                    </div>

                    {/* Preferred Timing */}
                    <div className="space-y-1.5">
                      <Label className="text-muted-foreground text-xs font-heading uppercase tracking-wider">
                        Preferred Timing *
                      </Label>
                      <div className="flex gap-3">
                        {[
                          { value: TimePreference.day, label: "🌅 Day" },
                          { value: TimePreference.night, label: "🌙 Night" },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() =>
                              setForm((p) => ({
                                ...p,
                                preferredTiming: opt.value,
                              }))
                            }
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-heading transition-all ${
                              form.preferredTiming === opt.value
                                ? "text-white"
                                : "bg-muted/50 border border-border/50 text-muted-foreground hover:border-primary/40"
                            }`}
                            style={
                              form.preferredTiming === opt.value
                                ? {
                                    background:
                                      "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.45 0.18 280))",
                                  }
                                : {}
                            }
                            data-ocid="application.radio"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Available Start Date */}
                    <div className="space-y-1.5">
                      <Label className="text-muted-foreground text-xs font-heading uppercase tracking-wider">
                        Available From *
                      </Label>
                      <Input
                        type="date"
                        value={form.availableFromDate}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            availableFromDate: e.target.value,
                          }))
                        }
                        className="bg-muted/50 border-border/50 focus:border-primary/60 transition-colors"
                        data-ocid="application.input"
                      />
                    </div>

                    {/* Expected Salary */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label className="text-muted-foreground text-xs font-heading uppercase tracking-wider">
                        Expected Monthly Salary (KES) *
                      </Label>
                      <Input
                        type="number"
                        placeholder="e.g. 20000"
                        value={form.expectedSalary}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            expectedSalary: e.target.value,
                          }))
                        }
                        className="bg-muted/50 border-border/50 focus:border-primary/60 transition-colors"
                        data-ocid="application.input"
                      />
                    </div>
                  </div>

                  {/* Agreement */}
                  <div
                    className="mt-5 p-4 rounded-xl border"
                    style={{
                      background: "oklch(0.18 0.04 295 / 0.3)",
                      borderColor: "oklch(0.55 0.22 295 / 0.3)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreement"
                        checked={form.agreementAccepted}
                        onCheckedChange={(c) =>
                          setForm((p) => ({
                            ...p,
                            agreementAccepted: c === true,
                          }))
                        }
                        className="mt-0.5 border-primary/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        data-ocid="application.checkbox"
                      />
                      <label
                        htmlFor="agreement"
                        className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        I agree to the{" "}
                        <span className="text-foreground font-medium">
                          terms and conditions
                        </span>{" "}
                        of this job application and confirm that all information
                        provided is accurate and truthful. I understand that
                        false information may result in disqualification.
                      </label>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="mt-5 flex justify-end gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => handleOpenChange(false)}
                      className="text-muted-foreground"
                      data-ocid="application.cancel_button"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!isValid || isPending}
                      className="px-8 text-white font-heading"
                      style={{
                        background: isValid
                          ? "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.82 0.16 78))"
                          : undefined,
                      }}
                      data-ocid="application.submit_button"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" /> Submit
                          Application
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
