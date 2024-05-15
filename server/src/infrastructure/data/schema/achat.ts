import { pgTable, uuid, varchar, timestamp, real} from "drizzle-orm/pg-core";
import { clients } from "./clients";
import { produits } from "./produits";

export const achat = pgTable('achat', {
    id: uuid('id').defaultRandom().primaryKey(), // pk
    clientId: uuid('clientId').references(() => clients.id).notNull(), // foreign key
    amount: real('').notNull(),
    paymentMode: varchar('paymentMode').notNull(),
    date: timestamp('date').defaultNow().notNull()
})