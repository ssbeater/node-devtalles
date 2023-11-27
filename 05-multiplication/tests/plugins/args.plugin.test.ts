const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { args: yargs } = await import("../../src/config/plugins/args.plugin");

  return yargs;
};

describe("ArgsPlugin", () => {
  const orginalArgv = process.argv;

  beforeEach(() => {
    process.argv = [...orginalArgv];
    jest.resetModules();
  });

  test("Should return default values", async () => {
    const argv = await runCommand(["-b", "5"]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "table",
        d: "outputs",
      })
    );
  });

  test("should return configuration with custom values", async () => {
    const argv = await runCommand(["-b", "8", "-l", "20", "-s", "-n", "custom-name", "-d", "custom-dir"]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 8,
        l: 20,
        s: true,
        n: "custom-name",
        d: "custom-dir",
      })
    );
  });
});
