import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongodb";
import { Server } from "./presentation/server";

(() => {
	main();
})();

async function main() {
	await MongoDatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME,
	});

	// const newLog = await prisma.logModel.create({
	// 	data: {
	// 		level: "HIGH",
	// 		message: "Test message",
	// 		origin: "app.ts",
	// 	},
	// });
	// console.log(newLog);

	// const logs = await prisma.logModel.findMany({
	// 	where: {
	// 		level: "MEDIUM",
	// 	},
	// });
	// console.log(logs);

	Server.start();
}
