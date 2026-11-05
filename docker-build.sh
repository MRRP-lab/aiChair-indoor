#!/bin/bash
# Install dependencies
npm install -g eas-cli
npm ci # or yarn install

# Trigger the EAS local build
eas build --platform android -e preview --local