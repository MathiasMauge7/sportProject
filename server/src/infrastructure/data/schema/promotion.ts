import { pgTable, uuid, varchar, timestamp, integer} from "drizzle-orm/pg-core";

export const promotion = pgTable('promotion', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255}).notNull(),
    pourcent: integer('int'),
    createdAt: timestamp('date').defaultNow().notNull(),
    endingAt: timestamp('date').notNull()
})