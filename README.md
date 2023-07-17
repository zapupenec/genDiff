[![Actions Status](https://github.com/zapupenec/genDiff/workflows/hexlet-check/badge.svg)](https://github.com/zapupenec/genDiff/actions)
[![CI](https://github.com/zapupenec/genDiff/actions/workflows/mainCI.yml/badge.svg)](https://github.com/zapupenec/genDiff/actions/workflows/mainCI.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/d03279a4a72509537067/maintainability)](https://codeclimate.com/github/zapupenec/genDiff/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d03279a4a72509537067/test_coverage)](https://codeclimate.com/github/zapupenec/genDiff/test_coverage)

EN | [RU](https://github.com/zapupenec/genDiff/blob/main/README-ru.md)

# «Difference Calculator»
«Difference Calculator» is a CLI utility that determines the difference between two data structures.

Features of the utility:
- Supports different input formats: YAML, JSON.
- Report generation as **plain**, **stylish** and **JSON**.

## Installation
Make sure you have Node.js version 14 or higher installed.
```
node --version
```
Clone the repository locally and install the dependencies.
```
make install
```
The project is a tutorial and has not been published. Install the package globally from the local directory. From the project root directory, run the command:
```
npm link
```
You may need to use `sudo `
```
sudo npm link
```
## Syntax
```
gendiff [options] <filepath1> <filepath2>
```
Use arguments `<filepath1>` and `<filepath2>` as to the first and second file paths.

The utility works only with **.json**, **.yaml** and **.yaml** extensions.

## Options
Use `-h` or `--help` to display a hint.
```
gendiff --help
```
Use `-f` or `---format` with the argument `<type>` to set the output format

Use `plain`, `stylish` or `json` as `<type>`.

If you don't specify a format, the default is `stylish`.

***

## Examples

### Generating a **plain** report
```
gendiff -f plain file1.json file2.json
```
[![asciicast](https://asciinema.org/a/YnLYzgE9iHves1115WOh7aOji.svg)](https://asciinema.org/a/YnLYzgE9iHves1115WOh7aOji)

### Generating a **stylish** report
```
gendiff file1.yml file2.yaml
```
or
```
gendiff -f stylish file1.yml file2.yaml
```
[![asciicast](https://asciinema.org/a/wjTrlXwv8t6HgLcBv0hkIbLqi.svg)](https://asciinema.org/a/wjTrlXwv8t6HgLcBv0hkIbLqi)

### Generating a **json** report
```
gendiff -f json file1.json file1.yml
```
[![asciicast](https://asciinema.org/a/AbVoLYL2gXk2jADY7Zz2XiKzy.svg)](https://asciinema.org/a/AbVoLYL2gXk2jADY7Zz2XiKzy)
