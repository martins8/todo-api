import type { RouteShorthandOptions } from "fastify";
export const deleteTodoSchema: RouteShorthandOptions = {
	schema: {
		headers: {
			type: "object",

			properties: {
				Authorization: { type: "string", pattern: "^Bearer\\s.+$" },
			},
			required: ["Authorization"],
			additionalProperties: false,
		},
		params: {
			id: { type: "string" },
		},
	},
};
