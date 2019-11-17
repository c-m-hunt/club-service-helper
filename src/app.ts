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
const message = `Reminder: Club EGM at The Pavilion - 7:30pm on Monday, 18th November. All members should have received details by email. Any problems - DM us.`;

// import Handlebars from "handlebars";
// const template = Handlebars.compile("Handlebars <b>{{doesWhat}}</b>");
// // execute the compiled template and print the output to the console
// console.log(template({ doesWhat: "rocks!" }));


// t.updateStatus(message);
// f.postToWall(message);

// c.get100ClubResults()
//   .then(results => {
//     console.log(results);
//   });

// const s = new Slack(config.clientConfig.slack);
// s.postMessage(message);

// gs.auth()
//   .then(async () => {
//     const sheet = await gs.getWorksheet("Members");
//     console.log(sheet);
//   });

import SelectionSpreadsheet from "./lib/clubSpecific/selectionSpreadsheet";

const selection = new SelectionSpreadsheet("1SrkqcgstJHmzXvlydow-cBkae-KSIxMGl2CH_BddOe4", "Selection");
selection.getSelection();
