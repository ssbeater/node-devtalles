import { httpClient } from "../../src/plugins";

describe("httpClient", () => {

  test("httpClient", async () => {
    const data = await httpClient.get("https://jsonplaceholder.typicode.com/todos/1");
    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: expect.any(Boolean)
    })
  });

  test("httpClient should have POST, PUT, DELET methods", async () => {
    expect(typeof httpClient.post).toBe("function");
    expect(typeof httpClient.put).toBe("function");
    expect(typeof httpClient.delete).toBe("function");
  });

});