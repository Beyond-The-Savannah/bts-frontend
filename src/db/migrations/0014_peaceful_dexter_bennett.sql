CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"subscription_transaction_reference" varchar,
	"subcription_tier_name" varchar,
	"subcription_tier_type" varchar,
	"subscription_price" numeric,
	"subscription_status" text,
	"subscription_canceled_at" timestamp,
	"subscription_start_date" timestamp,
	"subscription_end_date" timestamp,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"updated_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar,
	"last_name" varchar,
	"email_address" varchar,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"updated_date" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;