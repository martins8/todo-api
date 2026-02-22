import type { RouteShorthandOptions } from "fastify";

export const loginRouteSchema: RouteShorthandOptions = {
	schema: {
		body: {
			type: "object",
			properties: {
				email: { type: "string" },
				password: { type: "string" },
			},
			required: ["email", "password"],
			additionalProperties: false,
		},
		response: {
			200: {
				type: "object",
				properties: {
					success: { type: "string" },
					token: { type: "string" },
				},
			},
			401: {
				type: "object",
				properties: {
					name: { type: "string" },
					message: { type: "string" },
					action: { type: "string" },
					statusCode: { type: "number" },
				},
			},
			500: {
				type: "object",
				properties: {
					name: { type: "string" },
					message: { type: "string" },
					action: { type: "string" },
					statusCode: { type: "number" },
				},
			},
		},
	},
};
