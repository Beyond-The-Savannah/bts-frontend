import { db } from "../db";
import { eventsTable } from "../schema";


export async function GetAllEvents(){
    const data=await db.select().from(eventsTable)
    return data
}