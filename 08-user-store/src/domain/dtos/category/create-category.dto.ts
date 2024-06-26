export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available = false } = obj;
    let availableBoolean = available;

    if (!name) return ["Missing name"];
    if (typeof available !== "boolean") availableBoolean = available === "true";

    const dto = new CreateCategoryDto(name, availableBoolean);
    return [undefined, dto];
  }
}
