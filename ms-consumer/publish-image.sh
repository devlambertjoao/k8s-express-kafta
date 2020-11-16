#!/bin/bash
docker build -t devlambertjoao/ms-consumer:$1 .
docker push devlambertjoao/ms-consumer:$1
kubectl --record deployment.apps/ms-consumer set image deployment.v1.apps/ms-consumer ms-consumer=ms-consumer:$1
