#!/usr/bin/env node
import path from 'path';

import { Command } from 'commander';

import { initConfig } from '../src/init';
import { readFileOrThrow } from '../src/lib/utils';
import startServer from '../src/server';

const program = new Command();

program.name('mockini').description('Spin up mock REST APIs from a JSON file').version('1.0.0');
program
  .command('init')
  .description('Create a by default config file at root of project')
  .action(() => {
    const configPath = path.join(process.cwd(), 'mockini.config.json');
    initConfig(configPath);
  });
program
  .command('start')
  .description('Start mock server')
  .option('-c, --config <path>', 'Path to config file (default: ./mockini.config.json')
  .option('-p, --port <port>', 'Override default port')
  .action((options) => {
    const configPath = options.config || 'mockini.config.json';
    const portOverride = options.port ? parseInt(options.port) : undefined;
    startServer(configPath, portOverride);
  });
program
  .command('validate')
  .description('Validate config file structure and routes')
  .option('-c, --config <path>', 'Path to config file (default: ./mockini.config.json)')
  .action((options) => {
    const configPath = options.config || 'mockini.config.json';
    try {
      JSON.parse(readFileOrThrow(configPath));
      // validate structure: port, routes, each route.method, route.path, etc.
      console.log(`✅ Config file "${configPath}" is valid.`);
    } catch (error) {
      console.error(`❌ Config validation failed:`, error);
      process.exit(1);
    }
  });

program.parse(process.argv);
