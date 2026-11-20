import { cache } from "react";
import { db } from "../db";
import { eventsTable } from "../schema";



export const GetAllEvents=cache(async ()=>{
    const data=await db.select().from(eventsTable)
    return data
})

// export async function GetAllEvents(){
//     const data=await db.select().from(eventsTable)
//     return data
// }