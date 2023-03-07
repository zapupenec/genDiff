#!/usr/bin/env node
import { program, Option } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .addOption(new Option('-f, --format <type>', 'output format', 'stylish').default('stylish').choices(['stylish', 'plain', 'json']))
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const formatName = program.opts().format;
    const diff = genDiff(filepath1, filepath2, formatName);
    console.log(diff);
  });
program.parse();
