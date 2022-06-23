#!/bin/sh

# first run first command and second
# command docker build -t react-app .
command docker run --name some-nginx --rm -it -p 3030:80 react-app
