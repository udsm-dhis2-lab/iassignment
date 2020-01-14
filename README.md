[![Build Status](https://travis-ci.org/interactive-apps/iassignments.svg?branch=master)](https://travis-ci.org/interactive-apps/iassignments)
[![Greenkeeper badge](https://badges.greenkeeper.io/interactive-apps/iassignments.svg)](https://greenkeeper.io/)  [![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/interactive-apps/iassignments/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/interactive-apps/iassignments/test_coverage)

# INTERACTIVE ASSIGNMENTS

A utility tool custom built for DHIS2 environment tasks on assigning various metadata including organisation units, data sets, programs etc. Aiming in simplifying the activity of assigning multiple metadata at once.   

### Prerequisites
>- Node Js v8 or later
>- npm
>- Angular CLI v6 or later
>- git

### Installation

> * Clone the repository from Git
```bash
$ git clone https://github.com/hisptz/iassignments.git
```
> * Go into iassignements directory then xecute the following npm command to install the application to your computer.
```bash
$ npm install
```
> * Once the application is installed and all its dependency hence execute the next command to run the application. 
```bash
$ npm start
```
> * NOTE: If you are required to proxy to remote server, create a json file 'proxy-config.json' inside root application folder and add the following lines( change the localhost port based on ports used by the app or change target to the server url to proxy data).
```json
 {
       "/api": {
                  "target": "http://localhost:4200/dhis/",
                   "secure": "false",
                   "auth":"username:password",
                   "changeOrigin": true
                },
         "/": {
                   "target": "http://localhost:4200/dhis/",
                   "secure": "false",
                   "auth":"username:password",
                   "changeOrigin": true
               }
     }
```
