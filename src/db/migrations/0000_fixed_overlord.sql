CREATE TABLE "candidate_pool" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"resume_link" text NOT NULL,
	"resume_name" text NOT NULL,
	"country" text NOT NULL,
	"profession" text NOT NULL,
	"experience_years" integer NOT NULL,
	"certifications" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "candidate_pool_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "company" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	"team_members" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"role" text NOT NULL,
	"work_mode" text NOT NULL,
	"job_type" text NOT NULL,
	"department" text NOT NULL,
	"author" text NOT NULL,
	"dead_line" text NOT NULL,
	"job_details" text NOT NULL,
	"application_Link" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
