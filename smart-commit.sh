#!/bin/bash

# Advanced Automatic Git Operations Script
# Intelligently stages, commits, and pushes changes with smart commit messages

echo "🚀 Starting advanced automatic git operations..."

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
FILE_COUNT=$(echo "$CHANGED_FILES" | wc -l | tr -d ' ')

echo "📝 Changed files ($FILE_COUNT):"
echo "$CHANGED_FILES"

# Analyze changes to generate smart commit message
COMMIT_TYPE="Update"
COMMIT_SCOPE=""
COMMIT_DESCRIPTION=""

# Check for specific file types and generate appropriate messages
if echo "$CHANGED_FILES" | grep -q "\.html$"; then
    COMMIT_TYPE="feat"
    COMMIT_SCOPE="ui"
    COMMIT_DESCRIPTION="Update HTML structure and content"
elif echo "$CHANGED_FILES" | grep -q "\.css$"; then
    COMMIT_TYPE="style"
    COMMIT_SCOPE="ui"
    COMMIT_DESCRIPTION="Update CSS styling and design"
elif echo "$CHANGED_FILES" | grep -q "\.js$"; then
    COMMIT_TYPE="feat"
    COMMIT_SCOPE="js"
    COMMIT_DESCRIPTION="Update JavaScript functionality"
elif echo "$CHANGED_FILES" | grep -q "\.json$"; then
    COMMIT_TYPE="chore"
    COMMIT_SCOPE="config"
    COMMIT_DESCRIPTION="Update configuration files"
elif echo "$CHANGED_FILES" | grep -q "\.md$"; then
    COMMIT_TYPE="docs"
    COMMIT_SCOPE="docs"
    COMMIT_DESCRIPTION="Update documentation"
elif echo "$CHANGED_FILES" | grep -q "test"; then
    COMMIT_TYPE="test"
    COMMIT_SCOPE="tests"
    COMMIT_DESCRIPTION="Update test files"
else
    COMMIT_TYPE="chore"
    COMMIT_SCOPE="general"
    COMMIT_DESCRIPTION="Update project files"
fi

# Generate detailed commit message
COMMIT_MESSAGE="$COMMIT_TYPE($COMMIT_SCOPE): $COMMIT_DESCRIPTION

- $FILE_COUNT files changed
- Files: $(echo "$CHANGED_FILES" | tr '\n' ' ' | sed 's/ $//')
- Timestamp: $(date '+%Y-%m-%d %H:%M:%S')
- Auto-generated commit"

# Commit changes
echo "💾 Committing changes with message: $COMMIT_TYPE($COMMIT_SCOPE): $COMMIT_DESCRIPTION"
git commit -m "$COMMIT_MESSAGE"

# Check if push is needed
if git status | grep -q "Your branch is ahead"; then
    echo "🚀 Pushing to remote repository..."
    git push
    echo "✅ Successfully pushed to remote"
else
    echo "ℹ️  No push needed - branch is up to date"
fi

echo ""
echo "✅ Advanced automatic git operations completed successfully!"
echo "📊 Summary:"
echo "   - Files staged: $FILE_COUNT"
echo "   - Commit type: $COMMIT_TYPE($COMMIT_SCOPE)"
echo "   - Commit hash: $(git rev-parse --short HEAD)"
echo "   - Branch: $(git branch --show-current)"
echo "   - Remote status: $(git status --porcelain=2 | grep -c '^u' || echo '0') unpushed commits"
