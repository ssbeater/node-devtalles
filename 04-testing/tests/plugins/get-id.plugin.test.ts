import { getUUID } from "../../src/plugins";

describe("getAge", () => {

  test("getUUID should return a UUID", () => {
    const uuid = getUUID();

    expect(typeof uuid).toBe("string");
    expect(uuid.length).toBe(36);
  });

});