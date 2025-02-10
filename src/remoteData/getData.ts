import { CompanyProps, jobCategoryProps, jobSubCategoryProps, ListingRemoteJobs, SingleRemoteJob } from "@/types/remoteJobsListing";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./mutateData";

// export async function fetchRemoteJobsList(jobName:string): Promise<ListingRemoteJobs[]> {
//     const result =
//       // fetch(`https://efmsapi.azurewebsites.net/api/Jobs/getAllJobsByCompany?name=&jobCategoryId=0
//       fetch(`https://efmsapi.azurewebsites.net/api/Jobs/getAllJobsByName/?name=${jobName}
// `).then((res) => res.json());
//     return result;
//   }

  export async function fetchRemoteJobsList(name?:string){
    const url = '/api/Jobs/getAllJobsByName/';
    const urlUpdated = name ? `${url}?name=${name}` : url;
    const result= await axiosInstance.get<ListingRemoteJobs[]>(urlUpdated)
    return result.data

  }
export const useGetRemoteListingJobsUsingTanstack=(name?:string)=>{
  return useQuery({
    queryKey:["allRemoteJobs", name],
    queryFn:()=>fetchRemoteJobsList(name)
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
  
  async function fetchAllJobCategories():Promise<jobCategoryProps[]>{
    const result= await  axiosInstance.get<jobCategoryProps[]>('/api/JobsCategory/getAllJobsCategories')
    return result.data
  }

  export const useGetAllJobsCategories=()=>{
    return useQuery({
      queryKey:["allJobCategories"],
      queryFn:()=>fetchAllJobCategories()
    })
  }
  async function fetchAllJobSubCategories():Promise<jobSubCategoryProps[]>{
    const result= await  axiosInstance.get<jobSubCategoryProps[]>('/api/JobSubCategory/getAllJobSubCategories')
    return result.data
  }

  export const useGetAllJobSubCategories=()=>{
    return useQuery({
      queryKey:["allJobSubCategories"],
      queryFn:()=>fetchAllJobSubCategories()
    })
  }
