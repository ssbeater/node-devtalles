import { envs } from "../../config";

export class DiscordService {
  private readonly webhookUrl: string = envs.DISCORD_WEBHOOK_URL;

  async notify(message: string) {
    const body = {
      content: message,
      // embeds: [
      //   {
      //     image: {
      //       url: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmhwZjdvZGJpenhmaDJkaXFheWNpcXExNXJrcmdrazhxbHIzN3lkZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif",
      //     },
      //   },
      // ],
    };

    const resp = await fetch(this.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      console.error(`Failed to send message to Discord: ${message}`);
      return false;
    }

    return true;
  }
}
