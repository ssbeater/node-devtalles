import fs from "fs";

export interface Options {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export interface SaveFileUseCase {
  execute(options: Options): boolean;
}

export class SaveFile implements SaveFileUseCase {
  constructor() {}

  execute({
    fileContent,
    fileDestination = "outputs",
    fileName = "table",
  }: Options) {
    try {
      fs.mkdirSync(fileDestination, { recursive: true });
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
      return true;
    } catch (error) {
      return false;
    }
  }
}
