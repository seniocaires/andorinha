# Andorinha

API para fazer download de vídeos do Youtube

### Construir a imagem
```
docker build -t andorinha .
```

### Rodar o container
```
docker run -it --rm -p 3000:3000 \
  -e ENVIRONMENT=production \
  -e SERVER_NAME=srv001 \
  -e SERVER_PORT=3000 \
  -e CORS_ORIGIN=* \
  andorinha
```

### Exemplo de utilização da API
[Arquivo do Postman](postman_collection.json)