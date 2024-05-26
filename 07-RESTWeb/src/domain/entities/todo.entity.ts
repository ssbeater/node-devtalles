export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(obj: { [key: string]: any }): TodoEntity {
    const { id, text, completedAt } = obj;

    if (!id) throw "id is required";
    if (!text) throw "text is required";

    let newCompletedAt = null;

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) throw "Invalid date completedAt";
    }

    return new TodoEntity(id, text, newCompletedAt);
  }
}
