import { TodoRepository, TodoDataSource } from "../../domain";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoEntity } from "../../domain/entities";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private todoDataSource: TodoDataSource) {}

  getAll(): Promise<TodoEntity[]> {
    return this.todoDataSource.getAll();
  }

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoDataSource.create(createTodoDto);
  }

  findById(id: number): Promise<TodoEntity> {
    return this.todoDataSource.findById(id);
  }

  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoDataSource.updateById(updateTodoDto);
  }

  deleteById(id: number): Promise<TodoEntity> {
    return this.todoDataSource.deleteById(id);
  }
}
