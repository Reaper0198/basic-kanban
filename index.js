var inProgressDiv = document.getElementById("inProgressDiv");
var inReviewDiv = document.getElementById("inReviewDiv");
var inDoneDiv = document.getElementById("inDoneDiv");


document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const newTaskInput = document.getElementById("newTask");
        const newTask = newTaskInput.value;
        if (newTask === '') return;
        newTaskInput.value = "";
        var newTaskDiv = document.createElement('div');
        newTaskDiv.classList.add('taskTemp');
        newTaskDiv.setAttribute('data-status', 'toDo');
        newTaskDiv.innerHTML = `<p class='task'>` + newTask + `</p><div>
                    <div data-action="delete" class="actionBtn"">Del</div>
                    <div data-action="move" class="actionBtn">move</div> </div>`;
        document.getElementById("toDoDiv").appendChild(newTaskDiv);
        return;

    }
})

document.addEventListener('click', (e) => {

    const btn = e.target.closest('.actionBtn');

    if (btn.dataset.action === 'create') {
        const newTaskInput = document.getElementById("newTask");
        const newTask = newTaskInput.value;
        if (newTask === '') return;
        newTaskInput.value = "";
        var newTaskDiv = document.createElement('div');
        newTaskDiv.classList.add('taskTemp');
        newTaskDiv.setAttribute('data-status', 'toDo');
        newTaskDiv.innerHTML = `<p class='task'>` + newTask + `</p><div>
                    <div data-action="delete" class="actionBtn"">Del</div>
                    <div data-action="move" class="actionBtn">move</div> </div>`;
        document.getElementById("toDoDiv").appendChild(newTaskDiv);
        return;

    }

    const taskDiv = btn.closest('.taskTemp');

    if (btn.dataset.action === "delete") {
        taskDiv.remove();
    }
    else if (btn.dataset.action === "move") {
        taskDiv.remove();
        if (taskDiv.dataset.status === 'toDo') {
            inProgressDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inProgress';
        }
        else if (taskDiv.dataset.status === 'inProgress') {
            inReviewDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inReview';
        }
        else if (taskDiv.dataset.status === 'inReview') {
            inDoneDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inDone';
            taskDiv.getElementsByClassName("actionBtn")[1].remove();
        }
    }
})
