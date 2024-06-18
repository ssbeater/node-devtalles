import { Request, Response } from "express";
import { DiscordService, GithubService } from "../services";

export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly discordService: DiscordService
  ) {}

  webhookHandler = async (req: Request, res: Response) => {
    const githubEvent = req.headers["x-github-event"] ?? "unknown";
    const payload = req.body;
    let message = "";

    switch (githubEvent) {
      case "star":
        message = this.githubService.onStar(payload);
        break;
      case "issues":
        message = this.githubService.onIssue(payload);
        break;
      default:
        message = `Unknown event: ${githubEvent}`;
    }

    this.discordService
      .notify(message)
      .then(() => res.status(202).json("Accepted"))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  };
}
