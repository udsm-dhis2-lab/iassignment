#!/usr/bin/env bash
ng build --prod --aot --build-optimizer
mv dist/assets/manifest.webapp dist/
# cp -r dist/* /opt/dhis/config/apps/iassignments/
cd dist/i-assignments/
#Compress the file
echo "Compressing the file..."
zip -r -D iassignments.zip .
echo "Installing the app into dhis.hisptz.org/dev..."
curl -X POST -u ibrahimwickama:ibrahim@hispTz1 -F file=@iassignments.zip https://dhis.hisptz.org/dev/api/apps
echo "Installing the app into DHIS Play on play.dhis2.org/28..."
curl -X POST -u admin:district -F file=@iassignments.zip https://play.dhis2.org/2.28/api/apps
echo "Installing the app into DHIS Play on play.dhis2.org/29..."
curl -X POST -u system:System123 -F file=@iassignments.zip https://play.dhis2.org/2.29/api/apps
echo "Installing the app into DHIS Play on play.dhis2.org/30..."
curl -X POST -u system:System123 -F file=@iassignments.zip https://play.dhis2.org/2.30/api/apps
#echo "Installing the app into DHIS Nutrition on dhis.hisptz.org/nutrition/..."
#curl -X POST -u admin:district -F file=@iassignments.zip https://nutrition.hisptz.org/nutrition/api/apps
echo "Successful installed the app"

