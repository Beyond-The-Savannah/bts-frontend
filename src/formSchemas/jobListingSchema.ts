import { z } from "zod";

export const CompanyFormSchema= z.object({
    companyName:z.string().min(1,{message:"Comapny Name must be at least one character long"}),
    companyHeadQuaters:z.string().min(1,{message:"Comapny HeadQuaters must be at least one character long"}),
    companyContactEmail:z.string().email({message:"Email is Invalid"}),
    companyContactPhone:z.string().min(1,{message:"Invalid, needs to numbers "}),
    companyDescription:z.string().min(1,{message:"Comapny Description must be at least one character long"}),
    location:z.string().min(1,{message:"Comapny Location must be at least one character long"}),
    imageUrl:z.string().min(1,{message:"Comapny Image URL must be at least one character long"}),
})

export const JobFormSchema=z.object({
    jobName:z.string({message:"Job's Name can only be a string"}),
    jobUrl:z.string().url({message:"Invalid URL format"}),
    jobCategory:z.string({message:"Job's Category can only be a string"}),
    jobSubCategory:z.string({message:"Job's Sub Category can only be a string"}),
    company:z.string({message:"Company Name can only be a string"}),
    companyDescription:z.string({message:"Company's Description can only be a string"}),
    // endDate:z.string().date(),
    endDate:z.date(),
})

export const JobCategoryFormSchema=z.object({
    categoryName:z.string({message:"This should be a string"}),
    categoryDescription:z.string({message:"This should be string"})
})

export const JobSubCategoryFormSchema=z.object({
    subCategoryName:z.string({message:"This should be a string"}),
    subCategoryDescription:z.string({message:"This should be string"}),
    jobCategory:z.string({message:"Job's Category can only be a string"}),
})