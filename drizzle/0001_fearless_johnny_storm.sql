ALTER TABLE "user" ADD COLUMN "token" text;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_token_unique" UNIQUE("token");