import {
  integer,
  pgTable,
  uuid,
  text,
  timestamp,
  customType,
} from "drizzle-orm/pg-core";

// const bytea = customType<{ data: Buffer }>({
//   dataType() {
//     return "bytea";
//   },
  
// });
const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return 'bytea';
  },
  toDriver(value: Buffer): Buffer {
    return value;
  },
});

export const jobsTable = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyName: text("company_name").notNull(),
  role: text("role").notNull(),
  workMode: text("work_mode").notNull(),
  jobType: text("job_type").notNull(),
  department: text("department").notNull(),
  author: text("author").notNull(),
  deadLine: text("dead_line").notNull(),
  jobDetails: text("job_details").notNull(),
  applicationLink: text("application_Link"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const companyTable = pgTable("company", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  teamMembers: text("team_members").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const candidatePoolTable = pgTable("candidate_pool", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  // resumeLink: text("resume_link").notNull(),
  resumeLink: bytea("resume_link").notNull(),
  resumeName: text("resume_name").notNull(),
  country: text("country").notNull(),
  profession: text("profession").notNull(),
  experienceYears: integer("experience_years").notNull(),
  // certifications: text("certifications").notNull().array(),
  certifications: text("certifications").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type JobsProp = typeof jobsTable.$inferSelect;
export type CandidateProp = typeof candidatePoolTable.$inferSelect;
