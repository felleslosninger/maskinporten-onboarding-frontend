#!/bin/sh
envsubst < ./template.config.js > ./config.js;
serve -s -n