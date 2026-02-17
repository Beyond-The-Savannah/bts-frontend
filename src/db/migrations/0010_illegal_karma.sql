ALTER TABLE "candidate_pool" ALTER COLUMN "resume_link" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "candidate_pool" ALTER COLUMN "resume_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "candidate_pool" ALTER COLUMN "photo_link" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "candidate_pool" ALTER COLUMN "photo_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "candidate_pool" ALTER COLUMN "country" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "candidate_pool" ALTER COLUMN "profession" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "candidate_pool" ALTER COLUMN "experience_years" DROP NOT NULL;