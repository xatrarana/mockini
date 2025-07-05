import { readFileSync } from 'node:fs';

/**
 * Reads a file and returns its contents as a string.
 * Throws a clear error if the file does not exist or cannot be read.
 *
 * @param path - Path to the file
 * @returns File contents as string
 * @throws Error if file is not found or unreadable
 */
export function readFileOrThrow(path: string): string {
  try {
    return readFileSync(path, 'utf-8');
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      throw new Error(`\t 📁 Config file not found at: ${path}`);
    } else {
      throw new Error(`\t ❌ Failed to read file "${path}": ${err.message}`);
    }
  }
}
