import { Request, Response } from "express";
import fetch from "node-fetch";
import logger from "./../logger";
import SelectionSpreadsheet from "./selectionSpreadsheet";

export class CommandFailureError extends Error {}

export const commands = {
    docs: "docs",
    selection: "selection",
};

export const getCommand = (text: string) => {
    const parts = text.split(" ");
    const command = parts.shift();
    if (command.trim() === "") {
        throw new CommandFailureError("No command has been supplied");
    }
    if (!Object.values(commands).includes(command)) {
        throw new CommandFailureError(`Command ${command} is not valid`);
    }
    const arg = parts.join(" ");
    return { command, arg };
};

export const parseRequest = (req: Request, res: Response): Response => {
    const replyTo = req.body.response_url;
    const text = req.body.text;
    const { command, arg } = getCommand(req.body.text);
    logger.debug(`Calling command ${command} with arguments ${arg}`);
    switch (command) {
    case "docs":
        return res.send(getDocs);
    case "selection":
        sendSelection(replyTo);
        return res.send();
    default:
        return res.send(getError("Ensure you've used a valid command"));
    }
};

const sendSelection = (url: string) => {
    const selection = new SelectionSpreadsheet("1SrkqcgstJHmzXvlydow-cBkae-KSIxMGl2CH_BddOe4", "Selection");
    selection.getSelection()
        .then(teams => {
            const team = teams.filter(t => t.teamName === "1st XI");
            console.log("Send response");
            console.log(url);
            const body = {
                replace_original: "true",
                text: team[0].players.map(p => (p)).join(", "),
            };
            fetch(url, {
                method: "post",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
            });
        });
};

const getError = (msg: string): object => ({
    blocks: [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: msg,
            },
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: "Valid commands: `docs`, ",
            },
        },
    ],
});

const getDocs = {
    blocks: [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `*Club docs*
<https://sosemtcc.org.uk/docs/clubmark/SOSEMTCC_Constitution.pdf|Constitution>
<https://sosemtcc.org.uk/docs/clubmark/Membership%20Form%20-%20Senior.doc|Senior Membership form>
<https://sosemtcc.org.uk/docs/clubmark/Membership%20Form%20-%20Juniors.doc|Junior Membership form>`,
            },
        },
    ],
};
