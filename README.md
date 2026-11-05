TaskFlow - Task Management Application

A modern, responsive task management app built with HTML, CSS, and JavaScript.

🚀 Live Demo

Try TaskFlow now: https://thomas-more-devops.github.io/taskflow-10-IADI3

## 📊 Project Status
![TaskFlow](https://img.shields.io/badge/TaskFlow-v1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/thomas-more-devops/taskflow-10-IADI3)
![GitHub issues](https://img.shields.io/github/issues/thomas-more-devops/taskflow-10-IADI3)
![GitHub pull requests](https://img.shields.io/github/issues-pr/thomas-more-devops/taskflow-10-IADI3)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)

🎓 Course Context

This project is part of the Bachelor International Business Management - Data Science, Protection & Security course at Thomas More University of Applied Sciences.

It demonstrates:

* Modern web development practices
* Git workflow and collaboration
* Professional project documentation
* Responsive design principles
* Continuous Integration using GitHub Actions
* Team-based software development

🚀 Features

Core Task Management

* ✅ Add Tasks: Create new tasks with a simple, intuitive interface.
* ✅ Mark Complete: Check off completed tasks.
* ✅ Edit Tasks: Modify existing task descriptions.
* ✅ Delete Tasks: Remove tasks you no longer need.
* ✅ Persistent Storage: Tasks are saved locally in your browser.
* ✅ Task Statistics: View total, completed, and pending tasks.
* ✅ Responsive Design: Works on desktop, tablet, and mobile devices.
* ✅ Modern UI: Clean interface with smooth animations.

Enhanced Task Management - v2.0.0

* ✅ Task Categories: Organize tasks into categories such as Work, Personal, and Shopping.
* ✅ Priority Levels: Assign High, Medium, or Low priority to tasks.
* ✅ Due Dates: Set deadlines for individual tasks.
* ✅ Search Tasks: Find tasks by searching their descriptions.
* ✅ Status Filtering: Filter tasks by All, Pending, or Completed.
* ✅ Category Filtering: Display tasks belonging to selected categories.
* ✅ Combined Filtering: Combine search and filters to find specific tasks.

🛠️ Technologies Used

* HTML5: Semantic markup and modern web standards.
* CSS3: Flexbox, Grid, custom properties, and animations.
* JavaScript ES6+: Classes, modern syntax, and application logic.
* Local Storage API: Client-side data persistence.
* Git: Version control and collaboration.
* GitHub: Repository hosting and project management.
* GitHub Actions: Continuous Integration and automated checks.
* Google Fonts: Inter font family for typography.

📱 Screenshots

Desktop View

Professional task management interface with task creation, categories, priorities, and filtering.

Mobile View

Fully responsive design that adapts to different screen sizes.

🏃 Quick Start

Prerequisites

* A modern web browser.
* Git (optional, for cloning the repository).

Installation

1. Clone the repository:

git clone https://github.com/thomas-more-devops/taskflow-10-IADI3.git

2. Navigate to the project directory:

cd taskflow-10-IADI3

3. Open index.html in your web browser.

No build process or additional dependencies are required.

Start managing your tasks immediately!

📋 Usage

Adding Tasks

1. Type your task in the input field.
2. Click “Add Task” or press Enter.
3. Your task appears in the task list.

Managing Tasks

* Complete: Click the checkbox next to a task.
* Edit: Use the edit option to modify the task.
* Delete: Use the delete option to remove a task.

Organizing Tasks

* Categories: Organize tasks into Work, Personal, Shopping, or other available categories.
* Priority: Assign High, Medium, or Low priority.
* Due Dates: Set deadlines to keep track of upcoming tasks.

Searching and Filtering

* Search: Find tasks by entering text.
* Status Filter: Display all, pending, or completed tasks.
* Category Filter: Filter tasks according to their category.
* Combined Filters: Apply search and filtering together.

Viewing Statistics

The statistics section displays:

* Total Tasks: All tasks you have created.
* Completed: Tasks you have finished.
* Pending: Tasks that still need attention.

💡 Learning Outcomes

Through this project, students learn:

* Git Version Control: Basic Git commands and branching strategies.
* GitHub Collaboration: Team workflows, code reviews, and pull requests.
* Professional Documentation: README writing and code documentation.
* Modern Web Development: HTML5, CSS3, and JavaScript ES6+.
* Responsive Design: Mobile-friendly layouts.
* Data Persistence: Local Storage API.
* User Experience: Interface design and accessibility.
* Continuous Integration: Automated workflows using GitHub Actions.
* Project Management: Issue tracking, milestones, and project organization.

🎯 Learning Objectives

This project demonstrates:

* Modern HTML5 semantic markup.
* CSS3 advanced features, including Grid, Flexbox, and animations.
* JavaScript ES6+ features.
* Local Storage API for data persistence.
* Responsive web design principles.
* Progressive enhancement.
* Accessibility best practices.
* Collaborative development using Git and GitHub.
* Basic CI pipeline implementation.

📁 Project Structure

taskflow-10-IADI3/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/
│   │   └── ci.yml
│   └── pull_request_template.md
├── docs/
│   ├── SETUP.md
│   ├── FEATURES.md
│   ├── ARCHITECTURE.md
│   └── CONTRIBUTING.md
├── scripts/
│   └── app.js
├── styles/
│   └── main.css
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── index.html
├── LICENSE
├── README.md
└── .gitignore

🛠️ Development Workflow

We use feature branches and pull requests to manage development.

# Get the latest changes
git pull origin main
# Create a feature branch
git checkout -b feature/feature-name
# Make your changes
# Stage changes
git add .
# Commit with a conventional message
git commit -m "feat: describe your changes"
# Push your branch
git push origin feature/feature-name
# Create a Pull Request on GitHub

All changes should be reviewed before being merged into the main branch.

📈 Performance and Compatibility

* Browser Support: Modern browsers, including Chrome, Firefox, Safari, and Edge.
* Responsive Design: Supports desktop, tablet, and mobile screen sizes.
* Performance: Lightweight application without a build process or external runtime dependencies.
* Accessibility: Uses semantic HTML and accessibility-related attributes.

🚀 Deployment

GitHub Pages

TaskFlow is deployed using GitHub Pages.

To configure deployment:

1. Push your code to the GitHub repository.
2. Navigate to Settings → Pages.
3. Select Deploy from a branch.
4. Choose the main branch.
5. Save the configuration.

Your application will be available at:

https://thomas-more-devops.github.io/taskflow-10-IADI3

Local Development

Simply open index.html in any modern web browser.

No local server or build process is required.

🌟 Key Features Explained

Local Storage Integration

Tasks are stored in the browser’s local storage, allowing them to persist across browser sessions.

// Example of saving tasks
saveTasks() {
    localStorage.setItem('taskflow_tasks', JSON.stringify(this.tasks));
}

Task Categories

Categories help users organize tasks into different groups, making task management easier.

Priority Management

Priority levels allow users to distinguish between important and less urgent tasks:

* 🔴 High
* 🟡 Medium
* 🟢 Low

Due Date Management

Users can assign deadlines to tasks to keep track of upcoming responsibilities.

Search and Filtering

Search and filtering help users quickly locate tasks based on descriptions, status, and categories.

🎨 Design Principles

Color Palette

* Primary: #667eea (Modern blue gradient)
* Secondary: #764ba2 (Complementary purple)
* Success: #48bb78 (Green for completed tasks)
* Warning: #ed8936 (Orange for notifications)
* Error: #e53e3e (Red for alerts)

Typography

* Font Family: Inter (Google Fonts)
* Hierarchy: Clear heading structure and font weights.
* Readability: Appropriate line height and spacing.

User Experience

* Intuitive Interface: Clear visual hierarchy.
* Immediate Feedback: Visual feedback for user interactions.
* Error Prevention: Input validation and error handling.
* Accessibility: Semantic HTML and ARIA attributes.

🔧 Advanced Features

Keyboard Navigation

* Enter: Add a new task when the input is focused.
* Tab: Navigate through interface elements.
* Space: Toggle task completion when the relevant control is focused.

Data Export

TaskFlow includes task export functionality for downloading task data.

Statistics Tracking

The application provides task statistics, including:

* Total tasks.
* Completed tasks.
* Pending tasks.

🤝 Contributing

We welcome contributions from students and developers!

Please read our Contributing Guidelines before submitting changes.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Commit your changes using conventional commit messages.
5. Push your branch.
6. Open a Pull Request for review.

For more details, check:

* Setup Guide
* Architecture Documentation
* Feature Documentation
* Contributing Guidelines

Commit Message Convention

feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add or update tests
chore: maintenance tasks

🧪 Testing

Manual Testing Checklist

* Add a new task.
* Edit an existing task.
* Mark a task as complete.
* Delete a task.
* Verify persistence after reloading the page.
* Assign a category to a task.
* Change task priority.
* Set a due date.
* Search for tasks.
* Filter tasks by status.
* Filter tasks by category.
* Test combined search and filtering.
* Test responsive design on different screen sizes.

Continuous Integration

GitHub Actions automatically runs the configured CI workflow when relevant repository events occur.

The pipeline includes:

* Code quality checks.
* Basic HTML and CSS validation.
* Repository and file checks.
* Build validation.
* Security-related checks.

📚 Resources

Learning Materials

* MDN Web Docs - Comprehensive web development documentation.
* JavaScript.info - Modern JavaScript tutorial.
* CSS-Tricks - CSS techniques and best practices.

Design Inspiration

* Dribbble - Task management UI designs.
* Behance - Web design inspiration.

📝 License

This project is open source and available under the MIT License.

📞 Course Support

Getting Help

* Instructor: Contact your course instructor.
* Course Materials: Available on the course platform.
* Discussion: Ask questions through the course discussion channels.

Technical Support

If you have questions or need help:

* 📧 Open an issue on GitHub.
* 📖 Check the project documentation.
* 💬 Review the inline code comments.
* 👥 Ask teammates during collaborative exercises.

🏆 Achievements

This TaskFlow application demonstrates:

* Modern Web Standards: HTML5, CSS3, and JavaScript ES6+.
* Best Practices: Professional development workflows.
* User-Centered Design: Focus on usability and accessibility.
* Maintainability: Clean and structured code.
* Collaboration: Team-based GitHub development.
* Automation: Continuous Integration using GitHub Actions.
* Release Management: Versioning and release documentation.

🎯 Future Enhancements

Potential improvements for future versions:

* Dark Mode: Toggle between light and dark themes.
* Collaboration: Share tasks with team members.
* Cloud Sync: Synchronize tasks across devices.
* Offline Mode: Support offline functionality using service workers.
* Notifications: Reminders for upcoming deadlines.

🙏 Acknowledgments

* Inter Font: Typography by Google Fonts.
* Icons: Unicode emoji set.
* Inspiration: Modern task management applications.
* Community: Open-source contributors and the web development community.
* Thomas More: Course instructors and fellow students.

🏆 Contributors

Thanks to all the students and developers who contributed to this project:

Course Contributors (Week 2 - Git Fundamentals)

* @LibanAbdullahi - Documentation improvements and setup guide.
* @SadmanUddin - CSS enhancements and responsive design.
* @Aiborfr - JavaScript functionality and error handling.
* @mehmetmetinerdemli - Testing, quality assurance, and project management.

How to Become a Contributor

1. Complete the setup instructions.
2. Pick an issue from our GitHub Issues.
3. Follow our contributing guidelines.
4. Submit a pull request for review.

🔄 Version History

See CHANGELOG.md for the detailed version history and the GitHub Releases page for published versions.

v2.0.0 - Enhanced Task Management

* ⭐ Task priority system with High, Medium, and Low levels.
* 📅 Due dates for tasks.
* 🗂️ Task categories with colour-coded badges.
* 🔍 Search tasks by text.
* 🎚️ Filtering by status and category.
* ✨ Improved task management experience.

v1.1.0 - Feature Release

* 🔍 Search tasks by text.
* 🎚️ Filter tasks by status.
* 🗂️ Task categories.
* 📄 Pull request template.
* 📖 Contributing guidelines and code of conduct.

v1.0.0 - Initial Release

* ✨ Core task management functionality.
* 🎨 Modern, responsive design.
* 💾 Local storage persistence.
* 📊 Basic statistics tracking.
* 🛡️ Error handling and input validation.


