#!/usr/bin/bash

app_name="app_frontend"

sudo docker build -t $app_name ./
sudo docker run $app_name