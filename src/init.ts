import { writeFileSync, existsSync } from "node:fs";
import type { MockiniConfig } from "./types";

/**
 * Default configuration used when initializing mockini.
 * Includes a simple GET /hello route.
 */

const defaultConfig: MockiniConfig = {
    port: 3000,
    routes: [
        {
            method: 'GET',
            path: '/hello',
            status: 200,
            response: { message: 'Hello, world!' }
        }
    ]
}

/**
 * Creates a default mockini.config.json file at the specified path.
 *
 * @param path - The file path where the config should be written.
 *
 * If the file already exists, it warns and aborts without overwriting.
 */

export function initConfig(path: string) {
    if (existsSync(path)) {
        console.warn(`\t ⚠️ File ${path} already exists. Aborting.`);
        return;
    }

    writeFileSync(path, JSON.stringify(defaultConfig, null, 2));
    console.log(`\t ✅ mockini config created at ${path}`)
}