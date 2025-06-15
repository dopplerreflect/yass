import { format } from 'prettier';
import { writeFile } from "node:fs";
import util from 'util';
const execAsync = util.promisify(writeFile);

export async function saveFile(path: string, body: string) {
  try {
    const formattedSVG = await format(body, { parser: 'html' });
    await execAsync(path, formattedSVG);
    return true;
  } catch (error) {
    console.error(`Error writing file ${path}`, error);
    throw error;
  }
}
