/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import nodemailer from "nodemailer";

import { EmailService, SendMailOptions } from "../../../src/presentation/email/email-service";

describe("Email Service", () => {
	const mockSendMail = jest.fn();
	nodemailer.createTransport = jest.fn().mockReturnValue({ sendMail: mockSendMail });

	const emailService = new EmailService();

	test("Should send email", async () => {
		const options: SendMailOptions = {
			to: "gridman@gridman.com",
			subject: "Test email",
			htmlBody: "<h1>Test email</h1>",
		};

		await emailService.sendEmail(options);

		expect(mockSendMail).toHaveBeenCalledWith({
			attachments: expect.any(Array),
			to: "gridman@gridman.com",
			subject: "Test email",
			html: "<h1>Test email</h1>",
		});
	});

	test("should send email with attachments", async () => {
		await emailService.sendEmailWithFileSystemLogs("gridman@gridman.com");

		expect(mockSendMail).toHaveBeenCalledWith({
			to: "gridman@gridman.com",
			subject: "Sever logs",
			html: expect.any(String),
			attachments: expect.any(Array),
		});
	});
});
