#!/bin/bash
docker build -t devlambertjoao/ms-consumer:$1 .
docker push devlambertjoao/ms-consumer:$1
kubectl apply -f ../deploy/ms-consumer.yaml