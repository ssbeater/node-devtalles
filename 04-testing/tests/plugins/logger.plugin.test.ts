import { buildLogger } from "../../src/plugins";
import { logger as winstonLogger } from "../../src/plugins/logger.plugin";

describe("logger", () => {

  test("buildLogger should return a function logger", async () => {
    const logger = buildLogger("user-service");

    expect(typeof logger.log).toBe("function");
    expect(typeof logger.error).toBe("function");
  });

  test("logger.log should log a message", async () => {
    const winstonLoggerMock = jest.spyOn(winstonLogger, "log");
    const message = "test message";
    const service = "service service";

    const logger = buildLogger(service);
    logger.log(message);

    expect(winstonLoggerMock).toHaveBeenCalled();
    expect(winstonLoggerMock).toHaveBeenCalledWith(
      "info",
      expect.objectContaining({
        message,
        service,
      }),
    );
  });

});