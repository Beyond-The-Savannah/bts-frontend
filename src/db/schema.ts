
import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  decimal,
  numeric,
  boolean,
  // customType,
} from "drizzle-orm/pg-core";

// const bytea = customType<{ data: Buffer }>({
//   dataType() {
//     return "bytea";
//   },
  
// });
// const bytea = customType<{ data: Buffer; driverData: Buffer }>({
//   dataType() {
//     return 'bytea';
//   },
//   toDriver(value: Buffer): Buffer {
//     return value;
//   },
// });

export const jobsTable = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyName: text("company_name").notNull(),
  companyOrganizationId: text("company_organization_id").notNull(),
  companyLogo: text("company_logo").notNull(),
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
  companyLogo:text("company_logo").notNull(),
  // teamMembers: text("team_members").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const candidatePoolTable = pgTable("candidate_pool", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  linkedInLink:text("linked_in_link"),
  resumeLink: text("resume_link"),
  resumeName: text("resume_name"),
  photoLink: text("photo_link"),
  photoName:text("photo_name"),
  country: text("country"),
  profession: text("profession"),
  experienceYears: integer("experience_years"),
  certifications: text("certifications"),
  industries: text("industries"),
  workExperience: text("work_experience"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});


export const eventsTable= pgTable("events", {
  id:uuid("id").primaryKey().defaultRandom(),
  eventName:text("event_name").notNull(),
  firstName:text("first_name").notNull(),
  lastName:text("last_name").notNull(),
  email:text("email").notNull(),
  phoneNumber:text("phone_number").notNull(),
  createdAt:timestamp("created_at").notNull().defaultNow(),
  updatedAt:timestamp("updated_at").notNull().$onUpdate(()=> new Date())

})

export const usersTable=pgTable("users", {
  id:uuid("id").primaryKey().defaultRandom(),
  firstName:varchar("first_name"),
  lastName:varchar("last_name"),
  emailAddress:varchar("email_address").unique(),
  createdDate:timestamp("created_date").notNull().defaultNow(),
  updatedDate:timestamp("updated_date").notNull().$onUpdate(()=>new Date())
})
export const subscriptionsTable=pgTable("subscriptions", {
  id:uuid("id").primaryKey().defaultRandom(),
  userId:uuid("user_id").notNull().references(()=>usersTable.id,{onDelete:"no action"}),
  subscriptionTransactionReference:varchar("subscription_transaction_reference"),
  subcriptionTierName:varchar("subcription_tier_name"),
  subcriptionTierType:varchar("subcription_tier_type"),
  subscriptionPrice:decimal("subscription_price"),
  subscriptionStatus:text("subscription_status"),
  subscriptionCanceledAt:timestamp("subscription_canceled_at"),
  subscriptionStartDate:timestamp("subscription_start_date"),
  subscriptionEndDate:timestamp("subscription_end_date"),
  subscriptionPaymentChannel:varchar("subscription_payment_channel"),
  createdDate:timestamp("created_date").notNull().defaultNow(),
  updatedDate:timestamp("updated_date").notNull().$onUpdate(()=>new Date())
})
export const candidatesProfileTable=pgTable("candidatesProfiles",{
  id:uuid("id").primaryKey().defaultRandom(),
  userId:uuid("user_id").notNull().unique().references(()=>usersTable.id,{onDelete:"no action"}),
  profession:varchar("profession",{length:50}),
  yearsOfExperience:numeric("years_of_experience"),
  linkedinUrl:varchar("linkedin_url",{length:256}),
  phoneNumber:varchar("phone_number",{length:50}),
  country:varchar("country",{length:50}),
  industriesWorked:text("industries_worked"),
  workExperience:text("work_experience"),
  certifications:text("certifications"),
  resumeName:varchar("resume_name",{length:256}),
  resumeUrl:varchar("resume_url",{length:256}),
  fileKey:varchar("file_key",{length:256}),
  btsApprovedStatus:varchar("bts_approved_status",{length:50}),
  openToWork:varchar("open_to_work",{length:50}),
  createdDate:timestamp("created_date").notNull().defaultNow(),
  updatedDate:timestamp("updated_date").notNull().$onUpdate(()=>new Date())

})
export const accountSettingsTable=pgTable("accountSettings",{
  id:uuid("id").primaryKey().defaultRandom(),
  userId:uuid("user_id").notNull().references(()=>usersTable.id,{onDelete:"no action"}),
  careerEmailNotification:numeric("career_email_notification"),
  acceptEmailNotification:boolean("accept_email_notification").default(true),
  deleteAccount:boolean("delete_account").default(false),
  createdDate:timestamp("created_date").notNull().defaultNow(),
  updatedDate:timestamp("updated_date").notNull().$onUpdate(()=>new Date())

})

export const usersRelations=relations(usersTable,({many,one})=>({
  subscriptions: many(subscriptionsTable),
  candidatesProfiles:one(candidatesProfileTable, {fields:[usersTable.id],references:[candidatesProfileTable.userId]}),
  accountSettings:one(accountSettingsTable,{fields:[usersTable.id],references:[accountSettingsTable.userId]}),
}))
export const subscriptionsRelations=relations(subscriptionsTable, ({one})=>({user:one(usersTable,{fields:[subscriptionsTable.userId],references:[usersTable.id]})}))

export const candidateProfileRelations=relations(candidatesProfileTable,({one})=>({user:one(usersTable,{fields:[candidatesProfileTable.userId],references:[usersTable.id]})}))

export const accountSettingsRelations=relations(accountSettingsTable,({one})=>({user:one(usersTable,{fields:[accountSettingsTable.userId],references:[usersTable.id]})}))

export type JobsProp = typeof jobsTable.$inferSelect;
export type CandidateProp = typeof candidatePoolTable.$inferSelect;
export type CompanyProp= typeof companyTable.$inferSelect;
export type EventsProp= typeof eventsTable.$inferSelect;
export type usersProp=typeof usersTable.$inferSelect;
export type subscriptionsProp=typeof subscriptionsTable.$inferSelect
export type candidateProfileProp= typeof candidatesProfileTable.$inferSelect
export type accountSettingsProp=typeof accountSettingsTable.$inferSelect
