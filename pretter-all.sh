#!/bin/bash

# This script will run prettier on all .js files in the client/src directory.
# see Dan for questions about this script

if ! [ -x "$(command -v prettier)" ]; then
	echo 'ERROR: you need to install prettier with "npm install -g prettier"' >&2
	exit 1
fi

prettier --write 'client/src/**/*.js'
prettier --write 'Sabio.Web/node-api/app/**/*.js'
