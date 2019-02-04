#!/usr/bin/env bash

echo "Installing BootStrap 4..."
npm install --save bootstrap@4.0.0-beta.2
echo "Installing Font-awesome..."
#npm install jquery --save
#npm install popper.js --save
echo "add this lines on angular.json under scripts: []"
#"node_modules/jquery/dist/jquery.min.js",
#"node_modules/popper.js/dist/umd/popper.min.js",
#"node_modules/bootstrap/dist/js/bootstrap.min.js"
npm install --save font-awesome
echo "add this line on the style.css file."
echo "@import '~font-awesome/css/font-awesome.css'"
echo "Installing Loadash..."
npm install --save lodash
echo "Installing RXJS..."
npm install rxjs-compat --save
echo "Installing ngx-dhis2-http-client"
npm install ngx-dhis2-http-client --save
echo "Installing ngx-pipes for easy filtering"
npm install ngx-pipes --save
echo "Creating Store folder and sub-folders"
cd src/app/
mkdir store
cd store/
mkdir reducers && touch reducers/index.ts
mkdir actions && touch actions/index.ts
mkdir selectors && touch selectors/index.ts
mkdir effects && touch effects/index.ts
mkdir models && touch models/index.ts
cd ..
cd ..
echo "Installing NGRX-Store Effects, Dev-tools & Schematics to the project..."
npm install @ngrx/core @ngrx/store --save
npm install @ngrx/effects --save
npm install @ngrx/entity --save
npm install @ngrx/store-devtools --save
npm install @ngrx/schematics --save-dev
ng config cli.defaultCollection @ngrx/schematics
cd app/
ng generate @ngrx/schematics:store AppState --root --module app.module.ts
ng generate @ngrx/schematics:effect AppState --root --module app.module.ts
cd store/
echo "Initializing default state reducer..."
ng generate entity AppState --reducers reducers/index.ts
