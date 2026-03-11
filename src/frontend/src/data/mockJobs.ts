import { Gender, Shift } from "../backend.d";

export interface MockJob {
  id: bigint;
  title: string;
  company: string;
  location: string;
  distance: bigint;
  salary: { min: bigint; max: bigint };
  shift: Shift;
  genderPreference: Gender;
  description: string;
  requirements: string;
  contactNumber: string;
  postedDate: bigint;
}

export const mockJobs: MockJob[] = [
  {
    id: 1n,
    title: "Kitchen Assistant",
    company: "Serena Hotel Nairobi",
    location: "Upper Hill, Nairobi",
    distance: 12n,
    salary: { min: 15000n, max: 22000n },
    shift: Shift.day,
    genderPreference: Gender.any_,
    description:
      "Assist our culinary team in preparing delicious meals for hotel guests. No prior experience needed — we train motivated youth.",
    requirements:
      "Basic hygiene knowledge, positive attitude, ability to work in a team",
    contactNumber: "+254 700 123 456",
    postedDate: BigInt(Date.now() - 86400000),
  },
  {
    id: 2n,
    title: "Night Security Officer",
    company: "Garden City Mall",
    location: "Thika Road, Nairobi",
    distance: 35n,
    salary: { min: 18000n, max: 25000n },
    shift: Shift.night,
    genderPreference: Gender.male,
    description:
      "Ensure the safety and security of our mall premises during night hours. Uniform and training provided.",
    requirements: "Certificate of good conduct, physical fitness, alertness",
    contactNumber: "+254 720 234 567",
    postedDate: BigInt(Date.now() - 172800000),
  },
  {
    id: 3n,
    title: "Sales Associate",
    company: "Westgate Shopping Mall",
    location: "Westlands, Nairobi",
    distance: 20n,
    salary: { min: 12000n, max: 18000n },
    shift: Shift.day,
    genderPreference: Gender.any_,
    description:
      "Engage customers, showcase products, and drive sales in a vibrant retail environment. Earn commissions on top of base salary!",
    requirements: "Good communication skills, friendly personality, basic math",
    contactNumber: "+254 733 345 678",
    postedDate: BigInt(Date.now() - 43200000),
  },
  {
    id: 4n,
    title: "Housekeeping Attendant",
    company: "Villa Rosa Kempinski",
    location: "Waiyaki Way, Nairobi",
    distance: 48n,
    salary: { min: 14000n, max: 20000n },
    shift: Shift.flexibleShifts,
    genderPreference: Gender.female,
    description:
      "Maintain the pristine standards of our 5-star luxury hotel. Be part of an award-winning hospitality team.",
    requirements: "Attention to detail, reliability, professional demeanor",
    contactNumber: "+254 710 456 789",
    postedDate: BigInt(Date.now() - 259200000),
  },
  {
    id: 5n,
    title: "Data Entry Clerk",
    company: "iHub Tech Center",
    location: "Kilimani, Nairobi",
    distance: 18n,
    salary: { min: 20000n, max: 30000n },
    shift: Shift.day,
    genderPreference: Gender.any_,
    description:
      "Join Africa's leading tech hub! Enter and manage data with precision. Opportunity to grow into a full-time tech role.",
    requirements:
      "Basic computer skills, typing speed >40 WPM, KCSE certificate",
    contactNumber: "+254 722 567 890",
    postedDate: BigInt(Date.now() - 3600000),
  },
  {
    id: 6n,
    title: "Delivery Rider",
    company: "Glovo Kenya",
    location: "CBD, Nairobi",
    distance: 52n,
    salary: { min: 22000n, max: 35000n },
    shift: Shift.flexibleShifts,
    genderPreference: Gender.male,
    description:
      "Deliver happiness across Nairobi! Flexible hours, daily earnings, and a motorbike provided. Be your own boss.",
    requirements:
      "Valid motorbike license, smartphone, knowledge of Nairobi routes",
    contactNumber: "+254 745 678 901",
    postedDate: BigInt(Date.now() - 7200000),
  },
  {
    id: 7n,
    title: "Cashier",
    company: "Naivas Supermarket",
    location: "Ngong Road, Nairobi",
    distance: 8n,
    salary: { min: 13000n, max: 17000n },
    shift: Shift.day,
    genderPreference: Gender.any_,
    description:
      "Handle customer transactions efficiently at one of Kenya's most loved supermarket chains. Excellent staff benefits included.",
    requirements: "Honest, numerically sharp, good customer service skills",
    contactNumber: "+254 756 789 012",
    postedDate: BigInt(Date.now() - 432000000),
  },
  {
    id: 8n,
    title: "Call Center Agent",
    company: "Teleperformance Kenya",
    location: "Parklands, Nairobi",
    distance: 61n,
    salary: { min: 25000n, max: 40000n },
    shift: Shift.night,
    genderPreference: Gender.any_,
    description:
      "Handle international client calls from the comfort of a modern BPO office. Night shift premium pay + meals provided.",
    requirements: "Fluent English, KCSE B plain, good listening skills",
    contactNumber: "+254 768 890 123",
    postedDate: BigInt(Date.now() - 518400000),
  },
];

export function formatSalary(min: bigint, max: bigint): string {
  return `KES ${Number(min).toLocaleString()} – ${Number(max).toLocaleString()}/mo`;
}

export function formatDistance(distance: bigint): string {
  const d = Number(distance);
  if (d < 10) return `${d} km away`;
  return `${(d / 10).toFixed(1)} km away`;
}

export function getShiftLabel(shift: Shift): string {
  switch (shift) {
    case Shift.day:
      return "Day Shift";
    case Shift.night:
      return "Night Shift";
    case Shift.flexibleShifts:
      return "Flexible";
  }
}

export function getGenderLabel(gender: Gender): string {
  switch (gender) {
    case Gender.male:
      return "Male";
    case Gender.female:
      return "Female";
    case Gender.any_:
      return "Any Gender";
  }
}
