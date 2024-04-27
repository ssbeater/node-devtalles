/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */

import { LogDataSource } from "../../../src/domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";

describe("log.datasource", () => {
	const newLog = new LogEntity({
		origin: "test",
		message: "test",
		level: LogSeverityLevel.low,
	});

	class MockLogDatasource implements LogDataSource {
		async saveLog(log: LogEntity): Promise<void> {
			return;
		}

		async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
			return [newLog];
		}
	}

	test("should test the abstract clas", async () => {
		const mockLogDatasource = new MockLogDatasource();

		expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
		expect(typeof mockLogDatasource.saveLog).toBe("function");
		expect(typeof mockLogDatasource.getLogs).toBe("function");

		await mockLogDatasource.saveLog(newLog);
		const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);
		expect(logs).toHaveLength(1);
		expect(logs[0]).toBeInstanceOf(LogEntity);
	});
});
