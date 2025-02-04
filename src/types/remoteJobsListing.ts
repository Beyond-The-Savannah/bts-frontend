export interface ListingRemoteJobs {
  dateCreated: string;
  dateModified: string;
  endDate: string;
  jobName: string;
  imageUrl: string;
  jobUrl: string;
  salary: number;
  attachmentName: string;
  jobDescription: string;
  companyId: number;
  companyName: string;
  companyDescription: string;
  email: string;
  location: string;
  language: string | null;
  headQuarters: string;
  phoneNumber: string;
  jobCategory: string;
  jobsId: number;
  jobCategoriesId: number;
  jobSubCategoryId: number;
  jobSubCategory: number;
}
export interface SingleRemoteJob {
  id: number;
  sectionName: string;
  sectionDescription: string;
  jobsId: number;
  jobTypesId: number;
  dateCreated: string;
  dateModified: string;
  createdBy: string;
  modifiedBy: string | null;
  isActive: boolean;
  isDeleted: boolean;
}
export type Params = Promise<{ slug: string }>;
export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export interface CompanyProps {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  headQuarters: string;
  attachmentName: string;
  imageUrl: string;
  attachment: string;
  email: string;
  location: string;
  createdBy: string;
  modifiedBy: string;
}
