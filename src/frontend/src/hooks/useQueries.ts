import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { JobListing } from "../backend.d";
import { Gender, Shift, TimePreference } from "../backend.d";
import { mockJobs } from "../data/mockJobs";
import { useActor } from "./useActor";

export function useGetAllJobs() {
  const { actor, isFetching } = useActor();
  return useQuery<JobListing[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      if (!actor) return mockJobs as unknown as JobListing[];
      try {
        const jobs = await actor.getAllJobListings();
        return jobs.length > 0 ? jobs : (mockJobs as unknown as JobListing[]);
      } catch {
        return mockJobs as unknown as JobListing[];
      }
    },
    enabled: !isFetching,
    placeholderData: mockJobs as unknown as JobListing[],
  });
}

export interface ApplicationFormData {
  jobId: bigint;
  applicantName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  gender: Gender;
  preferredTiming: TimePreference;
  availableFromDate: string;
  expectedSalary: bigint;
  agreementAccepted: boolean;
}

export function useSubmitApplication() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ApplicationFormData) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitApplication(
        data.applicantName,
        data.dateOfBirth,
        data.phoneNumber,
        data.address,
        data.gender,
        data.preferredTiming,
        data.availableFromDate,
        data.expectedSalary,
        data.jobId,
        data.agreementAccepted,
        null,
        null,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export { Gender, Shift, TimePreference };
