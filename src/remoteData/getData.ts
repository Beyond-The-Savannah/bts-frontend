import { ListingRemoteJobs } from "@/types/remoteJobsListing";

export async function fetchRemoteJobsList(): Promise<ListingRemoteJobs[]> {
    const result =
      fetch(`https://efmsapi.azurewebsites.net/api/Jobs/getAllJobsByCompany?name=&jobCategoryId=0
  `).then((res) => res.json());
    return result;
  }