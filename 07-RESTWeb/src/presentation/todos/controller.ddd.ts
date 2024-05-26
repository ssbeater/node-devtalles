import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await this.todoRepository.getAll();
      return res.json(todos);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  public getTodosById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    try {
      const todo = await this.todoRepository.findById(id);
      return res.json(todo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, dto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    try {
      const todo = await this.todoRepository.create(dto!);
      return res.json(todo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const [error, dto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    try {
      const updatedTodo = await this.todoRepository.updateById(dto!);
      return res.json(updatedTodo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    try {
      const deleted = await this.todoRepository.deleteById(id);
      return res.json(deleted);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}
