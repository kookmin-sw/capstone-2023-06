#!/bin/bash
SERVER_ROOT=/home/ubuntu/desk-it/server

cd $SERVER_ROOT
sudo pm2 kill
sudo npm run prod