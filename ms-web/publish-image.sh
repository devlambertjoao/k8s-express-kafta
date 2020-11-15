#!/bin/bash
docker build -t devlambertjoao/ms-web:$1 .
docker push devlambertjoao/ms-web:$1
kubectl apply -f ../deploy/ms-web.yaml