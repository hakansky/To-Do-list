let taskInputPanel = document.querySelector("#task-input-panel");
let taskList = document.querySelector(".task-list");
let filters = document.querySelectorAll(".filters span");
let clearAll = document.querySelector("#clear-all-button");

taskInputPanel.addEventListener("keydown", function (e) {
    if (e.code === "Enter") addTaskHandler();
})
taskList.addEventListener("click", changeTaskState);

taskInputPanel.addEventListener("focus", function() {
    setActiveFilter("all");
    filterTasks();
});

function createTask(text) {
    let li = document.createElement("li");
    li.classList.add("task");

    let input = document.createElement("input");
    input.className = 'checkbox';
    input.type = "checkbox";

    let p = document.createElement("p");
    p.innerText = text;

    let img = document.createElement('img');
    img.src = './assets/img/trash.svg';
    img.addEventListener('click', function () {
        if (confirm('Are you sure?')) {
            this.parentElement.remove();
        }
    })

    li.append(input);
    li.append(p);
    li.append(img);

    return li;
}

function changeTaskState(e) {
    if (e.target.nodeName != "input" && e.target.type != "checkbox") {
        return;
    }
    if (e.target.checked) {
        e.target.parentElement.classList.add("completed");
    } else {
        e.target.parentElement.classList.remove("completed");
    }
}

function addTaskHandler() {
    if (taskInputPanel.value) {
        let newTask = createTask(taskInputPanel.value);
        taskList.append(newTask);
        taskInputPanel.value = "";
    } else {
        alert("Enter the task name");
    }
}

let activeFilter = "all";

filters.forEach(filter => {
    filter.addEventListener("click", function() {
        setActiveFilter(filter.id);
        filterTasks();
    });
});

clearAll.addEventListener("click", function() {
    if (confirm('Are you sure?')) {
        taskList.innerHTML = "";
        filterTasks();
    }
});

function setActiveFilter(filter) {
    activeFilter = filter;
    filters.forEach(filter => filter.classList.remove("active"));
    document.getElementById(filter).classList.add("active");
}

function filterTasks() {
    let tasks = document.querySelectorAll(".task");

    tasks.forEach(task => {
        switch (activeFilter) {
            case "all":
                task.style.display = "flex";
                break;
            case "in-process":
                task.style.display = task.classList.contains("completed") ? "none" : "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}


