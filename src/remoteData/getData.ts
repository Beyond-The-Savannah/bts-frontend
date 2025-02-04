import { CompanyProps, ListingRemoteJobs, SingleRemoteJob } from "@/types/remoteJobsListing";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./mutateData";

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

 export async function fetchSingleRemoteList(jobsId:string): Promise<SingleRemoteJob[]> {
    const result = fetch(
      `https://efmsapi.azurewebsites.net/api/Jobs/getAllJobsSections?jobId=${jobsId}`
    ).then((res) => res.json());
    return result;
  }


  export const useGetSingleRemiteListingUsingTanstack=(jobsId:string)=>{
    return useQuery({
      queryKey: ["singeleJob"],
    queryFn: () => fetchSingleRemoteList(jobsId)
    })
  }


  async function fetchAllCompaies():Promise<CompanyProps[]>{
    const result= await  axiosInstance.get<CompanyProps[]>('/api/Companies/getAllCompanies')
    return result.data
  }

  export const useGetAllComapanies=()=>{
    return useQuery({
      queryKey:["allCompanies"],
      queryFn:()=>fetchAllCompaies()
    })
  }