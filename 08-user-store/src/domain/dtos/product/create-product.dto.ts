import { Validators } from "../../../config";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string, // ID
    public readonly category: string // ID
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = obj;

    if (!name) return ["Name is required"];
    if (!user) return ["User is required"];
    if (!category) return ["Category is required"];

    if(!Validators.isValidId(user)) return ["Invalid user ID"];
    if(!Validators.isValidId(category)) return ["Invalid category ID"];

    return [
      undefined,
      new CreateProductDto(
        name,
        !!available,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
