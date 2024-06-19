import type { Handler, HandlerEvent } from "@netlify/functions";
import * as crypto from "crypto";

import { GithubIssuePayload, GithubStarPayload } from "../../interfaces";

export const handler: Handler = async (event, context) => {
  // if (!verify_signature(event)) {
  //   console.log("Unauthorized request from GitHub");
  //   return {
  //     statusCode: 401,
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({ message: "Unauthorized" }),
  //   };
  // }

  const githubEvent = event.headers["x-github-event"] ?? "unknown";
  const payload = JSON.parse(event.body ?? "{}");
  let message = "";

  switch (githubEvent) {
    case "star":
      message = onStar(payload);
      break;
    case "issues":
      message = onIssue(payload);
      break;
    default:
      message = `Unknown event: ${githubEvent}`;
  }

  await notify(message);

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: "done" }),
  };
};

const notify = async (message: string) => {
  const body = {
    content: message,
  };

  const resp = await fetch(process.env.DISCORD_WEBHOOK_URL ?? "", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    console.error(`Failed to send message to Discord: ${message}`);
    return false;
  }

  return true;
};

const onStar = (payload: GithubStarPayload) => {
  const { sender, action, repository, starred_at } = payload;

  if (starred_at) {
    return `User ${sender.login} ${action} star on ${repository.full_name} at ${starred_at}`;
  }

  return `User ${sender.login} ${action} star on ${repository.full_name}`;
};

const onIssue = (payload: GithubIssuePayload) => {
  const { sender, action, repository, issue } = payload;

  if (action === "opened") {
    const message = `An issue "${issue.title}" was opened on ${repository.full_name}`;
    return message;
  }

  if (action === "closed") {
    const message = `An issue "${issue.title}" was closed by ${sender.login}`;
    return message;
  }

  if (action === "reopened") {
    const message = `An issue "${issue.title}" was reopened by ${sender.login}`;
    return message;
  }

  return `Unhandled action for the issue event ${action}`;
};

const verify_signature = (event: HandlerEvent) => {
  try {
    const signature = crypto
      .createHmac("sha256", process.env.SECRET_TOKEN ?? "")
      .update(JSON.stringify(event.body ?? "{}"))
      .digest("hex");

    const xHubSignature = event.headers["x-hub-signature-256"] ?? "";

    let trusted = Buffer.from(`sha256=${signature}`, "ascii");
    let untrusted = Buffer.from(xHubSignature, "ascii");

    return crypto.timingSafeEqual(trusted, untrusted);
  } catch (error) {
    console.log("Error in verify_signature");
    return false;
  }
};
