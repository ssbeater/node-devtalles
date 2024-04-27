import { envs } from "../../../src/config/plugins/envs.plugin";

describe("envs.plugin", () => {
	test("shold return env option", () => {
		expect(envs).toEqual({
			PORT: 3000,
			PROD: false,
			MAILER_SERVICE: "gmail",
			MAILER_SECRET_KEY: "123456",
			MAILER_EMAIL: "gridman@gridman.com",
			MONGO_URL: "mongodb://gridman:123456789@localhost:27017",
			MONGO_DB_NAME: "noc_test",
			MONGO_USER: "gridman",
			MONGO_PASS: "123456789",
		});
	});

	test("should return error if not found env", async () => {
		jest.resetModules();
		process.env.PORT = "ABS";

		try {
			await import("../../../src/config/plugins/envs.plugin");
			expect(true).toBe(false);
		} catch (error) {
			expect(`${error as string}`).toContain('"PORT" should be a valid integer');
		}
	});
});
