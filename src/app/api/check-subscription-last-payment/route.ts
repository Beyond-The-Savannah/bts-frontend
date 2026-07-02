import { ExpiredSubscriptionDetails, GetSubscriptionInformationDetails } from "@/db/queries/viewJobsSubscriptionQuries"
import {serve} from "@upstash/workflow/nextjs"


export const {POST}=serve(async(context)=>{

// fetch users subscription details from the database
const subscriptionDateData= await context.run("Fetch subscribed users from database",async()=>{
  
    const subscriptionData=await GetSubscriptionInformationDetails()

  const subscrptionDateList =subscriptionData.map((subscription)=>({
    subscriptionEndDate:subscription.subscriptionEndDate as Date,
    subscriptionId:subscription.subscriptionId as string
  }))

  return subscrptionDateList

})
// process batch to check if any subscription is expiring today 
if(subscriptionDateData.length>0){
    const batchSize=50
    for(let i=0;i<subscriptionDateData.length;i+=batchSize){
        const batchIndex=Math.floor(i/batchSize) 
        const currentBatch=subscriptionDateData.slice(i,i+batchSize)
        await context.run(`Check subscription expiration for batch ${batchIndex+1}`,async()=>{
            const todayStr = new Date().toISOString().split('T')[0]
            
               const results=await Promise.allSettled(
             
                 currentBatch.map(async (subscription)=>{
                   const subscriptionEndDate=new Date(subscription.subscriptionEndDate)
                   const isExpiringToday=subscriptionEndDate.toISOString().split('T')[0]== todayStr
                   if(isExpiringToday){
                     const data= await ExpiredSubscriptionDetails(subscription.subscriptionId)
                     console.log("EXPIRED SUBSCRIPTION ID -> ",data)
                   }
                 })
               ) 
               const failures=results.filter((result)=>result.status==="rejected")
               if (failures.length) console.error(`Batch ${batchIndex + 1} had ${failures.length} failures`, failures)

        // Always return a value from context.run so Upstash can checkpoint it
        return { success: true }
        })

    }
}

})
