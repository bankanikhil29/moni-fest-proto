import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function goToCampaignWizard(creatorId: number | string) {
  return `/create-campaign?creatorId=${creatorId}`;
}
