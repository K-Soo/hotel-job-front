#!/bin/bash

BRANCH=$VERCEL_GIT_COMMIT_REF

if [ "$BRANCH" == "main" ] || [ "$BRANCH" == "develop" ]; then
  echo "Build allowed for branch: $BRANCH"
  exit 1 
else
  echo "Build ignored for branch: $BRANCH"
  exit 0 
fi
