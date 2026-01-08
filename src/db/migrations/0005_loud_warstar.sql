ALTER TABLE "candidate_pool" ALTER COLUMN "certifications" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "candidate_pool" ADD COLUMN "photo_link" text NOT NULL;--> statement-breakpoint
ALTER TABLE "candidate_pool" ADD COLUMN "photo_name" text NOT NULL;