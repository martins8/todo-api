import { afterAll, beforeAll, describe, expect, it } from "vitest";
import client from "@/db/index.js";
import { createTables, dropTables } from "@/db/tables.js";

beforeAll(async () => {
	await dropTables();
	await createTables();
});

afterAll(async () => {
	await client.close();
});

describe("DATABASE CONNECTION", () => {
	it("should connect to the database successfully", async () => {
		const result = await client.execute("SELECT 1");
		expect(result).toBeDefined();
	});
});

describe("DATABASE TABLES", () => {
	it("should have the users table created", async () => {
		const result = await client.execute(
			"SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
		);
		const tables = result.rows.map((row) => row[0]);
		expect(tables).toContain("users");
	});
});

describe("DATABASE OPERATIONS", () => {
	it("should insert a user successfully", async () => {
		const id = crypto.randomUUID();
		await client.execute({
			sql: "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
			args: [id, "Test User", "test@example.com", "123456"],
		});

		const result = await client.execute({
			sql: "SELECT * FROM users WHERE email = ?",
			args: ["test@example.com"],
		});

		expect(result.rows.length).toBe(1);
		expect(result.rows[0][1]).toBe("Test User"); // coluna name
	});

	it("should fail to find a non-existing user", async () => {
		const result = await client.execute({
			sql: "SELECT * FROM users WHERE email = ?",
			args: ["notfound@example.com"],
		});

		expect(result.rows.length).toBe(0);
	});
});
