# localeawesome
Simple JavaScript tool to manage translations with Localeapp

### Preface
This is only an experimental package meant to work with Rails projects that use `localeapp` to manage locales. If you have the following:
- The [localeapp](https://github.com/Locale/localeapp) gem installed and set up to work with your rails project
- `node` installed globally or locally for your project

then this package might come useful.

## Intro
When working with locales through [localeapp](https://www.localeapp.com/), the files containing translation keys can become extremely large and complex to be easily managed. This tool tries to bring more organisation and ease of management of locales in a Rails project by using folders to separate keys.

## Features
- Compile translation keys from a _folder structure_ source to a single `.yml` file.
- Synchronise with your `localeapp` project (operation directly performed through the gem)
- Update the source files in the folders when pulling from `localeapp`

## Installation
1. Make sure you have set up the localeapp gem correctly. If so, your current folder structure should look a little something like this:
```
.
|__ app
|__ bin
|__ config
    |__ environments
    |__ initializers
    |__ locales
        |__ [lang].yml

    |__ application.rb
    |__ ...

|__ db
|__ ...
```

2. You may now install `localeawesome` locally if you already have `node` dependencies in your project or if you need all collaborators to install this package.

 ```
 npm install localeawesome
 ```
 or
 ```
 yarn add localeawesome
 ```

 If you don't have `node` dependencies but still wish to use this package you can install it globally through
 ```
 npm install -g localeawesome
 ```
 or
 ```
 yarn global add localeawesome
 ```

 In this case make sure you have `node` already installed globally on your machine.

## Usage

### Setup
To start using `localeawesome` there is a minimal set up that needs to be taken care of first.

Create a `.localeawesomerc` file where all the paths and locale information for the `localeawesome` commands is specified. A normal usage set up file looks like this
```
{
  "target": "config/locales",
  "source": "config/locales/src",
  "default": "en"
}
```

Where `target` is the path to the folder where your compiled translation key file will be written, `source` is the root of your folder structure and `default` is the default language of your locales. In this example all local translation keys are in English, and the generated file (in `/config/locales`) is `en.yml`. It is this file that is then synchronised with Localeapp. The default locale should match the one in your remote  Localeapp project.

### Commands
There are 3 commands available:
- __UPDATE__: lalal
- __PUSH__: lalalaa
- __PULL__: sdf

If you installed the package __locally__ you must run the commands with the following syntax:
```
npm run localeawesome <cmd>
```
or
```
yarn localeawesome <cmd>
```

If you installed the package globally you have access to the cli everywhere, thus you can run:
```
localeawesome <cmd>
```
directly within the root folder of your project.
