# k8s-express-kafta

## Gerar imagem e publicar:
    dentro de ms-producer e ms-consumer, existe um arquivo chamado ./publish-image.sh, basta rodar esse arquivo, e passar versao da imagem como parametro.
    Exemplo: ./publish-image 1.2.3

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
    Refatorar e crirar services para api e web socket no ms-web
    environments no ws-web
    Refactor ms-consumer e ms-producer (Não é o foco aqui, mas acho bom deixar mais claro e documentado)
    Após monitoramento ok, instalar também APMs no ms-consumer e ms-producer
    Criar um publish.sh default para publicar todo e qualquer serviço, também já alterando o deployment no kubernetes

obs: ms-producer e ms-consumer estão utilizando uma imagem postada por mim no dockerhub ->  https://hub.docker.com/u/devlambertjoao 

Para usar os dois serviços, use os environments PORT e KAFKA_BROKER
