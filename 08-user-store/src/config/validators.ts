import { isValidObjectId } from "mongoose";

export class Validators {
  static isValidId(id: string) {
    return isValidObjectId(id);
  }
}
