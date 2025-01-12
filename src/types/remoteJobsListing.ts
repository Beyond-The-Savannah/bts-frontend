export interface ListingRemoteJobs{
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
    id: number;                       // Unique identifier for the section
    sectionName: string;              // Name of the section (e.g., "Benefits & Perks")
    sectionDescription: string;       // Description of the section, likely in HTML format
    jobsId: number;                   // Identifier for the associated job
    jobTypesId: number;               // Identifier for the type of job
    dateCreated: string;              // Date when the section was created (ISO 8601 format)
    dateModified: string;             // Date when the section was last modified (ISO 8601 format)
    createdBy: string;                // Identifier for who created the section
    modifiedBy: string | null;        // Identifier for who last modified the section or null if not applicable
    isActive: boolean;                // Indicates if the section is active
    isDeleted: boolean;               // Indicates if the section is deleted
}
export type Params = Promise<{ slug: string }>
export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>