import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy bread", completedAt: null },
  { id: 3, text: "Buy butter", completedAt: null },
];

export class TodosController {
  //* DI
  constructor() {}

  public getTodos(req: Request, res: Response) {
    return res.json(todos);
  }

  public getTodosById(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const todo = todos.find((todo) => todo.id === id);

    return todo
      ? res.json(todo)
      : res.status(404).json({ message: "Todo not found" });
  }

  public createTodo(req: Request, res: Response) {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const newTodo = {
      id: todos.length + 1,
      text,
      completedAt: null,
    };

    todos.push(newTodo);
    return res.json(newTodo);
  }

  public updateTodo(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const { text, completedAt } = req.body;

    todo.text = text || todo.text;
    completedAt === null || completedAt === undefined
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    return res.json(todo);
  }
  
  public deleteTodo(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) return res.status(404).json({ message: "Todo not found" });

    todos.splice(todoIndex, 1);
    return res.json({ message: "Todo deleted" });
  }
}
