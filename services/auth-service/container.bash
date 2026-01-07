#!/usr/bin/bash

sudo docker build -t app ./
sudo docker run --network=host app