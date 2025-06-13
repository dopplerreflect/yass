import { writeFile } from "node:fs";
import util from 'util';
const execAsync = util.promisify(writeFile);

export async function saveFile(path: string, body: string) {
  try {
    await execAsync(path, body);
    return true;
  } catch (error) {
    console.error(`Error writing file ${path}`, error);
    throw error;
  }
}
