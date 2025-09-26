import {
  DropDownListProps,
  CompanyProps,
  jobCategoryProps,
  jobSubCategoryProps,
  ListingRemoteJobs,
  SingleRemoteJob,
} from "@/types/remoteJobsListing";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./mutateData";

const baseUrl = process.env.NEXT_PUBLIC_DB_BASE_URL as string;

export async function fetchRemoteJobsList(name?: string, jobSubCategoryId?: number) {
  const url = "/api/Jobs/getAllJobsByCompany";
  const queryParams = new URLSearchParams();

  if (name) queryParams.append("name", name);
  if (jobSubCategoryId) queryParams.append("jobSubCategoryId", jobSubCategoryId.toString());

  const urlUpdated = queryParams.toString() ? `${url}?${queryParams.toString()}` : url;


  const result = await axiosInstance.get<ListingRemoteJobs[]>(urlUpdated);
  return result.data;
}

export const useGetRemoteListingJobsUsingTanstack = (name?: string, jobSubCategoryId?: number) => {
  return useQuery({
    queryKey: ["allRemoteJobs", name, jobSubCategoryId],
    queryFn: () => fetchRemoteJobsList(name, jobSubCategoryId),
    // enabled: name !== undefined || jobSubCategoryId !== undefined, // Prevent unnecessary API calls
  });
};


export async function fetchSingleRemoteList(
  jobsId: string
): Promise<SingleRemoteJob[]> {
  const result = fetch(
    // `https://efmsapi.azurewebsites.net/api/Jobs/getAllJobsSections?jobId=${jobsId}`
    `${baseUrl}/api/Jobs/getAllJobsSections?jobId=${jobsId}`
  ).then((res) => res.json());
  return result;
}

export const useGetSingleRemiteListingUsingTanstack = (jobsId: string) => {
  return useQuery({
    queryKey: ["singeleJob"],
    queryFn: () => fetchSingleRemoteList(jobsId),
  });
};

async function fetchAllCompaies(): Promise<CompanyProps[]> {
  const result = await axiosInstance.get<CompanyProps[]>(
    "/api/Companies/getAllCompanies"
  );
  return result.data;
}

export const useGetAllComapanies = () => {
  return useQuery({
    queryKey: ["allCompanies"],
    queryFn: () => fetchAllCompaies(),
  });
};
async function fetchCompaiesDropDownList(): Promise<DropDownListProps[]> {
  const result = await axiosInstance.get<DropDownListProps[]>(
    "/api/Companies/getCompaniesDropDown"
  );
  return result.data;
}

export const useGetCompaniesDropDownList = () => {
  return useQuery({
    queryKey: ["companiesDropDownList"],
    queryFn: () => fetchCompaiesDropDownList(),
  });
};
async function fetchJobCategoryDropDownList(): Promise<DropDownListProps[]> {
  const result = await axiosInstance.get<DropDownListProps[]>(
    "/api/JobsCategory/getJobsCategoriesDropDown"
  );
  return result.data;
}

export const useGetJobCategoryDropDownList = () => {
  return useQuery({
    queryKey: ["jobCategoryDropDownList"],
    queryFn: () => fetchJobCategoryDropDownList(),
  });
};
async function fetchJobSubCategoryDropDownList(): Promise<DropDownListProps[]> {
  const result = await axiosInstance.get<DropDownListProps[]>(
    "/api/JobSubCategory/getJobsCategoriesDropDown"
  );
  return result.data;
}

export const useGetJobSubCategoryDropDownList = () => {
  return useQuery({
    queryKey: ["jobSubCategoryDropDownList"],
    queryFn: () => fetchJobSubCategoryDropDownList(),
  });
};

async function fetchAllJobCategories(): Promise<jobCategoryProps[]> {
  const result = await axiosInstance.get<jobCategoryProps[]>(
    "/api/JobsCategory/getAllJobsCategories"
  );
  return result.data;
}

export const useGetAllJobsCategories = () => {
  return useQuery({
    queryKey: ["allJobCategories"],
    queryFn: () => fetchAllJobCategories(),
  });
};
async function fetchAllJobSubCategories(): Promise<jobSubCategoryProps[]> {
  const result = await axiosInstance.get<jobSubCategoryProps[]>(
    "/api/JobSubCategory/getAllJobSubCategories"
  );
  return result.data;
}

export const useGetAllJobSubCategories = () => {
  return useQuery({
    queryKey: ["allJobSubCategories"],
    queryFn: () => fetchAllJobSubCategories(),
  });
};

