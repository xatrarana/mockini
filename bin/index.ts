#!/usr/bin/env node

import { Command } from "commander";
import { initConfig } from "../src/init";
import path from 'path';
import { readFileOrThrow } from "../src/lib/utils";


const program = new Command();

program
    .name('mockini')
    .description('Spin up mock REST APIs from a JSON file')
    .version('1.0.0');
program
    .command('init')
    .description('Create a by default config file at root of project')
    .action((_unknownArgs: unknown, _command: Command) => {
        const configPath = path.join(process.cwd(), 'mockini.config.json');
        initConfig(configPath);
    });

program
    .command('validate')
    .description('Validate config file structure and routes')
    .option('-c, --config <path>', 'Path to config file (default: ./mockini.config.json)')
    .action((options) => {
        const configPath = options.config || 'mockini.config.json';
        try {
            const config = JSON.parse(readFileOrThrow(configPath));
            // validate structure: port, routes, each route.method, route.path, etc.
            console.log(`✅ Config file "${configPath}" is valid.`);
        } catch (error) {
            console.error(`❌ Config validation failed:`, error);
            process.exit(1);
        }
    });


program.parse(process.argv);