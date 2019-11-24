import { getCommand } from "./../slackActions";

describe("Slack actions", () => {
  it("gets command and arguments", () => {
    const {command, arg} = getCommand("docs something");
    expect(command).toBe("docs");
    expect(arg).toBe("something");
  });
});
