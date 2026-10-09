// Rejected above this length: localStorage is finite and long text breaks the row layout.
const MAX_TASK_LENGTH = 500;

class TaskFlow {
    constructor() {
        try {
            this.tasks = this.loadTasks();
            this.taskIdCounter = this.getNextTaskId();
            this.initializeApp();
            this.bindEvents();
            this.renderTasks();
            this.updateStats();
        } catch (error) {
            console.error('TaskFlow failed to start:', error);
            this.showNotification('TaskFlow failed to start. Please reload the page.', 'error');
        }
    }

    // Throws rather than returning null, so a missing element surfaces as one
    // clear startup failure in the constructor instead of a later TypeError.
    getElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            throw new Error(`Required element #${id} is missing from index.html`);
        }
        return element;
    }

    initializeApp() {
        console.log('TaskFlow initialized successfully!');
        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        if (this.tasks.length === 0) {
            console.log('Welcome to TaskFlow! Add your first task to get started.');
        }
    }

    bindEvents() {
        const addTaskBtn = this.getElement('addTaskBtn');
        const taskInput = this.getElement('taskInput');

        addTaskBtn.addEventListener('click', () => this.addTask());

        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // Focus on input when page loads
        taskInput.focus();
    }

    addTask() {
        const taskInput = this.getElement('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            this.showNotification('Please enter a task description', 'warning');
            taskInput.focus();
            return;
        }

        if (taskText.length > MAX_TASK_LENGTH) {
            this.showNotification(`Task description cannot be longer than ${MAX_TASK_LENGTH} characters`, 'warning');
            taskInput.focus();
            return;
        }

        const newTask = {
            id: this.taskIdCounter++,
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();

        taskInput.value = '';
        taskInput.focus();

        this.showNotification('Task added successfully!', 'success');
    }

    deleteTask(taskId) {
        if (!this.tasks.some(task => task.id === taskId)) {
            this.handleMissingTask(taskId, 'delete');
            return;
        }

        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showNotification('Task deleted successfully!', 'success');
        }
    }

    toggleTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) {
            this.handleMissingTask(taskId, 'update');
            return;
        }

        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        this.saveTasks();
        this.renderTasks();
        this.updateStats();

        const message = task.completed ? 'Task completed! 🎉' : 'Task marked as pending';
        this.showNotification(message, 'success');
    }

    editTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) {
            this.handleMissingTask(taskId, 'edit');
            return;
        }

        const newText = prompt('Edit task:', task.text);
        if (newText === null) {
            return;
        }

        const trimmed = newText.trim();
        if (trimmed === '') {
            this.showNotification('Task description cannot be empty', 'warning');
            return;
        }

        if (trimmed.length > MAX_TASK_LENGTH) {
            this.showNotification(`Task description cannot be longer than ${MAX_TASK_LENGTH} characters`, 'warning');
            return;
        }

        task.text = trimmed;
        this.saveTasks();
        this.renderTasks();
        this.showNotification('Task updated successfully!', 'success');
    }

    // Reached when the rendered list is out of step with the task array, so it
    // re-renders to resync rather than leaving a dead button on screen.
    handleMissingTask(taskId, action) {
        console.error(`Cannot ${action} task ${taskId}: no such task`);
        this.showNotification('That task no longer exists.', 'error');
        this.renderTasks();
        this.updateStats();
    }

    renderTasks() {
        const tasksList = this.getElement('tasksList');
        const emptyState = this.getElement('emptyState');

        if (this.tasks.length === 0) {
            tasksList.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        tasksList.style.display = 'flex';
        emptyState.style.display = 'none';

        // Sort tasks: incomplete first, then by creation date
        const sortedTasks = [...this.tasks].sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed - b.completed;
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        tasksList.innerHTML = sortedTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-content">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}"
                         onclick="taskFlow.toggleTask(${task.id})">
                    </div>
                    <span class="task-text">${this.escapeHtml(task.text)}</span>
                </div>
                <div class="task-actions">
                    <button class="task-btn edit-btn" onclick="taskFlow.editTask(${task.id})" title="Edit task">
                        ✏️
                    </button>
                    <button class="task-btn delete-btn" onclick="taskFlow.deleteTask(${task.id})" title="Delete task">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;

        this.getElement('totalTasks').textContent = totalTasks;
        this.getElement('completedTasks').textContent = completedTasks;
        this.getElement('pendingTasks').textContent = pendingTasks;

        // Update task count in header
        this.getElement('taskCount').textContent = `${totalTasks} ${totalTasks === 1 ? 'task' : 'tasks'}`;
    }

    saveTasks() {
        try {
            localStorage.setItem('taskflow_tasks', JSON.stringify(this.tasks));
            localStorage.setItem('taskflow_counter', this.taskIdCounter.toString());
        } catch (error) {
            console.error('Failed to save tasks:', error);
            this.showNotification('Failed to save tasks. Please check your browser storage.', 'error');
        }
    }

    loadTasks() {
        try {
            const saved = localStorage.getItem('taskflow_tasks');
            if (!saved) {
                return [];
            }

            const parsed = JSON.parse(saved);
            if (!Array.isArray(parsed)) {
                throw new Error('Stored tasks are not an array');
            }

            // Malformed entries are dropped rather than repaired: a task with no
            // usable id or text cannot be rendered or acted on anyway.
            const valid = parsed.filter(task => this.isValidTask(task));
            const discarded = parsed.length - valid.length;
            if (discarded > 0) {
                console.warn(`Discarded ${discarded} malformed task(s) from storage`);
                this.showNotification(`Skipped ${discarded} unreadable task(s) in storage.`, 'warning');
            }
            return valid;
        } catch (error) {
            console.error('Failed to load tasks:', error);
            this.showNotification('Saved tasks could not be read and were not loaded.', 'error');
            return [];
        }
    }

    isValidTask(task) {
        return task !== null
            && typeof task === 'object'
            && Number.isFinite(task.id)
            && typeof task.text === 'string'
            && typeof task.completed === 'boolean';
    }

    getNextTaskId() {
        // Kept ahead of the highest id in use, so a missing or corrupt counter
        // can never hand out a duplicate. A NaN id would be unmatchable by
        // find(), which would silently break toggle, edit and delete.
        const highestId = this.tasks.reduce((max, task) => Math.max(max, task.id), 0);
        try {
            const parsed = parseInt(localStorage.getItem('taskflow_counter'), 10);
            return Math.max(Number.isFinite(parsed) ? parsed : 1, highestId + 1);
        } catch (error) {
            console.error('Failed to load task counter:', error);
            return highestId + 1;
        }
    }

    escapeHtml(unsafe) {
        // Coerced first: a non-string value from storage would throw on .replace
        return String(unsafe ?? '')
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    showNotification(message, type = 'info') {
        // Logged before the DOM work, so the message survives even if the
        // element below cannot be built. The constructor reports startup
        // failures through here, which is why this must not throw.
        console.log(`[${type.toUpperCase()}] ${message}`);

        try {
            // Create notification element
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                opacity: 0;
                transform: translateY(-20px);
                transition: all 0.3s ease;
                max-width: 300px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            `;

            // Set color based on type
            const colors = {
                success: '#48bb78',
                error: '#e53e3e',
                warning: '#ed8936',
                info: '#3182ce'
            };

            notification.style.background = colors[type] || colors.info;
            notification.textContent = message;

            document.body.appendChild(notification);

            // Animate in
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateY(0)';
            }, 100);

            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-20px)';
                // remove() is a no-op if the node is already detached
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        } catch (error) {
            console.error('Failed to display notification:', error);
        }
    }

    // Utility methods for potential future features
    exportTasks() {
        let url;
        try {
            const dataStr = JSON.stringify(this.tasks, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            url = URL.createObjectURL(dataBlob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'taskflow_backup.json';
            link.click();

            this.showNotification('Tasks exported successfully!', 'success');
        } catch (error) {
            console.error('Failed to export tasks:', error);
            this.showNotification('Failed to export tasks.', 'error');
        } finally {
            // Revoked on a later tick: revoking straight after click() can
            // cancel the download before the browser has read the blob.
            if (url) {
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            }
        }
    }

    clearAllTasks() {
        if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
            this.tasks = [];
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showNotification('All tasks cleared!', 'success');
        }
    }

    getTaskStats() {
        const now = new Date();
        const stats = {
            total: this.tasks.length,
            completed: this.tasks.filter(t => t.completed).length,
            pending: this.tasks.filter(t => !t.completed).length,
            createdToday: this.tasks.filter(t => {
                const taskDate = new Date(t.createdAt);
                return taskDate.toDateString() === now.toDateString();
            }).length,
            completedToday: this.tasks.filter(t => {
                if (!t.completedAt) return false;
                const completedDate = new Date(t.completedAt);
                return completedDate.toDateString() === now.toDateString();
            }).length
        };
        return stats;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.taskFlow = new TaskFlow();
});

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TaskFlow;
}
