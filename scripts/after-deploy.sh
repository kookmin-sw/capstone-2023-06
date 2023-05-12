#!/bin/bash
SERVER_ROOT=/home/ubuntu/desk-it/server
NODE_PATH=/home/ubuntu/.nvm/versions/node/v19.4.0/bin

cd $SERVER_ROOT
sudo $NODE_PATH/pm2 kill
sudo $NODE_PATH/npm run prod