#!/usr/bin/bash

app_name="admin_dashboard"

sudo docker build -t $app_name ./
sudo docker run $app_name