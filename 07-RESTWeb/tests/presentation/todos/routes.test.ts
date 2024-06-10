import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgresql";

describe("Todo route testing", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(async () => {
    await testServer.close();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todo1 = { text: "Todo 1" };
  const todo2 = { text: "Todo 2" };

  test("Should return todos ~ api/todos", async () => {
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });

    const { body } = await request(testServer.app)
      .get("/api/todos")
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body).toHaveLength(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
  });

  test("Should return a todo by id ~ api/todos/:id", async () => {
    const createdTodo = await prisma.todo.create({ data: todo1 });
    const { id } = createdTodo;

    const { body } = await request(testServer.app)
      .get(`/api/todos/${id}`)
      .expect(200);

    expect(body).toEqual({
      id: id,
      text: todo1.text,
      completedAt: null,
    });
  });

  test("Should return 404 when todo not found ~ api/todos/:id", async () => {
    const todoId = 999;
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(404);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });

  test("Should create a todo ~ api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null,
    });
  });

  test("Should return 400 when text is not valid ~ api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({})
      .expect(400);

    expect(body).toEqual({ error: "Text is required" });
  });

  test("Should update a todo ~ api/todos/:id", async () => {
    const createdTodo = await prisma.todo.create({ data: todo1 });
    const { id } = createdTodo;

    const { body } = await request(testServer.app)
      .put(`/api/todos/${id}`)
      .send({ text: "Updated Todo", completedAt: "2024-06-10" })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: "Updated Todo",
      completedAt: "2024-06-10T00:00:00.000Z",
    });
  });

  test("Should return 404 when id is not found ~ api/todos/:id", async () => {
    const todoId = 999;

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todoId}`)
      .send({ text: "Updated Todo", completedAt: "2024-06-10" })
      .expect(404);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });

  test("Should return an updated todo, only the date ~ api/todos/:id", async () => {
    const createdTodo = await prisma.todo.create({ data: todo1 });
    const { id } = createdTodo;

    const { body } = await request(testServer.app)
      .put(`/api/todos/${id}`)
      .send({ completedAt: "2024-06-10" })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: "2024-06-10T00:00:00.000Z",
    });
  });

  test("Should delete a todo ~ api/todos/:id", async () => {
    const createdTodo = await prisma.todo.create({ data: todo1 });
    const { id } = createdTodo;

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${id}`)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: createdTodo.text,
      completedAt: null,
    });
  });

  test("Should return 400 when id is not found ~ api/todos/:id", async () => {
    const todoId = 999;

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todoId}`)
      .expect(404);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });
});
