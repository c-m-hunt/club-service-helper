import FB from "fb";

interface FacebookOptions {
    appId: string;
    appSecret: string;
    accessToken: string;
    pageId: string;
}

class Facebook {
    private pageId: any;
    public constructor (options: FacebookOptions) {
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
    };
}

export default Facebook;
