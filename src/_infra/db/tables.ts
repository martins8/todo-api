import client from "./index.js";

export const userTableSchema = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)
`;

export const todosTableSchema = `
CREATE TABLE IF NOT EXISTS todos (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
description TEXT NOT NULL
)`;

export async function createTables() {
	try {
		await client.execute(userTableSchema);
		await client.execute(todosTableSchema);
	} catch (error) {
		console.error("Error creating tables:", error);
	}
}

export async function dropTables() {
	try {
		await client.execute("DROP TABLE IF EXISTS users");
		await client.execute("DROP TABLE IF EXISTS todos");
	} catch (error) {
		console.error("Error dropping tables:", error);
	}
}
