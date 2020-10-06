#!/bin/bash

if [ $# -eq 0 ]; then
    buildEnv="homolog"
elif [ $1 = "prod" ]; then
    buildEnv=$1
fi

case $buildEnv in
    "homolog") echo
        npm run build-homolog
        gzip -vrk dist/homolog-placeet/
        scp -r dist/homolog-placeet/ root@placeet:/var/www/
    ;;
    "prod") echo
        npm run build-prod
        gzip -vrk dist/placeet/
        scp -r dist/placeet/ root@placeet:/var/www/
    ;;
esac
