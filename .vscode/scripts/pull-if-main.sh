#!/bin/bash

current_branch=$(git branch --show-current)
if [ "$current_branch" == "main" ]; then
  if git diff-index --quiet HEAD --; then
    git pull origin main
  fi
fi