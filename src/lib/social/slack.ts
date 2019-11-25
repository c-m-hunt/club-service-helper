
import { WebClient } from "@slack/web-api";

interface SlackOptions {
    token: string;
}

class Slack {
    private token: string;
    private client: WebClient;
    public constructor (options: SlackOptions) {
        this.token = options.token;
        this.client = new WebClient(this.token);
    }

    public postMessage = (message: string, channel: string) => {
        this.client.chat.postMessage({ channel, text: message });
    };
}

export default Slack;
