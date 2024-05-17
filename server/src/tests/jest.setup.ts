import { beforeAll, afterAll } from "@jest/globals";
import { db, pool } from "../infrastructure/data";

import { sql } from "drizzle-orm";

import { migrate } from "drizzle-orm/node-postgres/migrator";
import { clients } from "../infrastructure/data/schema";

export let createdClient: {
  id: string;
  name: string;
  firstName: string;
  phone: string;
  createdAt: Date;
} = {
  id: "",
  name: "",
  firstName: "",
  phone: "",
  createdAt: new Date(),
};

beforeAll(async () => {
  try {
    console.log("Setting up test environment...");
    await db.execute(sql`CREATE SCHEMA IF NOT EXISTS test`);
    await db.execute(sql`SET search_path TO test`);

    await migrate(db, {
      migrationsFolder: "src/infrastructure/data/drizzle",
      migrationsSchema: "test",
    });
    console.log("Migrations applied.");

    const result = await db
      .insert(clients)
      .values({
        id: "testclientid",
        name: "testclientname",
        firstName: "testclientfirstname",
        phone: "0656523545",
        createdAt: new Date("2024-01-05"),
      })
      .returning()
      .execute();

    createdClient = {
      id: result[0].id,
      name: result[0].name,
      firstName: result[0].firstName,
      phone: result[0].phone,
      createdAt: result[0].createdAt,
    };
    console.log("Test client created:", createdClient);
  } catch (error) {
    console.error("Error during beforeAll:", error);
  }
});

afterAll(async () => {
  try {
    // await db.execute(sql`DROP SCHEMA IF EXISTS test CASCADE`);
    await pool.end();
  } catch (error) {
    console.error("Error during afterAll:", error);
  }
});
