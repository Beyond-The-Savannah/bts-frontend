import EventTicketEmailTemplate from "@/components/Emails/EventTicketEmailTemplate"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)


export async function POST(request:Request){
try {
    const{email,firstName,lastName,amount,eventName}=await request.json()
    const {data,error}=await resend.emails.send({
        from:`info@beyondthesavannah.co.ke`,
        to:[email],
        subject:`Beyond The Savannah "${eventName}" Event Ticket`,
        react:EventTicketEmailTemplate({
            firstName,
            lastName,
            amount,
            eventName
        })
    })
    if(error){
        return Response.json({error}, {status:500})
    }
    return Response.json(data)
} catch (error) {
    return Response.json({error},{status:500})
}
}