import { describe, expect, it } from "vitest";

describe("INITIALIZE SERVER", () => {
	it("should work", async () => {
		await fetch("http://localhost:3000/ping")
			.then((response) => response.json())
			.then((data) => {
				expect(data).toEqual({ pong: "it worked!" });
			});
	});
});
