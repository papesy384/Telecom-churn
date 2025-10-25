#!/bin/bash

# Automatic Git Operations Script
# Stages, commits, and pushes all changes automatically

echo "🚀 Starting automatic git operations..."

# Check if there are any changes
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ No changes to commit"
    exit 0
fi

# Stage all changes
echo "📦 Staging all changes..."
git add -A

# Get the list of changed files
CHANGED_FILES=$(git diff --cached --name-only)
echo "📝 Changed files:"
echo "$CHANGED_FILES"

# Generate commit message based on file types
COMMIT_MESSAGE="Auto-commit: Update project files

- $(echo "$CHANGED_FILES" | wc -l | tr -d ' ') files changed
- Files: $(echo "$CHANGED_FILES" | tr '\n' ' ' | sed 's/ $//')
- Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"

# Commit changes
echo "💾 Committing changes..."
git commit -m "$COMMIT_MESSAGE"

# Push to remote
echo "🚀 Pushing to remote repository..."
git push

echo "✅ Automatic git operations completed successfully!"
echo "📊 Summary:"
echo "   - Files staged: $(echo "$CHANGED_FILES" | wc -l | tr -d ' ')"
echo "   - Commit hash: $(git rev-parse --short HEAD)"
echo "   - Branch: $(git branch --show-current)"
