export interface SerializableError {
	name: string;
	message: string;
	action: string;
	statusCode: number;
}

export abstract class AppError extends Error {
	public readonly name: string;
	public readonly action: string;
	public readonly statusCode: number;

	constructor(
		message: string,
		name: string,
		action: string,
		statusCode: number,
		cause?: unknown,
	) {
		super(message, { cause });
		this.name = name;
		this.action = action;
		this.statusCode = statusCode;
	}

	toJSON(): SerializableError {
		return {
			name: this.name,
			message: this.message,
			action: this.action,
			statusCode: this.statusCode,
		};
	}
}
