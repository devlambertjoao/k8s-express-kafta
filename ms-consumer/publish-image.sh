#!/bin/bash
docker build -t devlambertjoao/ms-consumer:$1 .
docker push devlambertjoao/ms-consumer:$1
if [ $2 = "y" ]
then
    kubectl apply -f ../deploy/ms-consumer.yaml
fi