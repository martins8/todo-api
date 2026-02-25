import type { RouteShorthandOptions } from "fastify";

export const getTodosSchema: RouteShorthandOptions = {
	schema: {
		querystring: {
			type: "object",
			properties: {
				page: { type: "string", pattern: "^[0-9]+$" },
				limit: { type: "string", pattern: "^[0-9]+$" },
			},
			required: ["page", "limit"],
			additionalProperties: false,
		},
	},
};
