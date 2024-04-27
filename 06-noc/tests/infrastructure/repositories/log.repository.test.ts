import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";
import { LogRepositoryImpl } from "../../../src/infrastructure/repositories/log.repository";

describe("Log Repository implementation", () => {
	const mockLogDataSource = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	};

	const log = new LogEntity({
		level: LogSeverityLevel.low,
		message: "test",
		origin: "test",
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("saveLog should call the datasource", async () => {
		const logRepository = new LogRepositoryImpl(mockLogDataSource);
		await logRepository.saveLog(log);
		expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
	});

	test("getLogs should call the datasource", async () => {
		const logRepository = new LogRepositoryImpl(mockLogDataSource);
		await logRepository.getLogs(LogSeverityLevel.low);
		expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
	});
});
