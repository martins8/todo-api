import client from "../db/index.js";
import type { LoginUser, RegisterUser } from "../types/index.js";

export type Error =
	| "EMAIL_ALREADY_EXISTS"
	| "INVALID_CREDENTIALS"
	| "DATABASE_ERROR";

export async function registerUser(
	user: RegisterUser,
): Promise<string | Error> {
	const { email, password, name } = user;
	const id = crypto.randomUUID();
	try {
		await client.execute({
			sql: "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
			args: [id, name, email, password],
		});
		return crypto.randomUUID(); // Return a fake token for demonstration purposes
	} catch (error) {
		if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
			return "EMAIL_ALREADY_EXISTS";
		}
		console.error("Error during registration:", error);
		return "DATABASE_ERROR";
	}
}

export async function loginUser(user: LoginUser): Promise<string | Error> {
	const { email, password } = user;
	try {
		const result = await client.execute({
			sql: "SELECT * FROM users WHERE email = ? AND password = ?",
			args: [email, password],
		});
		if (result.rows.length === 0) {
			return "INVALID_CREDENTIALS";
		}

		return crypto.randomUUID(); // Return a fake token for demonstration purposes
	} catch (error) {
		if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
			return "INVALID_CREDENTIALS";
		}
		console.error("Error during login:", error);
		return "DATABASE_ERROR";
	}
}
