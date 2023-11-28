import fs from "node:fs";

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class LogFileSystem implements LogDataSource {
	private readonly logPath = "logs/";

	constructor() {
		this.createLogsFiles();
	}

	public async saveLog(log: LogEntity): Promise<void> {
		const logAllLevelPath = `${this.logPath}logs-all.log`;
		const logCustomLevelPath = `${this.logPath}logs-${log.level}.log`;

		fs.appendFileSync(logAllLevelPath, `${JSON.stringify(log)}\n`);
		fs.appendFileSync(logCustomLevelPath, `${JSON.stringify(log)}\n`);

		return Promise.resolve();
	}

	public async getLogs(severityLevel: LogSeverityLevel | undefined): Promise<LogEntity[]> {
		const logPath = severityLevel
			? `${this.logPath}logs-${severityLevel}.log`
			: `${this.logPath}logs-all.log`;

		const logs = fs.existsSync(logPath) ? this.getLogsFromFile(logPath) : [];

		return Promise.resolve(logs);
	}

	private createLogsFiles() {
		fs.existsSync(this.logPath) || fs.mkdirSync(this.logPath);

		fs.existsSync(`${this.logPath}logs-all.log`) ||
			fs.writeFileSync(`${this.logPath}logs-all.log`, "");

		Object.values(LogSeverityLevel).forEach((level) => {
			const logPath = `${this.logPath}logs-${level}.log`;
			fs.existsSync(logPath) || fs.writeFileSync(logPath, "");
		});
	}

	private getLogsFromFile(logPath: string): LogEntity[] {
		const content = fs.readFileSync(logPath, "utf-8");
		const logs = content.split("\n").map((log) => LogEntity.fromJSON(log));

		return logs;
	}
}
