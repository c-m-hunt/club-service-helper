import Twitter from './lib/social/twitter';
import Contentful from './lib/content/contentful';
import config from './config';


const t = new Twitter(config.clientConfig.twitter);
const c = new Contentful(config.clientConfig.contentful)

const message = `Message to update`;

// FB.api(
//   `/${pageId}/feed`,
//   'POST',
//   { message },
//   response => {
//     console.log(response)
//   }
// )

// t.updateStatus(message);

// 
// 

// c.get100ClubResults()
//   .then(results => {
//     console.log(results);
//   });