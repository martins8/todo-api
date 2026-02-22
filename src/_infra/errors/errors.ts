import { AppError } from "./AppError.js";
export class InternalServerError extends AppError {
	constructor({ cause }: { cause?: unknown }) {
		super(
			"An internal server error occurred",
			"InternalServerError",
			"contact support",
			500,
			cause,
		);
	}
}

export class BadRequestError extends AppError {
	constructor({ cause }: { cause?: unknown }) {
		super(
			"Bad request",
			"BadRequestError",
			"check your request and try again",
			400,
			cause,
		);
	}
}

export class EmailAlreadyExistsError extends AppError {
	constructor({ cause }: { cause?: unknown }) {
		super(
			"Email already exists",
			"EmailAlreadyExistsError",
			"use a different email",
			409,
			cause,
		);
	}
}

export class InvalidCredentialsError extends AppError {
	constructor({ cause }: { cause?: unknown }) {
		super(
			"Invalid credentials",
			"InvalidCredentialsError",
			"check your credentials and try again",
			401,
			cause,
		);
	}
}
