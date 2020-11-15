#!/bin/bash
docker build -t devlambertjoao/ms-producer:$1 .
docker push devlambertjoao/ms-producer:$1
if [ $2 = "y" ]
then
    kubectl apply -f ../deploy/ms-producer.yaml
fi