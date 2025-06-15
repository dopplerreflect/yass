import { exec } from "node:child_process"; 
import util from 'util';
const execAsync = util.promisify(exec);

export async function runCommand(command: string) {
  try {
    const { stdout, stderr } = await execAsync(command);
    // console.log(`${command}`, 'stdout:', stdout);
    // console.error(`${command}`, 'stderr', stderr);
    return { stdout, stderr };
  } catch (error) {
    console.error('Error executing command:', command, error);
    throw error;
  }
}
