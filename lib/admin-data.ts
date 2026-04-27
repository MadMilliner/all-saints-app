import { promises as fs } from 'fs';
import path from 'path';

export type EditableDataFile = 'board' | 'jobs';

const ALLOWED_FILES: Record<EditableDataFile, string> = {
  board: 'board.json',
  jobs: 'jobs.json',
};

function getDataFilePath(file: EditableDataFile): string {
  return path.join(process.cwd(), 'data', ALLOWED_FILES[file]);
}

export async function readJsonFile(file: EditableDataFile): Promise<string> {
  const filePath = getDataFilePath(file);
  return fs.readFile(filePath, 'utf8');
}

export async function writeJsonFile(file: EditableDataFile, rawJson: string): Promise<void> {
  const parsed = JSON.parse(rawJson);
  const filePath = getDataFilePath(file);
  const formattedJson = `${JSON.stringify(parsed, null, 2)}\n`;
  await fs.writeFile(filePath, formattedJson, 'utf8');
}

export function isEditableFile(file: string): file is EditableDataFile {
  return file === 'board' || file === 'jobs';
}
