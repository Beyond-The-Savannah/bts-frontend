"use server"

import { db } from "@/db/db";
import { EventsProp, eventsTable } from "@/db/schema";

export async function AddEventToDb(data:Omit<EventsProp, 'id'|'createdAt'|'updatedAt'>){
try {
    await db.insert(eventsTable).values({
        eventName:data.eventName,
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        phoneNumber:data.phoneNumber,
    })
} catch (error) {
    console.log("Error adding event to db -EventsForm",error)
}
}