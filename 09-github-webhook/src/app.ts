import express, { json } from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";
import { DiscordService, GithubService } from "./presentation/services";

(() => {
  main();
})();

function main() {
  const app = express();
  app.use(json());

  const githubService = new GithubService();
  const discordService = new DiscordService();
  const controller = new GithubController(githubService, discordService);

  app.post("/api/github", controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
  });
}
