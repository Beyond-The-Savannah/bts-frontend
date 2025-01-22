import { z } from "zod";

export const CompanyFormSchema= z.object({
    companyName:z.string().min(1,{message:"Comapny Name must be at least one character long"}),
    companyHeadQuaters:z.string().min(1,{message:"Comapny HeadQuaters must be at least one character long"}),
    companyContactEmail:z.string().email({message:"Email is Invalid"}),
    companyContactPhone:z.string().min(1,{message:"Comapny Number must be at least one character long"}),
    companyDescription:z.string().min(1,{message:"Comapny Description must be at least one character long"}),
    location:z.string().min(1,{message:"Comapny Location must be at least one character long"}),
    imageUrl:z.string().min(1,{message:"Comapny Image URL must be at least one character long"}),
})