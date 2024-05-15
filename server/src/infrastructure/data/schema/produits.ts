import { pgTable, uuid, varchar, timestamp, real, boolean} from "drizzle-orm/pg-core";

export const produits = pgTable('produits', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255}).notNull(),
    price: real('').notNull(),
    stock: boolean('boolean').notNull(),
    category: varchar('category', { length: 255}).notNull(),
    createdAt: timestamp('date').defaultNow().notNull()
})