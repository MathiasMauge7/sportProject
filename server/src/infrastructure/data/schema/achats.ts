import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  real,
  boolean,
} from "drizzle-orm/pg-core";
import { clients } from "./clients";
import { produits } from "./produits";

export const achats = pgTable("achats", {
  id: uuid("id").defaultRandom().primaryKey(), // pk
  client: uuid("client")
    .references(() => clients.id)
    .notNull(), // foreign key
  produit: uuid("produits")
    .references(() => produits.id)
    .notNull(), // foreign key
  amount: real("amount").notNull(),
  paymentMode: varchar("paymentMode").notNull(),
  isValid: boolean("isValid").default(false).notNull(),
  date: timestamp("date").defaultNow().notNull(),
});
