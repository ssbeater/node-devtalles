import fs from "node:fs";
import path from "node:path";

import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";
import { LogFileSystemDataSource } from "../../../src/infrastructure/datasources/log.file-system";

describe("File system Data source", () => {
	const logPath = path.join(__dirname, "../../../logs");

	beforeAll(() => {
		fs.rmSync(logPath, { recursive: true, force: true });
	});

	beforeEach(() => {
		fs.rmSync(logPath, { recursive: true, force: true });
	});

	test("should create log files if they do not exist", () => {
		new LogFileSystemDataSource();
		const files = fs.readdirSync(logPath);
		expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-low.log", "logs-medium.log"]);
	});

	test("should save a log in all logs file", () => {
		const logDataSource = new LogFileSystemDataSource();
		const log = new LogEntity({
			level: LogSeverityLevel.low,
			message: "test",
			origin: "test",
		});

		logDataSource.saveLog(log);

		const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
		expect(allLogs).toContain(JSON.stringify(log));
	});

	test("should save a log in all logs file an₫ medium", () => {
		const logDataSource = new LogFileSystemDataSource();
		const log = new LogEntity({
			level: LogSeverityLevel.medium,
			message: "test",
			origin: "test",
		});

		logDataSource.saveLog(log);

		const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
		const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");

		expect(allLogs).toContain(JSON.stringify(log));
		expect(mediumLogs).toContain(JSON.stringify(log));
	});

	test("should save a log in all logs file an₫ high file", () => {
		const logDataSource = new LogFileSystemDataSource();
		const log = new LogEntity({
			level: LogSeverityLevel.high,
			message: "test",
			origin: "test",
		});

		logDataSource.saveLog(log);

		const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
		const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");

		expect(allLogs).toContain(JSON.stringify(log));
		expect(highLogs).toContain(JSON.stringify(log));
	});

	test("should return all logs", async () => {
		const logDataSource = new LogFileSystemDataSource();

		const logHigh = new LogEntity({
			level: LogSeverityLevel.high,
			message: "test-high",
			origin: "test-high",
		});
		const logLow = new LogEntity({
			level: LogSeverityLevel.low,
			message: "test-low",
			origin: "test-low",
		});
		const logMedium = new LogEntity({
			level: LogSeverityLevel.medium,
			message: "test-medium",
			origin: "test-medium",
		});

		logDataSource.saveLog(logHigh);
		logDataSource.saveLog(logMedium);
		logDataSource.saveLog(logLow);

		const logs = await logDataSource.getLogs(undefined);
		const lowLogs = await logDataSource.getLogs(LogSeverityLevel.low);
		const mediumLogs = await logDataSource.getLogs(LogSeverityLevel.medium);
		const highLogs = await logDataSource.getLogs(LogSeverityLevel.high);

		expect(logs).toEqual([logHigh, logMedium, logLow]);
		expect(lowLogs).toEqual([logLow]);
		expect(mediumLogs).toEqual([logMedium]);
		expect(highLogs).toEqual([logHigh]);
	});
});
