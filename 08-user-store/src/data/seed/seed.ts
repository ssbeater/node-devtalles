import { envs } from "../../config";
import {
  CategoryModel,
  MongoDatabase,
  ProductModel,
  UserModel,
} from "../mongo";
import { seedData } from "./seed-data";

(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  await MongoDatabase.disconnect();
})();

const randomBetween0andX = (x: number) => Math.floor(Math.random() * x);

async function main() {
  console.log("Seeding database...");

  // Erease all data
  await Promise.all([
    ProductModel.deleteMany({}),
    CategoryModel.deleteMany({}),
    UserModel.deleteMany({}),
  ]);

  // Create users
  const users = await UserModel.insertMany(seedData.users);

  // Create categories
  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => ({
      ...category,
      user: users[randomBetween0andX(users.length - 1)]._id,
    }))
  );

  // Create products
  await ProductModel.insertMany(
    seedData.products.map((product) => ({
      ...product,
      user: users[randomBetween0andX(users.length - 1)]._id,
      category: categories[randomBetween0andX(categories.length)]._id,
    }))
  );
}
