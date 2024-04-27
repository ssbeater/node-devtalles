import { createTransport } from "nodemailer";

import { envs } from "../../config/plugins/envs.plugin";

interface Attachement {
	filename: string;
	path: string;
}

export interface SendMailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachement[];
}

export class EmailService {
	private readonly transporter = createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_EMAIL,
			pass: envs.MAILER_SECRET_KEY,
		},
	});

	async sendEmail(options: SendMailOptions): Promise<boolean> {
		const { to, subject, htmlBody, attachments = [] } = options;

		try {
			// const sentInformation =
			await this.transporter.sendMail({
				to,
				subject,
				html: htmlBody,
				attachments,
			});

			return true;
		} catch (error) {
			return false;
		}
	}

	async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
		const subject = "Sever logs";
		const htmlBody = `
      <h2>Server logs</h2>
      <p>Watch logs</p>
    `;
		const attachments: Attachement[] = [{ filename: "logs-all.txt", path: "./logs/logs-all.log" }];

		return await this.sendEmail({ to, subject, htmlBody, attachments });
	}
}
