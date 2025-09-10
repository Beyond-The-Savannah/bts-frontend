import { UserDataProp } from "@/types/mailerLite";

const KIT_KEY=process.env.KIT_KEY

if(!KIT_KEY){throw new Error("Kit API key is missing")}

export async function AddSubscriberToKit(userData:UserDataProp){

    const url='https://api.kit.com/v4/subscribers'
    const options={
        method:'POST',
        headers:{'X-Kit-Api-Key':`${KIT_KEY}`, 'Content-Type':'application/json'},
        body:`{'email_address':'${userData}'}`,
    }

    try {
        const response= await fetch(url,options)
        const data= await response.json()
        return data
        // console.log("KIT NEWSLETTER", data)
    } catch (error) {
        console.log("Error from Kit function to add Subscriber", error)
    }
}