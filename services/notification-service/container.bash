#!/usr/bin/bash

server_name="notification_service"

echo "Starts to building container"
sudo docker build -t $server_name ./

echo "Container starts to run"
sudo docker run --network=host $server_name