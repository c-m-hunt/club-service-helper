import { worksheet } from "google-spreadsheet";
import GoogleSheets from "./../content/googleSheets";

interface ITeamSelection {
  teamName: string;
  opponent: string;
  venue: string;
  contact: string;
  startTime: string;
  meetInstructions: string;
  players: string[];
  scorer: string;
  teas: string;
  notes: string;
}

class SelectionSpreadsheet {
  private sheetName: string;
  private sheetId: string;
  constructor(sheetId: string, sheetName: string) {
    this.sheetId = sheetId;
    this.sheetName = sheetName;
  }

  public getSelection = async () => {
    const Selection = new GoogleSheets({ sheetId: this.sheetId });
    await Selection.auth();
    const sheet = await Selection.getWorksheet(this.sheetName);
    const teams = {
      firstxi: "1st XI",
      secondxi: "2nd XI",
      thirdxi: "3rd XI",
      fourthxi: "4th XI",
      sundayxi: "Sunday XI",
    };

    const teamSelections = Object.entries(teams).map((team) => {
      return this.getTeam(team[0], team[1], sheet);
    }).filter(sel => sel.opponent !== undefined);
    console.log(teamSelections);
    return teamSelections;
  }

  private getTeam = (teamKey: string, teamName: string, sheet: worksheet): ITeamSelection => {
    const players: string[] = [];
    sheet.forEach((row, i) => {
      if (i >= 5 && i <= 16) {
        players.push(row[teamKey]);
      }
    });
    const ts: ITeamSelection = {
      contact: sheet[3][teamKey],
      meetInstructions: sheet[4][teamKey],
      notes: sheet[19][teamKey],
      opponent: sheet[1][teamKey],
      players: players.filter(player => player !== ""),
      scorer: sheet[17][teamKey],
      startTime: sheet[2][teamKey],
      teamName,
      teas: sheet[18][teamKey],
      venue: sheet[0][teamKey],
    };
    return ts;
  }
}

export default SelectionSpreadsheet;
