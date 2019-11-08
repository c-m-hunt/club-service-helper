import config from "./config";
import Contentful from "./lib/content/contentful";
import Facebook from "./lib/social/facebook";
import Slack from "./lib/social/slack";
import Twitter from "./lib/social/twitter";

const t = new Twitter(config.clientConfig.twitter);
const c = new Contentful(config.clientConfig.contentful);
const f = new Facebook(config.clientConfig.facebook);

const message = `Reminder: Club EGM at The Pavilion - 7:30pm on Monday, 18th November. All members should have received details by email. Any problems - DM us.`;

// FB.api(
//   `/${pageId}/feed`,
//   'POST',
//   { message },
//   response => {
//     console.log(response)
//   }
// )

// t.updateStatus(message);
// f.postToWall(message);

// c.get100ClubResults()
//   .then(results => {
//     console.log(results);
//   });

const s = new Slack(config.clientConfig.slack);
// s.postMessage(message);
