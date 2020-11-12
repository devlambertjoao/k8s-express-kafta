# k8s-express-kafta

## Em deploy:  

kubectl apply -f ms-zookeper-kafka.yaml
kubectl apply -f ms-consumer.yaml
kubectl apply -f ms-producer.yaml

- Para testar:

curl --location --request POST '192.168.49.2:30890' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "Teste"
}'

e veja o resultado em kubectl logs ms-consumer-* 

# Próximo passo:
    ELK Stack para observabilidade.

obs: ms-producer e ms-consumer estão utilizando uma imagem postada por mim no dockerhub ->  https://hub.docker.com/u/devlambertjoao 

Para usar os dois serviços, use os environments PORT e KAFKA_BROKER