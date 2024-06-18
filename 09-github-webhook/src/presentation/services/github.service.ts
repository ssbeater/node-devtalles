import { GithubStarPayload, GithubIssuePayload } from "../../interfaces";

export class GithubService {
  constructor() {}

  onStar(payload: GithubStarPayload) {
    const { sender, action, repository, starred_at } = payload;

    if (starred_at) {
      return `User ${sender.login} ${action} star on ${repository.full_name} at ${starred_at}`;
    }

    return `User ${sender.login} ${action} star on ${repository.full_name}`;
  }

  onIssue(payload: GithubIssuePayload) {
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
  }
}
