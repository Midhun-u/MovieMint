#!/usr/bin/bash

server_name="theater_server"

echo "Startes to building container"
sudo docker build -t $server_name ./

echo "Container starts to run"
sudo docker run --network=host $server_name