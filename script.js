const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', function(e){
    e.preventDefault();
    
    const title = document.getElementById('taskTitle').value;
    const subject = document.getElementById('taskSubject').value;
    const date = document.getElementById('taskDate').value;

    const task = { title, subject, date };
    addTaskToLocalStorage(task);
    displayTasks();
    taskForm.reset();
});

// Add task to Local Storage
function addTaskToLocalStorage(task){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Display tasks from Local Storage
function displayTasks(){
    taskList.innerHTML = '';
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.title} - ${task.subject} - ${task.date} 
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Delete task
function deleteTask(index){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Display tasks on page load
window.onload = displayTasks;
