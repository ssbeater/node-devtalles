import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
	constructor(private readonly logDataSource: LogDataSource) {}

	async saveLog(log: LogEntity): Promise<void> {
		await this.logDataSource.saveLog(log);
	}

	async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		const logs = await this.logDataSource.getLogs(severityLevel);

		return Promise.resolve(logs);
	}
}
