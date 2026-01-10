#!/usr/bin/bash

server_name="media_server"

sudo docker build -t $server_name ./
sudo docker run --network=host $server_name