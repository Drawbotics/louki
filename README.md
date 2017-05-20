# louki
Locale Organization Utility to manage your translation files and sync them with Localeapp.

<!-- ### Preface
If you have the following:
- A Localeapp project and its access key available
- `node` installed globally or locally for your project

then this package might come useful. -->

## Intro
When working with locales through [Localeapp](https://www.localeapp.com/), the files containing translation keys can become extremely large and complex to be easily managed. This tool tries to bring more organization within locales in a project by using folders to separate keys and compile them into a single file that can easily be synchronized with Localeapp.

## Features
- Compile translation keys from a _folder structure_ source to a single `.yml` file.
- Synchronise with your *Localeapp* project
- Update the source files in the folders when pulling from *Localeapp*.

## Installation

<!-- 2. You may now install `louki` locally if you already have `node` dependencies in your project or if you need all collaborators to install this package.

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

 In this case make sure you have `node` already installed globally on your machine. -->

## Usage

### Setup
<!-- To start using `louki` there is a minimal set up that needs to be taken care of first.

Create a `.loukirc` file where all the paths and locale information for the `louki` commands is specified. A normal usage set up file looks like this
```
{
  "target": "config/locales",
  "source": "config/locales/src",
  "default": "en"
}
```

Where `target` is the path to the folder where your compiled translation key file will be written, `source` is the root of your folder structure and `default` is the default language of your locales. In this example all local translation keys are in English, and the generated file (in `/config/locales`) is `en.yml`. It is this file that is then synchronised with Localeapp. The default locale should match the one in your remote  Localeapp project. -->

### Commands
<!-- There are 3 commands available:
- __UPDATE__: lalal
- __PUSH__: lalalaa
- __PULL__: sdf

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
directly within the root folder of your project. -->
