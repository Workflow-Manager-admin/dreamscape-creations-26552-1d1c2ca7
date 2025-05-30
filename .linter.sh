#!/bin/bash
cd /home/kavia/workspace/code-generation/dreamscape-creations-26552-1d1c2ca7/dreamscapes_creation
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

