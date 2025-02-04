import { useMutation } from "@tanstack/react-query";
import { CompanyFormSchema } from "@/formSchemas/jobListingSchema";
import { z } from "zod";

const baseUrl = "https://efmsapi.azurewebsites.net";

export function useAddCompanyDetails(data: z.infer<typeof CompanyFormSchema>) {
  return useMutation({
    mutationFn: async () => {
      // const response = await fetch(`${baseUrl}/api/Companies/addCompanies`, {
      return await fetch(`${baseUrl}/api/Companies/addCompanies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.companyName,
          description: data.companyDescription,
          phoneNumber: data.companyContactPhone,
          headQuarters: data.companyHeadQuaters,
          attachmentName: "",
          imageUrl: data.imageUrl,
          attachment: "",
          email: data.companyContactEmail,
          location: data.location,
        }),
      });
      // const result = await response.json();
      // return result;
    },
  });
}
