import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { CheckServiceMultiple } from "../../../../src/domain/use-cases/checks/check-service-multiple";

describe("Check service multiple use case", () => {
	const logRepositoryA = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	};
	const logRepositoryB = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	};
	const successCallback = jest.fn();
	const errorCallback = jest.fn();

	const checkService = new CheckServiceMultiple(
		[logRepositoryA, logRepositoryB],
		successCallback,
		errorCallback,
	);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should call success callback when fetch returns true", async () => {
		const wasOk = await checkService.execute("http://google.com");

		expect(wasOk).toBe(true);
		expect(successCallback).toHaveBeenCalled();
		expect(errorCallback).not.toHaveBeenCalled();

		expect(logRepositoryA.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
		expect(logRepositoryB.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
	});
	test("should call error callback when fetch fails", async () => {
		const wasOk = await checkService.execute("http://otnehrm,..com");

		expect(wasOk).toBe(false);
		expect(successCallback).not.toHaveBeenCalled();
		expect(errorCallback).toHaveBeenCalled();

		expect(logRepositoryA.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
		expect(logRepositoryB.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
	});
});
