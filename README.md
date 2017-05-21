# louki
Locale Organization Utility CLI to manage your translation files and sync them with Localeapp.

### Preface
If your project uses [Localeapp](https://www.localeapp.com/) to manage locales translation remotely  then this tool might come useful.


## Intro
When working with locales through [Localeapp](https://www.localeapp.com/), the files containing translation keys can become extremely large and complex to be easily managed. This tool tries to bring more organization within locales in a project by using folders to separate keys and compile them into a single file that can easily be synchronized with Localeapp.

## Features
- Compile translation keys from a __folder structure__ source to a single `.yml` file.
- Synchronise with your __Localeapp__ project
- Update the source files in the folders when pulling from __Localeapp__.

## Installation

This package is most useful when installed globally, as CLI commands can just be ran through `louki [cmd]`, however it can be installed locally by project if necessary.

1. Install `louki` locally if you already have `node` dependencies in your project:

 ```
 npm install louki
 ```
 or
 ```
 yarn add louki
 ```

 If you don't have `node` dependencies but still wish to use this package you can install it globally through
 ```
 npm install -g louki
 ```
 or
 ```
 yarn global add louki
 ```

 In this case make sure you have `node` already installed globally on your machine.

## Usage

### Setup
To start using `louki` there is a minimal set up that needs to be taken care of first.

Create a `.loukirc` file where all the paths and locale information for the `louki` commands is specified. A normal usage set up file looks like this
```
{
  "target": "locales",
  "source": "locales/src",
  "default": "en"
}
```

Where `target` is the path to the folder where your compiled translation keys file will be written, `source` is the root of your folder structure and `default` is the default language of your locales. `target` is also where all the locale files will be written to when pulling from Localeapp. In this example all local translation keys are in English, and the generated file (in `/locales`) is `en.yml`. It is this file that is then synchronised with Localeapp. The default locale should match the one in your remote  Localeapp project.

You should also add a line in your `.env` file (create one if you don't have it) with the field

```
LOCALEAPP_KEY="{your Localeapp key}"
```
The key can be found in `Settings/API Key`. __DON'T__ commit this file as the key is secret. The key will be used to synchronise your files with the remote project.

### Commands
There are 3 commands available:
- __UPDATE__: Takes the contents of the source locales and compiles them into the single translation keys file, the default locale.
- __PUSH__: Runs _UPDATE_ and then synchronises the local compiled translation with your remote Localeapp project. If your default locale is `en` it will compile everything to `en.yml` and push it to the project.
- __PULL__: Will fetch _all_ the translations from Localeapp and update/create the individual locale files (e.g. `en.yml` and `fr.yml` if you have English and French translations). Then it will update your source files with any changes that might have been made on the remote project.

If you installed the package __locally__ you must run the commands with the following syntax:
```
npm run louki <cmd>
```
or
```
yarn louki <cmd>
```

If you installed the package globally you have access to the cli everywhere, thus you can run:
```
louki <cmd>
```
directly within the root folder of your project. Thus for the above commands you would have:

```
louki update
louki push
louki pull
```

Were you to install `louki` locally, you can make your life easier by adding this line to your `package.json` scripts:

```
"louki": "node node_modules/.bin/louki"
```

to be able to call `npm run louki update` or better, `yarn louki update`.
