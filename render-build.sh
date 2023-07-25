#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn sequelize-cli db:migrate
yarn sequelize-cli db:seed:undo:all
yarn sequelize-cli db:seed:all
