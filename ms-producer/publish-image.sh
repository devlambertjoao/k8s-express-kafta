#!/bin/bash
docker build -t devlambertjoao/ms-producer:$1 .
docker push devlambertjoao/ms-producer:$1