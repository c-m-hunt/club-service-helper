
import { WebClient } from "@slack/web-api";

interface ISlackOptions {
  token: string;
}

class Slack {
  private token: string;
  private client: WebClient;
  constructor(options: ISlackOptions) {
    this.token = options.token;
    this.client = new WebClient(this.token);
  }

  public postMessage = (message: string, channel: string) => {
    this.client.chat.postMessage({ channel, text: message });
  }
}

export default Slack;
