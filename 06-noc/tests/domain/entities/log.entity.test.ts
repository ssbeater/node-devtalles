import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";

describe("log.entity", () => {
	const dataObj = {
		message: "test",
		origin: "test",
		level: LogSeverityLevel.high,
	};

	test("should create a log entity instance", () => {
		const log = new LogEntity(dataObj);

		expect(log).toBeInstanceOf(LogEntity);
		expect(log.message).toBe(dataObj.message);
		expect(log.origin).toBe(dataObj.origin);
		expect(log.level).toBe(dataObj.level);
		expect(log.createdAt).toBeInstanceOf(Date);
	});

	test("should create a log entity from a JSON", () => {
		const jsonObject =
			'{"level":"high","message":"test","origin":"test","createdAt":"2024-04-27T15:30:59.262Z"}';

		const log = LogEntity.fromJSON(jsonObject);

		expect(log).toBeInstanceOf(LogEntity);
		expect(log.message).toBe("test");
		expect(log.origin).toBe("test");
		expect(log.level).toBe(LogSeverityLevel.high);
		expect(log.createdAt).toBeInstanceOf(Date);
	});

	test("should create a log entity from an object", () => {
		const log = LogEntity.fromObject(dataObj);

		expect(log).toBeInstanceOf(LogEntity);
		expect(log.message).toBe("test");
		expect(log.origin).toBe("test");
		expect(log.level).toBe(LogSeverityLevel.high);
		expect(log.createdAt).toBeInstanceOf(Date);
	});
});
