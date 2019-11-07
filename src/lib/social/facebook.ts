import FB from "fb";

interface IFacebookOptions {
  appId: string;
  appSecret: string;
  accessToken: string;
  pageId: string;
}

class Facebook {
  private pageId: any;
  constructor(options: IFacebookOptions) {
    this.pageId = options.pageId;
    FB.options(options);
  }

  public postToWall = async (message: string) => {
    FB.api(
      `/${this.pageId}/feed`,
      "POST",
      { message },
      (response) => {
        console.log(response);
      },
    );
  }
}

export default Facebook;
