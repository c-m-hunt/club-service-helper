import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import morgan from "morgan";
import fetch from "node-fetch";
import { parseRequest } from "./lib/clubSpecific/slackActions";
const app = express();
const port = 3000;

app.use(morgan("common"));
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.post("/", (req: Request, res: Response): Response => {
    console.log(req.body);
    const replyTo = req.body.response_url;
    return parseRequest(req, res);
    // SetTimeout(() => {
    //   Console.log(`Would reply to ${replyTo}`);
    //   Const body = {
    //     Replace_original: "true",
    //     Text: "Thanks for your request, we'll process it and get back to you.",
    //   };
    //   Const deletePost = {
    //       Delete_original: "true",
    //   };
    //   Fetch(replyTo, {
    //       Method: "post",
    //       Body:    JSON.stringify(body),
    //       Headers: { "Content-Type": "application/json" },
    //   });
    //   SetTimeout(() => {
    //     Fetch(replyTo, {
    //         Method: "post",
    //         Body:    JSON.stringify(deletePost),
    //         Headers: { "Content-Type": "application/json" },
    //     });
    //   }, 2000)
    //   .then(res2 => res2.text())
    //   .then(text => console.log(text));
    // }, 5000);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
