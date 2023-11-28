export enum LogSeverityLevel {
	low = "low",
	medium = "medium",
	high = "high",
}

export class LogEntity {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;

	constructor(message: string, level: LogSeverityLevel) {
		this.level = level;
		this.message = message;
		this.createdAt = new Date();
	}

	static fromJSON(json: string): LogEntity {
		const { message, level, createdAt } = JSON.parse(json) as {
			message: string;
			level: LogSeverityLevel;
			createdAt: string;
		};

		const log = new LogEntity(message, level);
		log.createdAt = new Date(createdAt);

		return log;
	}
}
