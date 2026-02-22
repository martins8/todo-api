import type { LoginUser, RegisterUser } from "@/models/users.models.js";
import client from "../_infra/db/index.js";
import {
	EmailAlreadyExistsError,
	InternalServerError,
	InvalidCredentialsError,
} from "../_infra/errors/errors.js";

export async function registerUser(user: RegisterUser): Promise<string> {
	const { email, password, name } = user;
	const id = crypto.randomUUID();
	try {
		// Check if email already exists
		const existing = await client.execute({
			sql: "SELECT id FROM users WHERE email = ?",
			args: [email],
		});
		if (existing.rows.length > 0) {
			throw new EmailAlreadyExistsError({});
		}

		await client.execute({
			sql: "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
			args: [id, name, email, password],
		});
		return crypto.randomUUID(); // Return a fake token for demonstration purposes
	} catch (error) {
		if (error instanceof EmailAlreadyExistsError) {
			throw error;
		}
		console.error("Error during registration:", error);
		throw new InternalServerError({ cause: error });
	}
}

export async function loginUser(user: LoginUser): Promise<string> {
	const { email, password } = user;
	try {
		const result = await client.execute({
			sql: "SELECT * FROM users WHERE email = ? AND password = ?",
			args: [email, password],
		});
		if (result.rows.length === 0) {
			throw new InvalidCredentialsError({});
		}

		return crypto.randomUUID(); // Return a fake token for demonstration purposes
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			throw error;
		}
		console.error("Error during login:", error);
		throw new InternalServerError({ cause: error });
	}
}
