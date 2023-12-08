import { PrismaClient, SeverityLevel } from "@prisma/client";

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityEnum = {
	low: SeverityLevel.LOW,
	medium: SeverityLevel.MEDIUM,
	high: SeverityLevel.HIGH,
};

export class LogPostgresDataSource implements LogDataSource {
	async saveLog(log: LogEntity): Promise<void> {
		const level = severityEnum[log.level];

		const newLog = await prisma.logModel.create({
			data: {
				...log,
				level,
			},
		});
		console.log("Postgres Log created: ", newLog.id);
	}

	async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		const level = severityEnum[severityLevel];

		const logs = await prisma.logModel.findMany({
			where: {
				level,
			},
		});

		return logs.map((pgLog) => LogEntity.fromObject(pgLog));
	}
}
