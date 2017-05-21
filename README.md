# louki
Locale Organization Utility CLI to manage your translation files and sync them with Localeapp. If your project uses [Localeapp](https://www.localeapp.com/) to manage locales translation remotely then this tool might come useful.


#### Preface
When working with locales through [Localeapp](https://www.localeapp.com/), the files containing translation keys can become extremely large and complex to be easily managed. This tool tries to bring more organization within locales in a project by using folders to separate keys and compile them into a single file that can easily be synchronized with Localeapp.

## Features
- Compile translation keys from a __folder structure__ source to a single `.yml` file.
- Synchronise with your __Localeapp__ project
- Update the source files in the folders when pulling from __Localeapp__.

## Installation

This package is most useful when installed globally, as CLI commands can just be ran through `louki [cmd]`, however it can be installed locally by project if necessary. Install `louki` locally if you already have `node` dependencies in your project:

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

#### Setup
To start using `louki` there is a minimal set up that needs to be taken care of first.

Create a `.loukirc` file where all the paths and locale information for the `louki` commands is specified. A normal usage set up file looks like this
```json
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
The key can be found in `Settings/API Key` in Localeapp. __DON'T__ commit this file as the key is secret. The key will be used to synchronise your files with the remote project.

#### Commands
There are 3 commands available:
- __UPDATE__: Takes the contents of the source files and compiles them into the single translation keys file, the default locale.
- __PUSH__: Runs _UPDATE_ and then synchronises the local compiled translation with your remote Localeapp project. If your default locale is `en` it will compile everything to `en.yml` and push it to the project.
- __PULL__: Will fetch _all_ the translations from Localeapp and update/create the individual locale files (e.g. `en.yml` and `fr.yml` if you have English and French translations). Then it will update your source files with any changes that might have been made on the remote project in the default locale.


If you installed the package globally you have access to the CLI everywhere, thus you can run:
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


#### Folder structure

Here is what a typical translation key file might look like:
```yml
en:
  topics:
    title: Some of the topics we cover
    marketing:
      title: Marketing
      feedback: Leave us some feedback!
      user_action:
        save: Save file
        cancel: Cancel
    tech:
      code: This is the code we use
      installation: How to install our software
  meta:
    meta_1: Our brand
    meta_2: Follow us
  username: Your username
  password: Your password
  welcome: Welcome aboard!
```

It is safe to assume that any large website can grow up to having more than 1000 of these keys. Thus to arrange keys into categories (folders), something like the following might be easier to search and maintain:

```
src
│
├── topics/
│   ├── marketing/
│   │   └── index.yml
│   │
│   ├── tech/
│   │   └── index.yml
│   │
│   ├── index.yml
│   └── manifest.json
│
├── index.yml
└── manifest.json
```

Where the contents of the `index.yml` files only contain key-value pairs, and the manifests contain the description of the folders within that directory. Thus the manifest in the `topics` folder would describe:

```json
{
  "marketing": "{{marketing}}",
  "technology": "{{tech}}"
}
```
The key defines the actual translation key, and the value specifies the folder where the tool will look for the child keys. This is done so that one can name a folder differently from the actual key name. The index file in the `marketing` folder contains the keys found under the `marketing` key in the large file above.

You may follow this example as a template for your own project. [Here](/examples) you can see the full example above with the folders and compiled file.



## License

MIT. See [LICENSE](LICENSE) for details.
