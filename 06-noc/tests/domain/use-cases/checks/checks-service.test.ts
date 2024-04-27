import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { CheckService } from "../../../../src/domain/use-cases/checks/check-service";

describe("Check service use case", () => {
	const logRepository = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	};
	const successCallback = jest.fn();
	const errorCallback = jest.fn();

	const checkService = new CheckService(logRepository, successCallback, errorCallback);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should call success callback when fetch returns true", async () => {
		const wasOk = await checkService.execute("http://google.com");

		expect(wasOk).toBe(true);
		expect(successCallback).toHaveBeenCalled();
		expect(errorCallback).not.toHaveBeenCalled();

		expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
	});
	test("should call error callback when fetch fails", async () => {
		const wasOk = await checkService.execute("http://otnehrm,..com");

		expect(wasOk).toBe(false);
		expect(successCallback).not.toHaveBeenCalled();
		expect(errorCallback).toHaveBeenCalled();

		expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
	});
});
