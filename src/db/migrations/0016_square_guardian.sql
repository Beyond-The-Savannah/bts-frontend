CREATE TABLE "accountSettings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"career_email_notification" numeric,
	"accept_email_notification" boolean,
	"delete_account" boolean,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"updated_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "candidatesProfiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"profession" varchar(50),
	"years_of_experience" numeric,
	"linkedin_url" varchar(256),
	"phone_number" varchar(50),
	"country" varchar(50),
	"industries_worked" text,
	"work_experience" text,
	"certifications" text,
	"resume_name" varchar(256),
	"resume_url" varchar(256),
	"file_key" varchar(256),
	"bts_approved_status" varchar(50),
	"open_to_work" varchar(50),
	"created_date" timestamp DEFAULT now() NOT NULL,
	"updated_date" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "subscription_payment_channel" varchar;--> statement-breakpoint
ALTER TABLE "accountSettings" ADD CONSTRAINT "accountSettings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidatesProfiles" ADD CONSTRAINT "candidatesProfiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;