import { Paystack } from "paystack-sdk"

const paystackInstance=new Paystack("sk_live_9bceb82eb76399c6f2f20b74b4418f73f6501fa2")

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