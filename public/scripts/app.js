'use strict'

/**
 * TaskFlow
 * Task management application.
 *
 * Features:
 * - Create, edit, delete and complete tasks
 * - Work, Personal and Shopping categories
 * - Search tasks by description
 * - Filter tasks by completion status
 * - Filter tasks by category
 * - Persist tasks and categories in Local Storage
 * - Support legacy tasks without categories
 */

class TaskFlow {
  constructor () {
    // Preserve the startup error handling from the main branch.
    try {
      this.storageKey = 'taskflow_tasks'
      this.counterKey = 'taskflow_counter'

      this.categories = ['Work', 'Personal', 'Shopping']

      // Ordered most urgent first; the index doubles as the sort rank.
      this.priorities = ['High', 'Medium', 'Low']

      // Applied to tasks saved before priorities existed.
      this.defaultPriority = 'Medium'

      // Category, priority, search and status filters.
      this.activeCategory = 'All'
      this.activePriority = 'All'
      this.searchQuery = ''
      this.currentFilter = 'all'
      this.currentDueDateFilter = 'all'

      this.tasks = this.loadTasks()
      this.taskIdCounter = this.getNextTaskId()

      this.initializeApp()
      this.bindEvents()
      this.renderTasks()
      this.updateStats()
      this.setDefaultDueDate()
    } catch (error) {
      console.error('TaskFlow failed to start:', error)

      this.showNotification(
        'TaskFlow failed to start. Please reload the page.',
        'error'
      )

      throw error
    }
  }

  // ========================================
  // Initialization
  // ========================================

  initializeApp () {
    console.log('TaskFlow initialized successfully.')
  }

  /**
     * Returns a required HTML element by ID.
     */
  getElement (id) {
    const element = document.getElementById(id)

    if (!element) {
      throw new Error(`Required HTML element not found: ${id}`)
    }

    return element
  }

  setDefaultDueDate () {
    // Set default due date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dueDateInput = document.getElementById('dueDateInput')
    dueDateInput.value = tomorrow.toISOString().split('T')[0]
  }

  /**
     * Connects the application to HTML events.
     */
  bindEvents () {
    const addTaskBtn = this.getElement('addTaskBtn')
    const taskInput = this.getElement('taskInput')
    const categoryInput = this.getElement('taskCategory')
    const categoryFilter = this.getElement('categoryFilter')
    const priorityInput = this.getElement('taskPriority')
    const priorityFilter = this.getElement('priorityFilter')
    const searchInput = this.getElement('searchInput')

    addTaskBtn.addEventListener('click', () => {
      this.addTask()
    })

    taskInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.addTask()
      }
    })

    taskInput.addEventListener('input', () => {
      taskInput.setCustomValidity('')
    })

    categoryInput.addEventListener('change', () => {
      if (!this.categories.includes(categoryInput.value)) {
        categoryInput.setCustomValidity('Please select a valid category.')
      } else {
        categoryInput.setCustomValidity('')
      }
    })

    priorityInput.addEventListener('change', () => {
      if (!this.priorities.includes(priorityInput.value)) {
        priorityInput.setCustomValidity('Please select a valid priority.')
      } else {
        priorityInput.setCustomValidity('')
      }
    })

    // Category filtering.
    categoryFilter.addEventListener('change', (event) => {
      this.activeCategory = event.target.value
      this.renderTasks()
    })

    // Priority filtering.
    priorityFilter.addEventListener('change', (event) => {
      this.activePriority = event.target.value
      this.renderTasks()
    })

    // Search filtering.
    searchInput.addEventListener('input', (event) => {
      this.searchQuery = event.target.value
      this.renderTasks()
    })

    // Status filtering.
    document.querySelectorAll('.filter-btn').forEach((button) => {
      button.addEventListener('click', () => {
        this.setFilter(button.dataset.filter)
      })
    })

    // Due date filter buttons
    document.querySelectorAll('.due-date-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setDueDateFilter(e.target.dataset.filter)
      })
    })

    // Focus on the task input when the page loads.
    taskInput.focus()
  }

  /**
     * Changes the active completion-status filter.
     */
  setFilter (filter) {
    const validFilters = ['all', 'pending', 'completed']

    if (!validFilters.includes(filter)) {
      return
    }

    this.currentFilter = filter

    document.querySelectorAll('.filter-btn').forEach((button) => {
      const isActive = button.dataset.filter === filter

      button.classList.toggle('active', isActive)
      button.setAttribute('aria-pressed', String(isActive))
    })

    this.renderTasks()
  }

  // ========================================
  // Create Tasks
  // ========================================

  /**
     * Creates a task using the description and selected category.
     */
  addTask () {
    const taskInput = this.getElement('taskInput')
    const categoryInput = this.getElement('taskCategory')
    const priorityInput = this.getElement('taskPriority')

    const dueDate = this.getElement('dueDateInput').value
    const taskText = taskInput.value.trim()
    const category = categoryInput.value
    const priority = priorityInput.value
    const MAX_TASK_LENGTH = 500

    if (!taskText) {
      this.showNotification(
        'Please enter a task description.',
        'warning'
      )

      taskInput.focus()
      return
    }

    if (taskText.length > MAX_TASK_LENGTH) {
      this.showNotification(
                `Task descriptions cannot exceed ${MAX_TASK_LENGTH} characters.`,
                'warning'
      )

      taskInput.focus()
      return
    }

    if (!this.categories.includes(category)) {
      this.showNotification(
        'Please select a valid category.',
        'warning'
      )

      categoryInput.focus()
      return
    }

    if (!this.priorities.includes(priority)) {
      this.showNotification(
        'Please select a valid priority.',
        'warning'
      )

      priorityInput.focus()
      return
    }

    const newTask = {
      id: this.taskIdCounter++,
      text: taskText,
      category,
      priority,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    }

    this.tasks.push(newTask)

    this.saveTasks()
    this.renderTasks()
    this.updateStats()

    taskInput.value = ''
    this.setDefaultDueDate()
    taskInput.focus()

    this.showNotification(
      'Task added successfully!',
      'success'
    )
  }

  // ========================================
  // Delete Tasks
  // ========================================

  /**
     * Deletes a task by ID.
     */
  deleteTask (id) {
    const task = this.tasks.find((item) => item.id === id)

    if (!task) {
      this.showNotification('Task not found.', 'error')
      return
    }

    this.tasks = this.tasks.filter((item) => item.id !== id)

    this.saveTasks()
    this.renderTasks()
    this.updateStats()

    this.showNotification(
      'Task deleted successfully!',
      'success'
    )
  }

  // ========================================
  // Complete Tasks
  // ========================================

  /**
     * Toggles a task's completion status.
     */
  toggleTask (id) {
    const task = this.tasks.find((item) => item.id === id)

    if (!task) {
      this.showNotification('Task not found.', 'error')
      return
    }

    task.completed = !task.completed

    task.completedAt = task.completed
      ? new Date().toISOString()
      : null

    this.saveTasks()
    this.renderTasks()
    this.updateStats()
  }

  // ========================================
  // Edit Tasks
  // ========================================

  /**
     * Allows the user to edit a task's description.
     */
  editTask (id) {
    const task = this.tasks.find((item) => item.id === id)

    if (!task) {
      this.showNotification('Task not found.', 'error')
      return
    }

    const newText = prompt('Edit your task:', task.text)

    if (newText === null) {
      return
    }

    const updatedText = newText.trim()
    const MAX_TASK_LENGTH = 500

    if (!updatedText) {
      this.showNotification(
        'Task description cannot be empty.',
        'warning'
      )
      return
    }

    if (updatedText.length > MAX_TASK_LENGTH) {
      this.showNotification(
                `Task descriptions cannot exceed ${MAX_TASK_LENGTH} characters.`,
                'warning'
      )
      return
    }

    task.text = updatedText

    this.saveTasks()
    this.renderTasks()
    this.updateStats()

    this.showNotification(
      'Task updated successfully!',
      'success'
    )
  }

  // ========================================
  // Category Management
  // ========================================

  /**
     * Returns a task's category.
     * Legacy tasks without a category are treated as Uncategorized.
     */
  getTaskCategory (task) {
    if (
      task.category &&
            this.categories.includes(task.category)
    ) {
      return task.category
    }

    return 'Uncategorized'
  }

  /**
     * Returns the CSS class for a category badge.
     */
  getCategoryClass (category) {
    const categoryClasses = {
      Work: 'category-work',
      Personal: 'category-personal',
      Shopping: 'category-shopping',
      Uncategorized: 'category-uncategorized'
    }

    return categoryClasses[category] || 'category-uncategorized'
  }

  /**
     * Returns tasks matching the selected category.
     */
  getTasksByCategory (tasks) {
    if (this.activeCategory === 'All') {
      return tasks
    }

    if (this.activeCategory === 'Uncategorized') {
      return tasks.filter((task) => {
        return this.getTaskCategory(task) === 'Uncategorized'
      })
    }

    return tasks.filter((task) => {
      return this.getTaskCategory(task) === this.activeCategory
    })
  }

  // ========================================
  // Priorities
  // ========================================

  /**
     * Returns a task's priority, falling back to the default for tasks
     * saved before priorities existed or with an unrecognised value.
     */
  getTaskPriority (task) {
    if (
      task.priority &&
            this.priorities.includes(task.priority)
    ) {
      return task.priority
    }

    return this.defaultPriority
  }

  /**
     * Returns the CSS class for a priority badge.
     */
  getPriorityClass (priority) {
    const priorityClasses = {
      High: 'priority-high',
      Medium: 'priority-medium',
      Low: 'priority-low'
    }

    return priorityClasses[priority] || 'priority-medium'
  }

  /**
     * Sort rank for a task: 0 is the most urgent. Taken from the position
     * in this.priorities, so adding a level needs no change here.
     */
  getPriorityRank (task) {
    return this.priorities.indexOf(this.getTaskPriority(task))
  }

  /**
     * Returns tasks matching the selected priority.
     */
  getTasksByPriority (tasks) {
    if (this.activePriority === 'All') {
      return tasks
    }

    return tasks.filter((task) => {
      return this.getTaskPriority(task) === this.activePriority
    })
  }

  // ========================================
  // Search and Combined Filtering
  // ========================================

  setDueDateFilter (filter) {
    this.currentDueDateFilter = filter

    // Update button states
    document.querySelectorAll('.due-date-filter-btn').forEach(btn => {
      btn.classList.remove('active')
    })
    document.querySelector(`.due-date-filter-btn[data-filter="${filter}"]`).classList.add('active')

    this.renderTasks()
  }

  matchesDueDateFilter (task) {
    const today = new Date().toISOString().split('T')[0]

    switch (this.currentDueDateFilter) {
      case 'all':
        return true
      case 'due-today':
        return task.dueDate === today
      case 'overdue':
        return task.dueDate && task.dueDate < today && !task.completed
      case 'no-due-date':
        return !task.dueDate
      default:
        return true
    }
  }

  getFilteredTasks () {
    return this.tasks.filter(task => this.matchesDueDateFilter(task))
  }

  isOverdue (task) {
    if (!task.dueDate || task.completed) return false
    const today = new Date().toISOString().split('T')[0]
    return task.dueDate < today
  }

  isDueToday (task) {
    if (!task.dueDate) return false
    const today = new Date().toISOString().split('T')[0]
    return task.dueDate === today
  }

  formatDueDate (dateString) {
    if (!dateString) return ''

    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const taskDate = date.toDateString()
    const todayString = today.toDateString()
    const tomorrowString = tomorrow.toDateString()

    if (taskDate === todayString) {
      return 'Today'
    } else if (taskDate === tomorrowString) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      })
    }
  }

  /**
     * Returns tasks matching search, status and category.
     * All filters are applied together.
     */
  getVisibleTasks () {
    const query = this.searchQuery.trim().toLowerCase()

    // First, apply search and completion-status filtering.
    const matchingTasks = this.tasks.filter((task) => {
      const matchesSearch = task.text
        .toLowerCase()
        .includes(query)

      const matchesStatus =
                this.currentFilter === 'all' ||
                (
                  this.currentFilter === 'completed' &&
                    task.completed
                ) ||
                (
                  this.currentFilter === 'pending' &&
                    !task.completed
                )

      return matchesSearch && matchesStatus
    })

    // Then narrow by category, priority and due date in turn.
    // Order does not affect the result, only readability.
    const byCategory = this.getTasksByCategory(matchingTasks)

    return this.getTasksByPriority(byCategory)
      .filter((task) => this.matchesDueDateFilter(task))
  }

  // ========================================
  // Render Tasks
  // ========================================

  /**
     * Displays the tasks matching all active filters.
     */
  renderTasks () {
    const tasksList = this.getElement('tasksList')
    const emptyState = this.getElement('emptyState')
    const noResults = this.getElement('noResults')

    // No tasks exist at all.
    if (this.tasks.length === 0) {
      tasksList.innerHTML = ''
      tasksList.style.display = 'none'
      emptyState.style.display = 'block'
      noResults.style.display = 'none'
      return
    }

    // Tasks exist, so the general empty state should be hidden.
    emptyState.style.display = 'none'

    const visibleTasks = this.getVisibleTasks()

    // Tasks exist, but none match the current filters.
    if (visibleTasks.length === 0) {
      tasksList.innerHTML = ''
      tasksList.style.display = 'none'
      noResults.style.display = 'block'
      return
    }

    noResults.style.display = 'none'
    tasksList.style.display = 'flex'

    // Incomplete first, then priority, then due date, then newest.
    // Priority ranks below completion so finished work does not sit at
    // the top of the list just because it was marked High. Tasks with a
    // due date sort ahead of those without, within the same priority.
    const sortedTasks = [...visibleTasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }

      const priorityDifference =
                this.getPriorityRank(a) - this.getPriorityRank(b)

      if (priorityDifference !== 0) {
        return priorityDifference
      }

      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate)
      } else if (a.dueDate) {
        return -1
      } else if (b.dueDate) {
        return 1
      }

      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    tasksList.innerHTML = sortedTasks.map((task) => {
      const category = this.getTaskCategory(task)
      const categoryClass = this.getCategoryClass(category)
      const isOverdue = this.isOverdue(task)
      const isDueToday = this.isDueToday(task)
      const dueDateText = this.formatDueDate(task.dueDate)

      const priority = this.getTaskPriority(task)
      const priorityClass = this.getPriorityClass(priority)

      const completedClass = task.completed ? 'completed' : ''
      const checkedClass = task.completed ? 'checked' : ''

      const checkedLabel = task.completed
        ? 'Mark task as incomplete'
        : 'Mark task as complete'

      return `
                <div class="task-item ${completedClass} ${isOverdue ? 'overdue' : ''} ${isDueToday ? 'due-today' : ''}">
                    <div class="task-content">
                        <button
                            type="button"
                            class="task-checkbox ${checkedClass}"
                            onclick="taskFlow.toggleTask(${task.id})"
                            aria-label="${checkedLabel}"
                            aria-pressed="${task.completed}"
                        ></button>

                        <div class="task-details">
                            <span class="task-text">${this.escapeHtml(task.text)}</span>

                            <span class="task-category-badge ${categoryClass}">
                                ${this.escapeHtml(category)}
                            </span>

                            <span
                                class="task-priority-badge ${priorityClass}"
                                title="Priority: ${this.escapeHtml(priority)}"
                            >${this.escapeHtml(priority)}</span>

                            ${task.dueDate
? `
                                <span class="due-date-badge ${isOverdue ? 'overdue' : ''} ${isDueToday ? 'due-today' : ''}">
                                    📅 ${dueDateText}
                                </span>
                            `
: ''}
                        </div>
                    </div>

                    <div class="task-actions">
                        <button
                            type="button"
                            class="task-btn edit-btn"
                            onclick="taskFlow.editTask(${task.id})"
                            aria-label="Edit task"
                            title="Edit task"
                        >✏️</button>

                        <button
                            type="button"
                            class="task-btn delete-btn"
                            onclick="taskFlow.deleteTask(${task.id})"
                            aria-label="Delete task"
                            title="Delete task"
                        >🗑️</button>
                    </div>
                </div>
            `
    }).join('')
  }

  // ========================================
  // Task Statistics
  // ========================================

  /**
     * Updates statistics for all tasks, regardless of filters.
     */
  updateStats () {
    const totalTasks = this.tasks.length

    const completedTasks = this.tasks.filter((task) => {
      return task.completed
    }).length

    const pendingTasks = totalTasks - completedTasks
    const overdueTasks = this.tasks.filter((task) => this.isOverdue(task)).length

    this.getElement('totalTasks').textContent = totalTasks
    this.getElement('completedTasks').textContent = completedTasks
    this.getElement('pendingTasks').textContent = pendingTasks
    this.getElement('overdueTasks').textContent = overdueTasks
    this.updateDueDateStats()

    this.getElement('taskCount').textContent =
            `${pendingTasks} pending`
  }

  // ========================================
  // Local Storage
  // ========================================

  updateDueDateStats () {
    const dueDateStats = document.getElementById('dueDateStats')
    const today = new Date().toISOString().split('T')[0]

    const stats = {
      dueToday: this.tasks.filter(task => task.dueDate === today && !task.completed).length,
      overdue: this.tasks.filter(task => this.isOverdue(task)).length,
      upcoming: this.tasks.filter(task => task.dueDate && task.dueDate > today && !task.completed).length,
      noDueDate: this.tasks.filter(task => !task.dueDate && !task.completed).length
    }

    dueDateStats.innerHTML = `
            <div class="stat-item">
                <span class="stat-icon">📅</span>
                <span class="stat-text">Due Today: ${stats.dueToday}</span>
            </div>
            <div class="stat-item">
                <span class="stat-icon">⚠️</span>
                <span class="stat-text">Overdue: ${stats.overdue}</span>
            </div>
            <div class="stat-item">
                <span class="stat-icon">📋</span>
                <span class="stat-text">Upcoming: ${stats.upcoming}</span>
            </div>
            <div class="stat-item">
                <span class="stat-icon">📝</span>
                <span class="stat-text">No Due Date: ${stats.noDueDate}</span>
            </div>
        `
  }

  /**
     * Saves tasks and their categories to Local Storage.
     */
  saveTasks () {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.tasks)
      )

      localStorage.setItem(
        this.counterKey,
        String(this.taskIdCounter)
      )

      return true
    } catch (error) {
      console.error('Could not save tasks:', error)

      this.showNotification(
        'Could not save changes. Check your browser storage settings.',
        'error'
      )

      return false
    }
  }

  /**
     * Loads saved tasks.
     * Legacy tasks without categories remain compatible.
     */
  loadTasks () {
    try {
      const savedTasks = localStorage.getItem(this.storageKey)

      if (!savedTasks) {
        return []
      }

      const parsedTasks = JSON.parse(savedTasks)

      if (!Array.isArray(parsedTasks)) {
        console.warn('Saved tasks data is not an array.')
        return []
      }

      return parsedTasks
        .filter((task) => this.isValidTask(task))
        .map((task) => ({
          ...task,
          createdAt: task.createdAt || new Date().toISOString(),
          completedAt: task.completedAt || null,
          dueDate: task.dueDate || null
        }))
    } catch (error) {
      console.error('Could not load saved tasks:', error)
      return []
    }
  }

  /**
     * Checks whether a saved task contains required properties.
     */
  isValidTask (task) {
    return (
      task !== null &&
            typeof task === 'object' &&
            Number.isFinite(task.id) &&
            typeof task.text === 'string' &&
            typeof task.completed === 'boolean'
    )
  }

  /**
     * Finds the next available task ID.
     */
  getNextTaskId () {
    let storedCounter = 1

    try {
      const savedCounter = localStorage.getItem(this.counterKey)

      if (savedCounter !== null) {
        const parsedCounter = Number(savedCounter)

        if (
          Number.isSafeInteger(parsedCounter) &&
                    parsedCounter > 0
        ) {
          storedCounter = parsedCounter
        }
      }
    } catch (error) {
      console.warn(
        'Could not read the saved task counter:',
        error
      )
    }

    const largestExistingId = this.tasks.reduce((largest, task) => {
      return Math.max(largest, task.id)
    }, 0)

    return Math.max(storedCounter, largestExistingId + 1)
  }

  // ========================================
  // HTML Safety
  // ========================================

  exportTasks () {
    let url
    try {
      const dataStr = JSON.stringify(this.tasks, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      url = URL.createObjectURL(dataBlob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'taskflow_backup.json'
      link.click()

      this.showNotification('Tasks exported successfully!', 'success')
    } catch (error) {
      console.error('Failed to export tasks:', error)
      this.showNotification('Failed to export tasks.', 'error')
    } finally {
      // Revoked on a later tick: revoking straight after click() can
      // cancel the download before the browser has read the blob.
      if (url) {
        setTimeout(() => URL.revokeObjectURL(url), 1000)
      }
    }
  }

  clearAllTasks () {
    if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
      this.tasks = []
      this.saveTasks()
      this.renderTasks()
      this.updateStats()
      this.showNotification('All tasks cleared!', 'success')
    }
  }

  getTaskStats () {
    const now = new Date()
    const today = now.toISOString().split('T')[0]

    const stats = {
      total: this.tasks.length,
      completed: this.tasks.filter(t => t.completed).length,
      pending: this.tasks.filter(t => !t.completed).length,
      dueToday: this.tasks.filter(t => t.dueDate === today && !t.completed).length,
      overdue: this.tasks.filter(t => this.isOverdue(t)).length,
      upcoming: this.tasks.filter(t => t.dueDate && t.dueDate > today && !t.completed).length,
      createdToday: this.tasks.filter(t => {
        const taskDate = new Date(t.createdAt)
        return taskDate.toDateString() === now.toDateString()
      }).length,
      completedToday: this.tasks.filter(t => {
        if (!t.completedAt) return false
        const completedDate = new Date(t.completedAt)
        return completedDate.toDateString() === now.toDateString()
      }).length
    }
    return stats
  }

  /**
     * Escapes user-provided text before inserting it into HTML.
     */
  escapeHtml (value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  // ========================================
  // Notifications
  // ========================================

  /**
     * Displays a temporary notification.
     */
  showNotification (message, type = 'info') {
    const existingNotification = document.querySelector(
      '.taskflow-notification'
    )

    if (existingNotification) {
      existingNotification.remove()
    }

    const notification = document.createElement('div')

    notification.className = 'taskflow-notification'
    notification.textContent = message
    notification.setAttribute('role', 'status')
    notification.setAttribute('aria-live', 'polite')

    const notificationColors = {
      success: '#48bb78',
      error: '#e53e3e',
      warning: '#ed8936',
      info: '#3182ce'
    }

    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: '1000',
      maxWidth: 'calc(100vw - 40px)',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      color: '#ffffff',
      backgroundColor:
                notificationColors[type] || notificationColors.info,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      fontWeight: '500',
      animation: 'slideIn 0.3s ease'
    })

    document.body.appendChild(notification)

    window.setTimeout(() => {
      notification.remove()
    }, 3000)
  }
}

// ========================================
// Application Startup
// ========================================

let taskFlow

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      taskFlow = new TaskFlow()
      window.taskFlow = taskFlow
    } catch (error) {
      console.error('TaskFlow could not start:', error)
    }
  })
}

// Support importing the class in tests or other JavaScript files.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TaskFlow
}
