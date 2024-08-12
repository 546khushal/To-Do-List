// Add event listener to the add button
document.getElementById('add-btn').addEventListener('click', function() {
    const todoInput = document.getElementById('todo-input');
    const taskText = todoInput.value;

    if (taskText.trim() !== "") {
        const todoList = document.getElementById('todo-list');
        const newItem = document.createElement('li');
        newItem.className = 'todo-item';

        newItem.innerHTML = `
            <span class="task">${taskText}</span>
            <div class="icons">
                <i class="fa fa-check-circle complete"></i>
                <i class="fa fa-edit edit"></i>
                <i class="fa fa-trash delete"></i>
            </div>
        `;

        todoList.appendChild(newItem);
        saveData();
        todoInput.value = "";
    }
});

// Add event listener for the todo list actions
document.getElementById('todo-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
        saveData();
    } else if (e.target.classList.contains('complete')) {
        e.target.parentElement.parentElement.classList.toggle('completed');
        saveData();
    } else if (e.target.classList.contains('edit')) {
        const taskElement = e.target.parentElement.previousElementSibling;
        const newTask = prompt("Edit your task:", taskElement.textContent);
        if (newTask) {
            taskElement.textContent = newTask;
            saveData();
        }
    }
});

// Save data to localStorage
function saveData(){
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        tasks.push({
            text: item.querySelector('.task').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load data from localStorage
function loadData() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        const todoList = document.getElementById('todo-list');
        tasks.forEach(task => {
            const newItem = document.createElement('li');
            newItem.className = 'todo-item';
            if (task.completed) {
                newItem.classList.add('completed');
            }

            newItem.innerHTML = `
                <span class="task">${task.text}</span>
                <div class="icons">
                    <i class="fa fa-check-circle complete"></i>
                    <i class="fa fa-edit edit"></i>
                    <i class="fa fa-trash delete"></i>
                </div>
            `;
            todoList.appendChild(newItem);
        });
    }
}

// Load the tasks when the page is loaded
document.addEventListener('DOMContentLoaded', loadData);
