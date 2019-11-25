import {
    CommandFailureError,
    getCommand,
} from "./../slackActions";

describe("Slack actions", () => {
    it("gets command and arguments", () => {
        const {command, arg} = getCommand("docs something");
        expect(command).toBe("docs");
        expect(arg).toBe("something");
    });

    it("gets command and long argument", () => {
        const {command, arg} = getCommand("docs something that is a long piece of text");
        expect(command).toBe("docs");
        expect(arg).toBe("something that is a long piece of text");
    });

    it("throws an exception when no command is passed", () => {
        expect(() => { getCommand(""); }).toThrow(CommandFailureError);
    });

    it("throws an exception when invalid command is passed", () => {
        expect(() => { getCommand("something"); }).toThrow(CommandFailureError);
    });
});
