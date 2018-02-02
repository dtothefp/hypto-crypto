#!/bin/sh
set -o errexit

cd /www/data

git init

git config --global user.email "travis@travis.org"
git config --global user.name "Travis CI"

git add .
git commit -m "Deploy to Github Pages"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/dtothefp/hypto-crypto.git" master:gh-pages > /dev/null 2>&1
