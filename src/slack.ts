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
  // setTimeout(() => {
  //   console.log(`Would reply to ${replyTo}`);
  //   const body = {
  //     replace_original: "true",
  //     text: "Thanks for your request, we'll process it and get back to you.",
  //   };
  //   const deletePost = {
  //       delete_original: "true",
  //   };
  //   fetch(replyTo, {
  //       method: "post",
  //       body:    JSON.stringify(body),
  //       headers: { "Content-Type": "application/json" },
  //   });
  //   setTimeout(() => {
  //     fetch(replyTo, {
  //         method: "post",
  //         body:    JSON.stringify(deletePost),
  //         headers: { "Content-Type": "application/json" },
  //     });
  //   }, 2000)
  //   .then(res2 => res2.text())
  //   .then(text => console.log(text));
  // }, 5000);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
