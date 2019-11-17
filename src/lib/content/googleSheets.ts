import GoogleSpreadsheet, { info, spreadsheet, SpreadsheetRow, worksheet } from "google-spreadsheet";
import Util from "util";

interface IGoogleSheetsOptions {
  sheetId: string;
}

class GoogleSheets {
  private doc: spreadsheet;
  private sheet: worksheet;
  private info: info;
  constructor(options: IGoogleSheetsOptions) {
    this.doc = new GoogleSpreadsheet(options.sheetId);
  }

  public auth = async () => {
    const privateKey = require("./google-client-secret.json");
    const authSheet = Util.promisify(this.doc.useServiceAccountAuth);
    await authSheet(privateKey);
    console.log("Successfully authenticated");
  }

  public getInfoAndWorksheets = async () => {
    const getInfo = Util.promisify(this.doc.getInfo);
    return await getInfo();
  }

  public getWorksheet = async (name: string): Promise<SpreadsheetRow[]> => {
    this.sheet = await this.loadWorksheet(name);
    const getRows = Util.promisify(this.sheet.getRows);
    return await getRows();
  }

  private loadWorksheet = async (name: string) => {
    this.info = await this.getInfoAndWorksheets();
    const sheet = this.info.worksheets.filter((sheetObj: worksheet) => sheetObj.title === name);
    if (sheet.length === 0) {
      throw Error("Could not find worksheet");
    }
    return sheet[0];
  }
}
export default GoogleSheets;
