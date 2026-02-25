import type { RouteShorthandOptions } from "fastify";
export const createTodoSchema: RouteShorthandOptions = {
	schema: {
		headers: {
			type: "object",
			pattern: "^Bearer\\s.+$",
			properties: {
				Authorization: { type: "string" },
			},
			required: ["Authorization"],
			additionalProperties: false,
		},
		body: {
			type: "object",
			properties: {
				title: { type: "string" },
				description: { type: "string" },
			},
			required: ["title", "description"],
		},
		response: {
			201: {
				type: "object",
				properties: {
					id: { type: "number" },
					title: { type: "string" },
					description: { type: "string" },
				},
			},
			401: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
			403: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
};
