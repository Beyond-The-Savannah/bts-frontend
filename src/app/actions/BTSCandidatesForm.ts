"use server"

import { db } from "@/db/db"
import { candidatePoolTable, CandidateProp } from "@/db/schema"

export async function AddMassCandidatesToPool(data:Omit<CandidateProp, 'id'|'createdAt'|'updatedAt'>[]){
    try {
        await db.insert(candidatePoolTable).values(data)
    } catch (error) {
        console.log("Error Adding Candidate(s) to the Pool",error)
        return error
    }
}