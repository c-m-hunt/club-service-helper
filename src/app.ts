import config from "./config";
import Contentful from "./lib/content/contentful";
import GoogleSheets from "./lib/content/googleSheets";
import Facebook from "./lib/social/facebook";
import Slack from "./lib/social/slack";
import Twitter from "./lib/social/twitter";

const t = new Twitter(config.clientConfig.twitter);
const c = new Contentful(config.clientConfig.contentful);
const f = new Facebook(config.clientConfig.facebook);
const s = new Slack(config.clientConfig.slack);
const gs = new GoogleSheets({ sheetId: "18N1OmS5kFPkVBmYZuHa8Q5mBwpOCKyPfCCH3aKN8MS0" });
const message = "Reminder: Club EGM at The Pavilion - 7:30pm on Monday, 18th November. All members should have received details by email. Any problems - DM us.";

// Import Handlebars from "handlebars";
// Const template = Handlebars.compile("Handlebars <b>{{doesWhat}}</b>");
// // execute the compiled template and print the output to the console
// Console.log(template({ doesWhat: "rocks!" }));

// T.updateStatus(message);
// F.postToWall(message);

// C.get100ClubResults()
//   .then(results => {
//     Console.log(results);
//   });

// Const s = new Slack(config.clientConfig.slack);
// S.postMessage(message);

// Gs.auth()
//   .then(async () => {
//     Const sheet = await gs.getWorksheet("Members");
//     Console.log(sheet);
//   });

import SelectionSpreadsheet from "./lib/clubSpecific/selectionSpreadsheet";

const selection = new SelectionSpreadsheet("1SrkqcgstJHmzXvlydow-cBkae-KSIxMGl2CH_BddOe4", "Selection");
selection.getSelection();
