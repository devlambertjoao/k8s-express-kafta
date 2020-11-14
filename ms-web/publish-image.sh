#!/bin/bash
docker build -t devlambertjoao/ms-web:$1 .
docker push devlambertjoao/ms-web:$1