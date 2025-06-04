import {serve} from "@upstash/workflow/nextjs"

export const {POST}=serve(
    async (context)=>{
        await context.run("step 1", ()=>{console.log("step one run")})
        await context.run("step 2", ()=>(console.log("step two run")))
    }
)