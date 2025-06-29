#!/bin/bash
cd /home/kavia/workspace/code-generation/notesphere-94874-b429d80d/notes_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

