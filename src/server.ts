import express from 'express';
import type { Request, Response, Application } from 'express';
import type { LowercaseMethod, MockiniConfig, Route } from './types';
import { readFileOrThrow } from './lib/utils';

const validMethods: LowercaseMethod[] = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'all'];

/**
 * Starts the mock server based on the provided JSON config file.
 *
 * @param configPath - The path to the JSON configuration file defining the mock server routes and settings.
 * @param portOverride - Optional. If provided, overrides the port specified in the config file.
 *
 * @throws Will exit the process with code 1 if the config file is missing, invalid, or malformed.
 *
 * @description
 * Reads the configuration file, validates and parses the routes, then spins up an Express server
 * that mocks the defined endpoints. Supports fallback to HTTP method 'ALL' for unsupported methods,
 * and provides a default '/' route showing usage and available routes in JSON format.
 */

export default function startServer(configPath: string, portOverride?: number) {
    const registeredRoutes: { method: string; path: string }[] = [];

    try {
        const raw = readFileOrThrow(configPath);
        const config: MockiniConfig = JSON.parse(raw);

        const app: Application = express();

        config.routes.forEach((route: Route) => {
            const method = route.method.toLocaleLowerCase() as LowercaseMethod;
            let effectiveMethod: LowercaseMethod;

            if (!validMethods.includes(method)) {
                console.warn(`\t⚠️ Unsupported method "${method}" — falling back to "ALL" for route ${route.path}`);
                effectiveMethod = 'all';
            } else {
                effectiveMethod = method;
            }
            registeredRoutes.push({
                method: effectiveMethod.toUpperCase(),
                path: route.path
            });
            (app[effectiveMethod] as express.IRouterMatcher<Application>)(route.path,
                (_req: Request, res: Response) => {
                    res.status(route.status ?? 200).json(route.response);
                });
            // Add default homepage

            app.get('/', (_req: Request, res: Response) => {
                res.json(
                    {
                        "title": "mockini",
                        "version": "1.0.0",
                        "description": "Mock REST API server from a JSON config",
                        "usage": "https://github.com/xatrarana/mockini/tree/main/docs/usage.md",
                        "docs": "https://github.com/xatrarana/mockini/tree/main/docs",
                        "status": "running",
                        "port": portOverride ?? config.port ?? 3000,
                        "routes": registeredRoutes
                    }

                );
            });

        })

        const port = portOverride ?? config.port ?? 3000;
        app.listen(port, () => {
            console.log(`\t 🚀 mockini running at http://localhost:${port}`);
        });
    } catch (error: unknown) {
        console.error(`❌ Failed to start server.`);
        if (error instanceof SyntaxError) {
            console.error('\t💥 Invalid JSON in config file. Please check your config format.');
        } else if ((error as any).code === 'ENOENT') {
            console.error(`\t📁 Config file not found at "${configPath}".`);
        } else {
            console.error(error);
        }
        process.exit(1);
    }
}
