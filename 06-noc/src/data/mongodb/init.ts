import mongoose from "mongoose";

interface ConnectionOptions {
	mongoUrl: string;
	dbName: string;
}

export class MongoDatabase {
	static async connect(options: ConnectionOptions): Promise<boolean> {
		const { mongoUrl, dbName } = options;

		// eslint-disable-next-line no-useless-catch
		try {
			await mongoose.connect(mongoUrl, {
				dbName,
			});

			return true;
		} catch (error) {
			throw error;
		}
	}
}
