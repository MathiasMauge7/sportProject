CREATE TABLE IF NOT EXISTS "achats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client" uuid NOT NULL,
	"amount" real NOT NULL,
	"paymentMode" varchar NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promotions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"int" integer,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
DROP TABLE "achat";--> statement-breakpoint
DROP TABLE "promotion";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achats" ADD CONSTRAINT "achats_client_clients_id_fk" FOREIGN KEY ("client") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
