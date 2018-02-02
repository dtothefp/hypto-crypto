#!/bin/bash
set -o errexit

docker login -u "$DOCKER_HUB_USERNAME" -p "$DOCKER_HUB_PASSWORD"
docker tag crypto_client:latest $DOCKER_HUB_USERNAME/crypto_client:$TRAVIS_TAG
docker push $DOCKER_HUB_USERNAME/crypto_client:$TRAVIS_TAG
