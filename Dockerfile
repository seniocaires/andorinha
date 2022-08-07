#FROM node:16.16
FROM ubuntu:22.04

WORKDIR /opt/andorinha

ADD . .

RUN apt-get update -yq && \
    apt-get upgrade -yq && \
    apt-get install -yq && \
    apt-get install -yq curl youtube-dl && \
    curl -s https://deb.nodesource.com/setup_16.x | bash && \
    apt-get install -yq nodejs && \
    npm i
#RUN apt update && apt install -y youtube-dl && npm i

CMD [ "npm", "run", "start" ]
