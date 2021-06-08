//Task class to represent a task
class Task {
    constructor(taskName, taskDetails) {
        this.taskName = taskName;
        this.taskDetails = taskDetails;
    }
}
//UI class
class UI {
    static displayTasks() {
        const tasks = Store.getTasks();
        tasks.forEach((task) => UI.addTaskToList(task));
    }
    static addTaskToList(task) {
        const list = document.querySelector('#list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${task.taskName}</td>
        <td>${task.taskDetails}</td>
        <td><a href='#' class='btn btn-danger btn-sm delete'>x</a></td>
        `
        //append the ROW to the LIST
        list.appendChild(row);
    }
    //delete ROW
    static deleteRow(el) {
        if (el.classList.contains('delete')) {
            let deleteConfirmation = confirm("Are you sure you're done with this?");
            if (deleteConfirmation) {
                el.parentElement.parentElement.remove();
            }
        }
    }
    //clear fields method
    static clearFields() {
        document.querySelector('#task-name').value = '';
        document.querySelector('#task-details').value = '';
    }
}
//storage handling
class Store {
    static getTasks() {
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }
    static addTask(task) {
        const tasks = Store.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    static removeTask(title) {
        const tasks = Store.getTasks();
        tasks.forEach((task,index)=>
        {
            if(task.taskName === title){
                tasks.splice(index,1)
            }
        });
        localStorage.setItem('tasks',JSON.stringify(tasks))        
    }
}
//Event: Display tasks

document.addEventListener('DOMContentLoaded', UI.displayTasks());

//Event: add a task
document.querySelector('#task-list').addEventListener('submit', (e) => {
    //prevent default submit
    e.preventDefault();
    //get values
    const title = document.querySelector('#task-name').value;
    const details = document.querySelector('#task-details').value;
    if (title == '' || details == '') {
        //alert handling
        document.querySelector('.alert').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.alert').style.display = 'none';
        }, 3000)
    } else {
        //add new to list
        const newTask = new Task(title, details);
        //add task to UI
        UI.addTaskToList(newTask);
        //add task to local storage
        Store.addTask(newTask)
        //clear Fields
        UI.clearFields();
    }


})
//Event: Remove a task
document.querySelector('#list').addEventListener('click', (e) => {
    UI.deleteRow(e.target);
    //remove task from localstorage
    Store.removeTask(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
});
