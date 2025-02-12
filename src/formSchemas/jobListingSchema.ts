import { z } from "zod";

export const CompanyFormSchema= z.object({
    companyName:z.string().min(1,{message:"Comapny Name must be at least one character long"}),
    companyHeadQuaters:z.string().min(1,{message:"Comapny HeadQuaters must be at least one character long"}),
    companyContactEmail:z.string().email({message:"Email is Invalid"}),
    companyContactPhone:z.string().min(1,{message:"Invalid, needs to numbers "}),
    companyDescription:z.string().min(1,{message:"Comapny Description must be at least one character long"}).trim(),
    location:z.string().min(1,{message:"Comapny Location must be at least one character long"}),
    // imageUrl:z.union([z.instanceof(File, {message:"Image is required"}),z.string().optional()]),
    // imageUrl:z.instanceof(File, {message:"Image is required"}),
    imageUrl:z.string(),
    // imageUrl:z.string().min(1,{message:"Comapny Image URL must be at least one character long"}),
})

export const JobFormSchema=z.object({
    endDate:z.date(),
    jobName:z.string({message:"Job's Name can only be a string"}),
    jobDescription:z.string({message:"Company's Description can only be a string"}).trim(),
    companyId:z.string(),
    language:z.string(),
    jobUrl:z.string().url({message:"Invalid URL format"}),
    salary:z.number(),
    jobCategoriesId:z.string(),
    jobSubCategoryId:z.string(),
    createdBy:z.string().optional(),
    jobsAndSections:z.array(z.object({
        id:z.number().optional(),
        sectionName:z.string(),
        sectionDescription: z.string().trim(),
        jobTypesId: z.number().optional(),
        createdBy: z.string().optional(),
        modifiedBy: z.string().optional(),
    })),
})

export const JobCategoryFormSchema=z.object({
    categoryName:z.string({message:"This should be a string"}),
    categoryDescription:z.string({message:"This should be string"}).trim()
})

export const JobSubCategoryFormSchema=z.object({
    subCategoryName:z.string({message:"This should be a string"}),
    subCategoryDescription:z.string({message:"This should be string"}).trim(),
    jobCategory:z.string({message:"Job's Category can only be a string"}),
})