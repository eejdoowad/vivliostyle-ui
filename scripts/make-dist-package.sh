#!/bin/bash
set -ev

dist=vivliostyle-js-viewer-$1
mkdir ${dist}
cp -R dist/* ${dist}/
mkdir ${dist}/viewer/
cp -R build/* ${dist}/viewer/
cp scripts/start-webserver* ${dist}/
cp -R node_modules/vivliostyle/samples ${dist}/
zip -qr vivliostyle-js-viewer-latest.zip ${dist}
rm -rf ${dist}
