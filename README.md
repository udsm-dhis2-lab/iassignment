# Assignment App

DHIS2 application built for assigning various metadata including organisation units, data sets, programs etc. Aiming in simplifying the activity of assigning multiple metadata at once.

## Prerequisites

Make sure your environment has the following

> 1. [NodeJs (16 or higher)](https://nodejs.org)
> 2. [Angular CLI v17 or higher](https://github.com/angular/angular-cli)
> 3. [git](https://git-scm.com/downloads)

## Installation

1. Clone the repository from Git

```bash
git clone https://github.com/udsm-dhis2-lab/iassignment.git
```

2. Navigate to application root folder

```bash
cd iassignment
```

3. Install all required dependencies for the app.

```bash
npm install
```

OR

```bash
yarn install
```

## Development server

Execute the following command to run the application.

```bash
npm start
```

OR

```bash
yarn start
```

Navigate to [http://localhost:4200](http://localhost:4200).

> **NOTE**: This command will require proxy-config.json file available in the root of your source code, usually this file has this format.

```json
{
  "/api": {
    "target": "http://localhost:4200/dhis/",
    "secure": "false",
    "auth": "username:password",
    "changeOrigin": true
  },
  "/": {
    "target": "http://localhost:4200/dhis/",
    "secure": "false",
    "auth": "username:password",
    "changeOrigin": true
  }
}
```

We have provided `proxy-config.example.json` file as an example, make a copy and rename to `proxy-config.json`

## Build

To build the application, run

```bash
npm run build
```

OR

```bash
yarn build
```

The build artifacts will be stored in the dist/, this will include a zip file ready for deploying to any DHIS2 instance..

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
