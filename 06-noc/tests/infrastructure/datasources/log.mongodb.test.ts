import mongoose from "mongoose";

import { envs } from "../../../src/config/plugins/envs.plugin";
import { LogModel } from "../../../src/data/mongodb";
import { MongoDatabase } from "../../../src/data/mongodb/init";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";
import { LogMongoDbDataSource } from "../../../src/infrastructure/datasources/log.mongodb";

describe("Mongo Log Datasource", () => {
	const logDataSource = new LogMongoDbDataSource();

	const log = new LogEntity({
		level: LogSeverityLevel.medium,
		origin: "test",
		message: "test",
	});

	beforeAll(async () => {
		await MongoDatabase.connect({
			dbName: envs.MONGO_DB_NAME,
			mongoUrl: envs.MONGO_URL,
		});
	});

	afterEach(async () => {
		await LogModel.deleteMany();
	});

	afterAll(() => {
		mongoose.connection.close();
	});

	test("should create a log", async () => {
		const logSpy = jest.spyOn(console, "log");

		await logDataSource.saveLog(log);
		expect(logSpy).toHaveBeenCalled();
		expect(logSpy).toHaveBeenCalledWith("Mongo Log created: ", expect.any(String));
	});

	test("should get logs", async () => {
		await logDataSource.saveLog(log);

		const logs = await logDataSource.getLogs(LogSeverityLevel.medium);

		expect(logs.length).toBe(1);
		expect(logs[0].level).toBe(LogSeverityLevel.medium);
	});
});
