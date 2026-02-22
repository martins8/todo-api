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
		},
		response: {
			200: {
				type: "object",
				properties: {
					success: { type: "string" },
					token: { type: "string" },
				},
			},
			400: {
				type: "object",
				properties: {
					error: { type: "string" },
				},
			},
			401: {
				type: "object",
				properties: {
					error: { type: "string" },
				},
			},
			403: {
				type: "object",
				properties: {
					error: { type: "string" },
				},
			},
			500: {
				type: "object",
				properties: {
					error: { type: "string" },
				},
			},
		},
	},
};
