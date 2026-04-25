#!/usr/bin/bash

app_name="admin_dashboard"

echo "Starts to building container"
sudo docker build -t $app_name ./

echo "Container starts to run"
sudo docker run --network=host -p 5173:80 $app_name