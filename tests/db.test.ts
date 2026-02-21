import { afterAll, beforeAll, describe, it } from "vitest";
import client from "@/db/index.js";
import { createTables, dropTables } from "@/db/tables.js";

beforeAll(async () => {
	await dropTables();
	await createTables();
});

afterAll(async () => {
	await client.close();
});

describe("TEST DB CONNECTION", () => {
	it("should connect to the database successfully", async () => {
		try {
			await client.execute("SELECT 1");
			console.log("Database connection successful.");
		} catch (error) {
			throw new Error("Failed to connect to the database", { cause: error });
		}
	});
});

describe("TEST DB TABLES", () => {
	it("should have the users table created", async () => {
		try {
			const result = await client.execute(
				"SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
			);
			const tables = result.rows.map((row) => row[0]);
			if (tables.includes("users")) {
				console.log("Users table exists.");
			} else {
				throw new Error("Users table does not exist.");
			}
		} catch (error) {
			throw new Error("Failed to verify users table", { cause: error });
		}
	});
});
