import { clerkClient } from "@clerk/nextjs/server";
import { GetEmployerSubscriptionDetailsFromPaystack } from "../Customer/UserSubscriptionInformation";
import { subscriptionDetailsProps } from "@/types/subscriptions";

interface GetEmployerSubscriprionDetailsProps{
  orgId:string,
  userId?:string
}


export async function GetEmployerSubscriprionDetails({orgId,userId}:GetEmployerSubscriprionDetailsProps){
    'use cache'
    const client=await clerkClient()
    //Check if the user is a member of the organization
      const { data: organisationMemmbers } =
        await client.organizations.getOrganizationMembershipList({
          organizationId: orgId!,
        });
      // console.log("ORGANISATION MEMBERS:", organisationMemmbers);
    
      // Find the admin who likely owns the subscription
    const adminMemmber=organisationMemmbers.find((member)=>member.role=="org:admin")
    const adminEmail=adminMemmber?.publicUserData?.identifier
    const adminSubscriptionDetails:subscriptionDetailsProps[]=await GetEmployerSubscriptionDetailsFromPaystack(adminEmail as string)
    
    //check for valid subscription
    const isValidSubscription=adminSubscriptionDetails?.filter((subscriptionOne)=>subscriptionOne.amount===300000)
    .some((subscription)=>{return ["active", "attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase(),)})
    
    //check for organisation members
    const isOrganisationMember = organisationMemmbers.some((member) => member.publicUserData?.userId === userId,);

    //get organization name
    const organization= await client.organizations.getOrganization({organizationId: orgId!,});
    const organizationName=organization.name
    
  
  return { isValidSubscription, isOrganisationMember,  organizationName }
}