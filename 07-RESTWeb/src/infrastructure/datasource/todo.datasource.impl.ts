import { prisma } from "../../data/postgresql";
import { TodoDataSource } from "../../domain";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoEntity } from "../../domain/entities";

export class TodoDataSourceImpl implements TodoDataSource {
  async getAll() {
    const todos = await prisma.todo.findMany();

    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: { text: createTodoDto!.text },
    });

    return TodoEntity.fromObject(todo);
  }

  async findById(id: number) {
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo) throw `Todo with id ${id} not found`;
    return TodoEntity.fromObject(todo);
  }

  async updateById(updateTodoDto: UpdateTodoDto) {
    const { id } = updateTodoDto;

    await this.findById(id);

    const updatedTodo = await prisma.todo.update({
      where: { id: id },
      data: updateTodoDto!.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);
    const deleted = await prisma.todo.delete({ where: { id } });

    return TodoEntity.fromObject(deleted);
  }
}
