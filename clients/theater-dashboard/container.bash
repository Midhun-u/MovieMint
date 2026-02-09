#!/usr/bin/bash

app_name="theater-dashboard"

echo "Starts to building container"
sudo docker build -t app $app_name ./

echo "Container starts to run"
sudo docker run --network=host -p 8080:80 $app_name