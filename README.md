[![Actions Status](https://github.com/zapupenec/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/zapupenec/frontend-project-46/actions)
[![CI](https://github.com/zapupenec/frontend-project-46/actions/workflows/mainCI.yml/badge.svg)](https://github.com/zapupenec/frontend-project-46/actions/workflows/mainCI.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/4828c4671187635c3443/maintainability)](https://codeclimate.com/github/zapupenec/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4828c4671187635c3443/test_coverage)](https://codeclimate.com/github/zapupenec/frontend-project-46/test_coverage)

# «Вычислитель отличий»
«Вычислитель отличий» – CLI утилита, определяющая разницу между двумя структурами данных.

Возможности утилиты:
- Поддержка разных входных форматов: yaml, json.
- Генерация отчета в виде plain text, stylish и json.

***

## Установка
Убедитесь, что у вас установлена Node.js версии 14 и выше.
```
node --version
```
Скопируйте репозиторий локально и установите зависимости.
```
make install
```
Прокект учебный и не опубликован. Установите пакет глобально из локальной директории. Для этого из корневой директории проекта запустите команду:
```
npm link
```
Возможно потребуется использовать `sudo`
```
sudo npm link
```
## Синтаксис
```
gendiff [options] <filepath1> <filepath2>
```
В качестве аргументов `<filepath1>` и `<filepath2>` используйте пути к первому и второму файлам соответсвенно.

Утилита работает только с расширениям **.json**, **.yaml** и **.yaml**

## Опции
Для вывода подсказки используйте `-h` или `--help`.
```
gendiff --help
```
Чтобы задать формат вывода, используйте `-f` или `--format` с арументом `<type>`.

В качестве `<type>` используйте `plain`, `stylish` или `json`.

Если не задавать формат, по умолчанию используется `stylish`.

***

## Примеры работы утилиты

### Генерация отчета plain
```
gendiff -f plain file1.json file2.json
```
[![asciicast](https://asciinema.org/a/YnLYzgE9iHves1115WOh7aOji.svg)](https://asciinema.org/a/YnLYzgE9iHves1115WOh7aOji)

### Генерация отчета stylish
```
gendiff file1.yml file2.yaml
```
или
```
gendiff -f stylish file1.yml file2.yaml
```
[![asciicast](https://asciinema.org/a/wjTrlXwv8t6HgLcBv0hkIbLqi.svg)](https://asciinema.org/a/wjTrlXwv8t6HgLcBv0hkIbLqi)

### Генерация отчета json
```
gendiff -f json file1.json file1.yml
```
[![asciicast](https://asciinema.org/a/AbVoLYL2gXk2jADY7Zz2XiKzy.svg)](https://asciinema.org/a/AbVoLYL2gXk2jADY7Zz2XiKzy)
