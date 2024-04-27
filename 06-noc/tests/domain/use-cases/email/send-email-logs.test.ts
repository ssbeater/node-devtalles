/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { SendEmailLogs } from "../../../../src/domain/use-cases/email/send-email-logs";

describe("Send email logs use case", () => {
	const mockEmailService = {
		sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
	};

	const mockLogRepository = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	};

	const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should send email with logs", async () => {
		const result = await sendEmailLogs.execute("gridman@gridman.com");

		expect(result).toBeTruthy();
		expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
		expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
	});

	test("should log in case of error", async () => {
		mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);

		const result = await sendEmailLogs.execute("gridman@gridman.com");

		expect(result).not.toBeTruthy();
		expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
		expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
	});
});
