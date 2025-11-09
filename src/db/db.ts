import {drizzle} from 'drizzle-orm/neon-http'
import {neon} from '@neondatabase/serverless'
// import { config } from "dotenv";


// config({path:".env.local"})
const neonDbUrl=process.env.NEXT_PUBLIC_DATABASE_URL

if (!neonDbUrl) {
  throw new Error(
    'DATABASE_URL is not defined. Please check your .env.local file.'
  )
}

const sql= neon(neonDbUrl)
export const db=drizzle({client:sql})
