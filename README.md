<img src="../../raw/develop/assets/hisptz.png" width="150" height="150" align="right" />

# INTERACTIVE ASSIGNMENTS[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

A utility tool custom built for DHIS2 environment tasks on assigning various metadata including organisation units, data sets, programs etc. Aiming in simplifying the activity of assigning multiple metadata at once.   

### Prerequisites
>- Java JDK v8 or later
>- Node Js v8 or later
>- Angular CLI v6 or later

### Installation

> * Clone the repository from Git
```angularjs
git clone https://github.com/hisptz/iassignments.git
```
> * Unzip the repository and open it. Execute the following npm command to install the application to your computer.
```angularjs
npm install
```
> * Once the application is installed and all its dependency hence execute the next command to run the application. 
```angularjs
npm start
```
> * NOTE: If you are required to proxy to remote server, create a json file 'proxy-config.json' inside root application folder and add the following lines( change the localhost port based on ports used by the app or change target to the server url to proxy data).
```angularjs
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

### Copyright

>Copyright ©2017 HISPTZ.
