#!/bin/bash
SERVER_ROOT=/home/ubuntu/desk-it/server

cd $SERVER_ROOT
pm2 kill
npm prod