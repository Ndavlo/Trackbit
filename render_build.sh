#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pipenv install
# Si hay archivos de claves se deben copiar desde la carpeta /etc/secrets
# a esta carpeta se suben los archivos desde la configuracion del entorno
cp /etc/secrets/firebase_credentials.json ./firebase_credentials.json 


rm -R -f ./migrations && 
pipenv run init && 
pipenv run migrate && 
pipenv run upgrade 
