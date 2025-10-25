#!/bin/bash

# Quick Auto-Commit Alias
# Usage: ./commit.sh [message]

if [ -n "$1" ]; then
    # Custom commit message provided
    echo "🚀 Auto-committing with custom message: $1"
    git add -A
    git commit -m "$1"
    git push
    echo "✅ Committed and pushed with custom message"
else
    # Use smart commit script
    echo "🚀 Using smart commit script..."
    ./smart-commit.sh
fi
