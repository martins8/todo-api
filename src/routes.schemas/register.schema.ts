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
