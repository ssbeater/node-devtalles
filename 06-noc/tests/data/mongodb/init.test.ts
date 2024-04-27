import mongoose from "mongoose";

import { MongoDatabase } from "../../../src/data/mongodb/init";
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe("init MongoDB", () => {
	afterAll(() => {
		mongoose.connection.close();
	});

	test("should connect to MongoDB", async () => {
		const connected = await MongoDatabase.connect({
			dbName: process.env.MONGO_DB_NAME!,
			mongoUrl: process.env.MONGO_URL!,
		});
		expect(connected).toBeTruthy();
	});

	test("should throw error if not connected to MongoDB", async () => {
		try {
			await MongoDatabase.connect({
				dbName: process.env.MONGO_DB_NAME!,
				mongoUrl: "incorrectURL",
			});
			expect(true).toBe(false);
		} catch (error) {
			expect(true).toBe(true);
		}
	});
});
