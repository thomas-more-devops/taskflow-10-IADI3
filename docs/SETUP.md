# TaskFlow Setup Guide

> Complete installation and setup instructions for the TaskFlow task management application

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation Methods](#installation-methods)
- [Development Setup](#development-setup)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

## 🔧 Prerequisites

### Required Software
- **Web Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Git**: Version 2.20+ for version control
- **Text Editor**: VS Code, Sublime Text, or any modern editor (optional)

### Optional Tools
- **Node.js**: 14+ (for advanced development workflows)
- **Live Server Extension**: For VS Code users
- **GitHub Account**: For deployment and collaboration

## 🚀 Quick Start

### Method 1: Download and Run (Recommended for Beginners)

1. **Download the Project**
   ```bash
   # Download ZIP from GitHub
   # OR clone the repository
   git clone https://github.com/thomas-more-devops/taskflow-10-IADI3.git
   cd taskflow-10-IADI3
   ```

2. **Open in Browser**
   - Double-click on `index.html` 
   - OR drag `index.html` into your browser
   - OR use "File > Open" in your browser

3. **Start Using TaskFlow**
   - Add your first task in the input field
   - Press Enter or click "Add Task"
   - Manage your tasks with check, edit, and delete options

### Method 2: Git Clone (Recommended for Developers)

```bash
# Clone the repository
git clone https://github.com/thomas-more-devops/taskflow-10-IADI3.git

# Navigate to project directory
cd taskflow-10-IADI3

# Verify file structure
ls -la

# Open in browser
open index.html
# OR on Windows
start index.html
# OR on Linux
xdg-open index.html
```

## 🛠️ Installation Methods

### For Students (Course Work)

1. **GitHub Classroom Assignment**
   ```bash
   # Accept assignment from instructor
   # Repository will be automatically created
   git clone https://github.com/classroom/your-assignment-repo.git
   cd your-assignment-repo
   ```

2. **Fork and Clone**
   ```bash
   # Fork repository on GitHub
   # Clone your fork
   git clone https://github.com/YOUR-USERNAME/taskflow-10-IADI3.git
   cd taskflow-10-IADI3
   
   # Set upstream for updates
   git remote add upstream https://github.com/thomas-more-devops/taskflow-10-IADI3.git
   ```

### For Developers (Contribution)

1. **Development Environment**
   ```bash
   # Clone repository
   git clone https://github.com/thomas-more-devops/taskflow-10-IADI3.git
   cd taskflow-10-IADI3
   
   # Create development branch
   git checkout -b feature/your-feature-name
   
   # Start local server (optional)
   npx serve .
   # OR use VS Code Live Server extension
   ```

## 💻 Development Setup

### VS Code Setup (Recommended)

1. **Install VS Code Extensions**
   - Live Server (for local development server)
   - GitLens (for enhanced Git integration)
   - HTML CSS Support
   - JavaScript (ES6) code snippets
   - Prettier (for code formatting)

2. **Open Project**
   ```bash
   code taskflow
   ```

3. **Start Live Server**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Application will open at `http://localhost:5500`

### Browser Developer Tools

1. **Enable Developer Mode**
   - Chrome: F12 or Ctrl+Shift+I
   - Firefox: F12 or Ctrl+Shift+I
   - Safari: Cmd+Option+I (enable in Preferences first)

2. **Useful Features**
   - Console: View JavaScript logs and errors
   - Elements: Inspect HTML and CSS
   - Application: View localStorage data
   - Network: Monitor resource loading

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Enable GitHub Pages**
   ```bash
   # Push code to main branch
   git add .
   git commit -m "feat: initial TaskFlow setup"
   git push origin main
   ```

2. **Configure Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select source: "Deploy from a branch"
   - Choose "main" branch
   - Click Save

3. **Access Your Site**
   - URL: `https://thomas-more-devops.github.io/taskflow-10-IADI3`
   - Wait 2-5 minutes for initial deployment
   - Site updates automatically with new commits

### Alternative Deployment Options

#### Netlify Drop
1. Go to [netlify.com](https://netlify.com)
2. Drag your project folder to the deployment area
3. Get instant live URL

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# Follow prompts for configuration
```

#### Local Server (Development)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if installed)
npx serve .

# Access at http://localhost:8000
```

## 🔧 Troubleshooting

### Common Issues

#### Application Not Loading
**Symptoms**: Blank page, console errors
**Solutions**:
1. Check browser console for JavaScript errors
2. Verify all files are in correct locations:
   ```
   taskflow/
   ├── index.html
   ├── styles/main.css
   └── scripts/app.js
   ```
3. Ensure file names match exactly (case-sensitive)
4. Try hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

#### Styles Not Loading
**Symptoms**: Unstyled HTML content
**Solutions**:
1. Check `styles/main.css` exists
2. Verify CSS link in HTML: `<link rel="stylesheet" href="styles/main.css">`
3. Check browser Network tab for 404 errors
4. Clear browser cache

#### Tasks Not Persisting
**Symptoms**: Tasks disappear on page refresh
**Solutions**:
1. Check if localStorage is enabled in browser
2. Verify JavaScript is enabled
3. Try in incognito/private mode to test localStorage
4. Check browser console for storage errors

#### Git Issues
**Symptoms**: Can't push, authentication errors
**Solutions**:
1. Set up Git credentials:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```
2. Use Personal Access Token for GitHub authentication
3. Check repository permissions
4. Verify remote URL: `git remote -v`

### GitHub Pages Issues

#### Site Not Updating
**Solutions**:
1. Check Actions tab for deployment status
2. Wait 5-10 minutes for changes to propagate
3. Clear browser cache
4. Try incognito/private mode

#### 404 Error on GitHub Pages
**Solutions**:
1. Ensure `index.html` is in root directory
2. Check file name spelling (case-sensitive)
3. Verify Pages is enabled in repository settings
4. Check if repository is public (required for free GitHub Pages)

## 🆘 Support

### Getting Help

1. **Course Support**
   - Ask instructor during lab sessions
   - Post questions in course discussion forum
   - Work with teammates during collaborative exercises

2. **Documentation**
   - [Git Documentation](https://git-scm.com/doc)
   - [GitHub Docs](https://docs.github.com/)
   - [MDN Web Docs](https://developer.mozilla.org/)

3. **Community Resources**
   - Stack Overflow (tag: html, css, javascript)
   - GitHub Discussions
   - Discord/Slack course channels

### Before Asking for Help

1. **Check Error Messages**
   - Browser console errors
   - Git command output
   - GitHub Actions logs

2. **Try Basic Troubleshooting**
   - Hard refresh browser
   - Clear cache
   - Try different browser
   - Check file permissions

3. **Provide Context**
   - What were you trying to do?
   - What happened instead?
   - Error messages (copy exact text)
   - Browser and version
   - Operating system

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `index.html` opens in browser without errors
- [ ] TaskFlow header displays correctly with logo
- [ ] Can add new tasks using input field
- [ ] Tasks persist after browser refresh
- [ ] Can mark tasks as complete/incomplete
- [ ] Can edit task text
- [ ] Can delete tasks
- [ ] Statistics update correctly
- [ ] Application is responsive on mobile
- [ ] No console errors in browser developer tools
- [ ] GitHub Pages deployment is working (if applicable)

## 🎯 Next Steps

After successful setup:

1. **Explore the Code**
   - Review HTML structure in `index.html`
   - Understand CSS styling in `styles/main.css`
   - Examine JavaScript functionality in `scripts/app.js`

2. **Start Development**
   - Create feature branch: `git checkout -b feature/your-feature`
   - Make changes and test locally
   - Commit and push changes

3. **Learn More**
   - Complete GitHub Skills modules
   - Practice Git commands
   - Experiment with code modifications

---

**Need immediate help?** Check the [Troubleshooting](#troubleshooting) section or contact your instructor.

**Ready to contribute?** See our [Contributing Guidelines](CONTRIBUTING.md).
