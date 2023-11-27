import { ServerApp } from "../src/presentation/server-app";

describe("Test App.js", () => {
  test("should call Server.run with values", async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = ["node", "app.ts", "-b", "5", "-l", "10", "-s", "-n", "test", "-d", "test"];
    
    await import("../src/app");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 5,
      limit: 10,
      showTable: true,
      name: "test",
      destination: "test"
    });
  });
});
