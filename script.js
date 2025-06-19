document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create li element and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn'; // Do not use classList.add

        // Set onclick event to remove the task
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append button to li
        li.appendChild(removeBtn);

        // Append li to task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on Enter key press
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
