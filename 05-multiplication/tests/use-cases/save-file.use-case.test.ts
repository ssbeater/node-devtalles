import fs from "node:fs";
import { SaveFile } from "../../src/domain/use-cases/save-file.use-case";

describe("Save file use case", () => {

  afterEach(() => {
    fs.existsSync("outputs") && fs.rmSync("outputs", { recursive: true });
  });

  test("should save file with default values", () => { // Use lowercase 'saveFile' instead of 'SaveFile'
    const saveFile = new SaveFile();
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "test content",
    }

    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    
    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  
  test("should save file with default values", () => { // Use lowercase 'saveFile' instead of 'SaveFile'
    const saveFile = new SaveFile();
    const options = {
      fileContent: "custom content",
      fileDestination: "custom-outputs",
      fileName: "custom-table-name",
    }
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;

    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    
    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(fileContent).toBe(options.fileContent);

    
    fs.existsSync(options.fileDestination) && fs.rmSync(options.fileDestination, { recursive: true });
  });
});