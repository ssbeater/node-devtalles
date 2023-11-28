import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogFileSystem } from "../infrastructure/datasources/log.file-system";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";

const logRepository = new LogRepositoryImpl(new LogFileSystem());

export class Server {
	public static start(): void {
		console.log("Server started...");

		CronService.createJob("*/5 * * * * *", () => {
			const url = "https://www.google.com";
			// const url = "https://localhost:3000";
			new CheckService(logRepository).execute(url);
		});
	}
}
