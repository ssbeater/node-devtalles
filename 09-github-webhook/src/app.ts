import express, { json } from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";
import { DiscordService, GithubService } from "./presentation/services";
import { GithubSha256Middleware } from "./presentation/middlewares/github-sha256.middleware";

(() => {
  main();
})();

function main() {
  const app = express();
  app.use(json());

  const githubService = new GithubService();
  const discordService = new DiscordService();
  const controller = new GithubController(githubService, discordService);

  app.use(GithubSha256Middleware.verifySignature);
  app.post("/api/github", controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
  });
}
