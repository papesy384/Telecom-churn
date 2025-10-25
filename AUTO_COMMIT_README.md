# 🚀 Automatic Git Operations

Automated staging, committing, and pushing system for the Telecom Churn Prediction Dashboard.

## 📋 Available Scripts

### 1. **Smart Commit** (Recommended)
```bash
./smart-commit.sh
# or
npm run commit:smart
# or
npm run auto
```

**Features:**
- 🧠 **Intelligent commit messages** based on file types
- 📝 **Conventional commit format** (feat, fix, style, docs, test, chore)
- 🔍 **File analysis** to determine appropriate commit type
- 📊 **Detailed summary** with file counts and commit hash
- ⚡ **Automatic push** when needed

### 2. **Simple Auto Commit**
```bash
./auto-commit.sh
# or
npm run commit
```

**Features:**
- 📦 **Stages all changes** automatically
- 💾 **Basic commit message** with file list
- 🚀 **Automatic push** to remote
- ✅ **Simple and reliable**

### 3. **Custom Message Commit**
```bash
./commit.sh "Your custom commit message"
```

**Features:**
- 🎯 **Custom commit message** support
- 📦 **Auto-staging** of all changes
- 🚀 **Automatic push**
- 🔄 **Fallback to smart commit** if no message provided

## 🎯 Commit Message Types

The smart commit script automatically detects file types and generates appropriate commit messages:

| File Type | Commit Type | Scope | Example |
|-----------|-------------|-------|---------|
| `.html` | `feat` | `ui` | `feat(ui): Update HTML structure and content` |
| `.css` | `style` | `ui` | `style(ui): Update CSS styling and design` |
| `.js` | `feat` | `js` | `feat(js): Update JavaScript functionality` |
| `.json` | `chore` | `config` | `chore(config): Update configuration files` |
| `.md` | `docs` | `docs` | `docs(docs): Update documentation` |
| `test*` | `test` | `tests` | `test(tests): Update test files` |
| Other | `chore` | `general` | `chore(general): Update project files` |

## 📊 Example Output

```bash
🚀 Starting advanced automatic git operations...
📦 Staging all changes...
📝 Changed files (3):
index.html
minimal-antd.css
minimal-antd.js
💾 Committing changes with message: feat(ui): Update HTML structure and content
[main abc1234] feat(ui): Update HTML structure and content
 3 files changed, 150 insertions(+), 5 deletions(-)
🚀 Pushing to remote repository...
To https://github.com/papesy384/Telecom-churn.git
   def5678..abc1234  main -> main
✅ Successfully pushed to remote

✅ Advanced automatic git operations completed successfully!
📊 Summary:
   - Files staged: 3
   - Commit type: feat(ui)
   - Commit hash: abc1234
   - Branch: main
   - Remote status: 0 unpushed commits
```

## 🔧 Setup Instructions

### 1. **Make Scripts Executable** (Already Done)
```bash
chmod +x auto-commit.sh
chmod +x smart-commit.sh
chmod +x commit.sh
```

### 2. **Use NPM Scripts**
```bash
# Smart commit (recommended)
npm run auto

# Simple commit
npm run commit

# Smart commit (alternative)
npm run commit:smart
```

### 3. **Direct Script Execution**
```bash
# Smart commit
./smart-commit.sh

# Simple commit
./auto-commit.sh

# Custom message
./commit.sh "Fix bug in customer data processing"
```

## 🎯 Usage Examples

### **Daily Development Workflow**
```bash
# After making changes
npm run auto

# Output: Automatically stages, commits with smart message, and pushes
```

### **Feature Development**
```bash
# After completing a feature
./commit.sh "feat: Add customer risk scoring algorithm"

# Output: Commits with custom message and pushes
```

### **Bug Fixes**
```bash
# After fixing a bug
./commit.sh "fix: Resolve modal display issue on mobile"

# Output: Commits with custom message and pushes
```

### **Documentation Updates**
```bash
# After updating docs
npm run auto

# Output: Automatically detects .md files and uses docs commit type
```

## 🔍 What Gets Committed

**All Changes Are Included:**
- ✅ Modified files
- ✅ New files
- ✅ Deleted files
- ✅ Renamed files
- ✅ Staged and unstaged changes

**Safety Features:**
- 🔍 **Pre-commit checks** - Only commits if there are changes
- 📝 **Detailed logging** - Shows exactly what's being committed
- 🚀 **Automatic push** - Only pushes if there are commits to push
- ⚠️ **Error handling** - Graceful failure with clear messages

## 🚨 Safety Notes

1. **Always Review Changes**: The scripts stage ALL changes automatically
2. **Backup Important Work**: Consider creating branches for major changes
3. **Test Before Committing**: Run tests before using auto-commit
4. **Check Remote Status**: Scripts will show if push is needed

## 🔄 Integration with Development Workflow

### **VS Code Integration**
Add to your VS Code tasks.json:
```json
{
    "label": "Auto Commit",
    "type": "shell",
    "command": "./smart-commit.sh",
    "group": "build"
}
```

### **Git Hooks Integration**
The scripts work well with pre-commit hooks for additional validation.

### **CI/CD Integration**
These scripts can be used in CI/CD pipelines for automated deployments.

## 📈 Benefits

- ⚡ **Faster Development**: No more manual git commands
- 🧠 **Smart Messages**: Automatic commit message generation
- 📊 **Better History**: Consistent commit message format
- 🔄 **Automated Workflow**: One command does everything
- 📝 **Detailed Logging**: Clear feedback on what's happening
- 🚀 **Immediate Push**: Changes are immediately available

## 🎉 Quick Start

**For immediate use:**
```bash
npm run auto
```

This will automatically stage, commit with a smart message, and push all your changes!

---

**Happy Auto-Committing! 🚀✨**
