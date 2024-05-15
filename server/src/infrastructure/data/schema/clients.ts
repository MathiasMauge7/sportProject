import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const clients = pgTable('clients', {
    id: uuid('id').defaultRandom().primaryKey(),
    // varchar 255
    name: varchar('name', { length: 255}).notNull(),
    firstName: varchar('firstName', { length: 255}).notNull(),
    phone: varchar('phone', { length: 50}).notNull(),
    createdAt: timestamp('date').defaultNow().notNull()
})