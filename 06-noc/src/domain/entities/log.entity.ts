export enum LogSeverityLevel {
	low = "low",
	medium = "medium",
	high = "high",
}

export interface LogEntityOptions {
	level: LogSeverityLevel;
	message: string;
	origin: string;
	createdAt?: Date;
}

export class LogEntity {
	public level: LogSeverityLevel;
	public message: string;
	public origin: string;
	public createdAt: Date;

	constructor(options: LogEntityOptions) {
		const { level, message, origin, createdAt = new Date() } = options;
		this.level = level;
		this.message = message;
		this.origin = origin;
		this.createdAt = createdAt;
	}

	static fromJSON(json: string): LogEntity {
		const { message, level, origin, createdAt } = JSON.parse(json) as LogEntityOptions;

		const log = new LogEntity({
			message,
			level,
			origin,
			createdAt,
		});

		return log;
	}
}
