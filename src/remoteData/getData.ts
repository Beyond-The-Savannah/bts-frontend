import { ListingRemoteJobs } from "@/types/remoteJobsListing";
import { useQuery } from "@tanstack/react-query";

export async function fetchRemoteJobsList(): Promise<ListingRemoteJobs[]> {
    const result =
      fetch(`https://efmsapi.azurewebsites.net/api/Jobs/getAllJobsByCompany?name=&jobCategoryId=0
  `).then((res) => res.json());
    return result;
  }
export const useGetRemoteListingJobsUsingTanstack=()=>{
  return useQuery({
    queryKey:["allRemoteJobs"],
    queryFn:fetchRemoteJobsList
  })
}

 // const {
  //   data: remoteJobs,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["allJobs"],
  //   queryFn: fetchRemoteJobsList,
  // });
  