import client from "./index.js";

export const userTableSchema = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)
`;

export async function createTables() {
	try {
		await client.execute(userTableSchema);
		console.log("User table created successfully.");
	} catch (error) {
		console.error("Error creating user table:", error);
	}
}

export async function dropTables() {
	try {
		await client.execute("DROP TABLE IF EXISTS users");
		console.log("User table dropped successfully.");
	} catch (error) {
		console.error("Error dropping user table:", error);
	}
}
