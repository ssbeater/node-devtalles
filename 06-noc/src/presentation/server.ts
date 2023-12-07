// const emailService = new EmailService();
// const logRepository = new LogRepositoryImpl(new LogFileSystem());

export class Server {
	public static start(): void {
		console.log("Server started...");

		// new SendEmailLogs(emailService, logRepository).execute([
		// 	"santiagosuarez@fymtech.com",
		// 	"santiagosuarez.beater@outlook.com",
		// ]);

		// const emailService = new EmailService(logRepository);
		// emailService.sendEmailWithFileSystemLogs([
		// 	"santiagosuarez@fymtech.com",
		// 	"santiagosuarez.beater@outlook.com",
		// ]);

		// emailService.sendEmail({
		// 	to: "santiagosuarez@fymtech.com",
		// 	subject: "Test email service - NodeJS",
		// 	htmlBody: `
		// 		<h3>Test email service - NodeJS</h3>
		// 		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
		// 		<p>Watch logs</p>
		// 	`,
		// });

		// CronService.createJob("*/5 * * * * *", () => {
		// 	const url = "https://www.google.com";
		// 	// const url = "https://localhost:3000";
		// 	new CheckService(logRepository).execute(url);
		// });
	}
}
