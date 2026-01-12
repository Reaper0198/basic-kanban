var inProgressDiv = document.getElementById("inProgressDiv");
var inReviewDiv = document.getElementById("inReviewDiv");
var inDoneDiv = document.getElementById("inDoneDiv");

document.addEventListener('click', (e) => {

    const btn = e.target.closest('.actionBtn');

    if (btn.dataset.action === 'create') {
        const newTaskInput = document.getElementById("newTask");
        const newTask = newTaskInput.value;
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
        console.log("btn clicked..")
        taskDiv.remove();
    }
    else if (btn.dataset.action === "move") {
        taskDiv.remove();
        console.log("deleting the task div..")
        if (taskDiv.dataset.status === 'toDo') {
            console.log("moving to in Progress...");
            inProgressDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inProgress';
        }
        else if (taskDiv.dataset.status === 'inProgress') {
            console.log("moving to in Review...");
            inReviewDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inReview';
        }
        else if (taskDiv.dataset.status === 'inReview') {
            console.log("moving to in done...");
            inDoneDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inDone';
            taskDiv.getElementsByClassName("actionBtn")[1].remove();
        }
    }
})
