import { pgTable, uuid, varchar, timestamp, real} from "drizzle-orm/pg-core";
import { clients } from "./clients";

export const achats = pgTable('achats', {
    id: uuid('id').defaultRandom().primaryKey(), // pk
    client: uuid('client').references(() => clients.id).notNull(), // foreign key
    amount: real('amount').notNull(),
    paymentMode: varchar('paymentMode').notNull(),
    date: timestamp('date').defaultNow().notNull()
})