#!/bin/bash

if [ -f "yarn.lock" ]; then
  yarn dev
elif [ -f "package-lock.json" ]; then
  npm run dev
else
  echo "No recognized package manager found."
fi