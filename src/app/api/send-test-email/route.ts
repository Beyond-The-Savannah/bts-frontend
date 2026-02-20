import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(){
    try {
        const{data,error}=await resend.emails.send({
            from:`info@beyondthesavannah.com`,
            to:`gitonga1993@gmail.com`,
            // to:`annmukamikabs@gmail.com`
            subject:`Test Email`,
            html:`<p>This is a test email.</p>`
        })
        if(error){return Response.json({error}, {status:500})}
        console.log(data)
        return Response.json(data)
    } catch (error) {
        return Response.json({error}, {status:50})
    }
}