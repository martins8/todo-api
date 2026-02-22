import type { RouteShorthandOptions } from "fastify";
export const registerRouteSchema: RouteShorthandOptions = {
	schema: {
		body: {
			type: "object",
			properties: {
				name: { type: "string" },
				email: { type: "string" },
				password: { type: "string" },
			},
			required: ["name", "email", "password"],
		},
		response: {
			201: {
				type: "object",
				properties: {
					success: { type: "string" },
					token: { type: "string" },
				},
			},
			409: {
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
