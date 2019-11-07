import fetch from "node-fetch";

interface IContentfulOptions {
  apiKey: string;
  spaceId: string;
}

class Contentful {
  private baseUrl: string;
  private options: IContentfulOptions;
  constructor(options: IContentfulOptions) {
    this.baseUrl = "https://cdn.contentful.com";
    this.options = options;
  }

  public getData = async (sheetId: string) => {
    const url = `${this.baseUrl}/spaces/${this.options.spaceId}/entries?access_token=${this.options.apiKey}`;
    return await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data.items
          .filter((item) => item.sys.contentType.sys.id === sheetId)
          .map((item) => item.fields)
          .map((item) => {
            item.thirdNumber = parseInt(item.thirdNumber, 10);
            return item;
          });
      });
  }

  public get100ClubResults = async () => {
    const contentful100ClubId = "7aamF3fpkc6KgSOmqqOgwS";
    const results = await this.getData(contentful100ClubId);
    return results.map((item) => {
      item.thirdNumber = parseInt(item.thirdNumber, 10);
      return item;
    });
  }
}

export default Contentful;
