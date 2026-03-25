#!/usr/bin/bash

server_name="movie_service"

echo "Starts to building container"
sudo docker build -t $server_name ./

echo "Container starts to run"
sudo docker run --network=host --name=$server_name $server_name