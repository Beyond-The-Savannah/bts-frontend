import { Paystack } from "paystack-sdk"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK__SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("Paystack API Key is missing.");
}
const paystackInstance=new Paystack(PAYSTACK_SECRET_KEY)

export async function GET(){
try {
    let allSubscriptions:unknown[]=[]
    let currentPage=1
    let totalPages=1

    do{
        const response = await paystackInstance.subscription.list({
            page:currentPage,
            perPage:50,
        })

        if("data" in response){
            allSubscriptions=[...allSubscriptions, ...response.data]
            totalPages=response.meta.pageCount
        }
        else{
            throw new Error("issue in the  try section of the subscription-details-by-plan-codes")
        }
        currentPage++
    }
    while( currentPage<=totalPages)

    // console.log(" BTS subscriptions after do while loop", allSubscriptions)

    return Response.json({
        status:true,
        message:"All BTS subscription users",
        data:allSubscriptions,
        meta:{
            total:allSubscriptions.length,
            pageCount:totalPages
        }
    })
    
    

} catch (error) {
    console.log("Error from the api end point Get subscription-details-by-plan-codes",error)
}
}