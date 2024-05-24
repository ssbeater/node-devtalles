import { Request, Response } from "express";
import { prisma } from "../../data/postgresql";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  //* DI
  constructor() {}

  public async getTodos(req: Request, res: Response) {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  }

  public async getTodosById(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const todo = await prisma.todo.findUnique({ where: { id } });

    return todo
      ? res.json(todo)
      : res.status(404).json({ message: "Todo not found" });
  }

  public async createTodo(req: Request, res: Response) {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: { text: createTodoDto!.text },
    });

    return res.json(todo);
  }

  public async updateTodo(req: Request, res: Response) {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const newTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });

    return res.json(newTodo);
  }

  public async deleteTodo(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const deleted = await prisma.todo.delete({ where: { id } });

    if (!deleted)
      return res.status(400).json({ message: "Failed to delete todo" });

    return res.json(deleted);
  }
}
