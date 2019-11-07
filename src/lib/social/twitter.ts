import Twit from "twit";

interface ITwitterOptions {
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

class Twitter {
  private client: Twit;

  constructor(options: ITwitterOptions) {
    this.client = new Twit({
      access_token: options.accessToken,
      access_token_secret: options.accessTokenSecret,
      consumer_key: options.consumerKey,
      consumer_secret: options.consumerSecret,
      strictSSL: true,     // optional - requires SSL certificates to be valid.
      timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    });
  }

  public updateStatus = async (status: string) => {
    this.client.post("statuses/update", { status }, (err, data, response) => {
      console.log(data);
    });
  }
}

export default Twitter;
