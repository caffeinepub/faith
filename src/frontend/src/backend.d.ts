import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface JobListing {
    id: bigint;
    title: string;
    salary: SalaryRange;
    postedDate: Time;
    description: string;
    distance: bigint;
    shift: Shift;
    company: string;
    genderPreference: Gender;
    contactNumber?: string;
    requirements: string;
    location: string;
}
export interface JobApplication {
    additionalInfo?: string;
    applicantName: string;
    agreementAccepted: boolean;
    preferredTiming: TimePreference;
    expectedSalary: bigint;
    availableFromDate: string;
    dateOfBirth: string;
    submissionTimestamp: Time;
    jobId: bigint;
    resumeFileId?: bigint;
    address: string;
    gender: Gender;
    phoneNumber: string;
}
export interface UserProfile {
    name: string;
    email?: string;
    phoneNumber?: string;
}
export interface SalaryRange {
    max: bigint;
    min: bigint;
}
export enum Gender {
    any_ = "any",
    female = "female",
    male = "male"
}
export enum Shift {
    day = "day",
    night = "night",
    flexibleShifts = "flexibleShifts"
}
export enum TimePreference {
    day = "day",
    night = "night"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addJobListing(title: string, company: string, location: string, distance: bigint, minSalary: bigint, maxSalary: bigint, shift: Shift, genderPreference: Gender, description: string, requirements: string, contactNumber: string | null): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllJobListings(): Promise<Array<JobListing>>;
    getApplicationsForJob(jobId: bigint): Promise<Array<JobApplication>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getJobListingsByDistance(maxDistance: bigint): Promise<Array<JobListing>>;
    getJobListingsByLocation(location: string): Promise<Array<JobListing>>;
    getJobListingsByPostedDate(arg0: Time): Promise<Array<JobListing>>;
    getJobListingsBySalaryRange(minSalary: bigint, maxSalary: bigint): Promise<Array<JobListing>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitApplication(applicantName: string, dateOfBirth: string, phoneNumber: string, address: string, gender: Gender, preferredTiming: TimePreference, availableFromDate: string, expectedSalary: bigint, jobId: bigint, agreementAccepted: boolean, resumeFileId: bigint | null, additionalInfo: string | null): Promise<void>;
}
