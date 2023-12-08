import { LogFileSystemDataSource } from "../infrastructure/datasources/log.file-system";
import { LogMongoDbDataSource } from "../infrastructure/datasources/log.mongodb";
import { LogPostgresDataSource } from "../infrastructure/datasources/log.postgres";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";

// const emailService = new EmailService();
const mongoLogRepository = new LogRepositoryImpl(new LogMongoDbDataSource());
const postgresLogRepository = new LogRepositoryImpl(new LogPostgresDataSource());
const fileSystemLogRepository = new LogRepositoryImpl(new LogFileSystemDataSource());

export class Server {
	// public static async start(): Promise<void> {
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

		// // *** Multiple logs ***
		// CronService.createJob("*/5 * * * * *", () => {
		// 	const url = "https://www.google.com";
		// 	// const url = "https://localhost:3000";
		// 	new CheckServiceMultiple([
		// 		mongoLogRepository,
		// 		postgresLogRepository,
		// 		fileSystemLogRepository,
		// 	]).execute(url);
		// });

		// const newLog = new LogEntity({
		// 	level: LogSeverityLevel.low,
		// 	message: "Test message using other data source",
		// 	origin: "app.ts",
		// });
		// await logRepository.saveLog(newLog);

		// const logs = await logRepository.getLogs(LogSeverityLevel.low);
		// console.log(logs);
	}
}
