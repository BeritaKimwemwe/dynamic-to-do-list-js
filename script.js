document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to add a task
    function addTask(taskText, save = true) {
        // If taskText not passed (e.g., from input), get it from input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Skip empty input
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create li element and set text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Remove task from DOM and Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append remove button to li and li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field if task was added via user input
        if (save) {
            taskInput.value = "";

            // Save to Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listener: Add task on button click
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Event listener: Add task on Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
