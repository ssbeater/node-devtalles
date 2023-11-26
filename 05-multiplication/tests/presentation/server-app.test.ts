import exp from "constants";
import { ServerApp } from "../../src/presentation/server-app";
import { CreateTable } from "../../src/domain/use-cases/create-table.use-case";
import { SaveFile } from "../../src/domain/use-cases/save-file.use-case";

describe("Server App", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    name: "test-filename",
    destination: "test-destination",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create ServerApp instance", () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  // test("should run ServerApp with options", () => {
  //   const logSpy = jest.spyOn(console, "log");
  //   const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
  //   const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");
  //   ServerApp.run(options);
  //   expect(logSpy).toHaveBeenCalledTimes(2);
  //   expect(logSpy).toHaveBeenCalledWith("Server running...");
  //   expect(logSpy).toHaveBeenLastCalledWith("File created!");
  //   expect(createTableSpy).toHaveBeenCalledTimes(1);
  //   expect(createTableSpy).toHaveBeenCalledWith({
  //     base: options.base,
  //     limit: options.limit,
  //   });
  //   expect(saveFileSpy).toHaveBeenCalledTimes(1);
  //   expect(saveFileSpy).toHaveBeenCalledWith({
  //     fileContent: createTableSpy.mock.results[0].value,
  //     fileDestination: options.destination,
  //     fileName: options.name,
  //   });
  // });

  test("should run with custom values mocked", () => {
    const logMock = jest.fn();
    const createTableMock = jest.fn().mockReturnValue("test-table");
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    CreateTable.prototype.execute = createTableMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(createTableMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: createTableMock.mock.results[0].value,
      fileDestination: options.destination,
      fileName: options.name,
    });
    expect(logMock).toHaveBeenCalledWith("File created!");
  });
});
