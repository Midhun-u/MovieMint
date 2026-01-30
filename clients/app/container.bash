#!/usr/bin/bash

app_name="app_frontend"

echo "Starts to building container"
sudo docker build -t $app_name ./

echo "Container starts to run"
sudo docker run --network=host $app_name