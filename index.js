var inToDoDiv = document.getElementById('inToDoDiv');
var inProgressDiv = document.getElementById("inProgressDiv");
var inReviewDiv = document.getElementById("inReviewDiv");
var inDoneDiv = document.getElementById("inDoneDiv");


document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        var newTaskInput = document.getElementById("newTask");
        var newTask = newTaskInput.value;
        if (newTask === '') return;
        newTaskInput.value = "";
        var newTaskDiv = document.createElement('div');
        newTaskDiv.classList.add('taskTemp');
        newTaskDiv.setAttribute('data-status', 'inToDo');
        newTaskDiv.innerHTML = `<p class='task'>` + newTask + `</p><div>
                    <div data-action="delete" class="actionBtn"">Del</div>
                    <div data-action="moveRight" class="actionBtn">move >></div> 
                    <div data-action="moveLeft" class="actionBtn"><< move</div></div>`;
        document.getElementById("inToDoDiv").appendChild(newTaskDiv);
        newTaskDiv.getElementsByClassName('actionBtn')[2].style.display = 'none';
        return;

    }
})

document.addEventListener('click', (e) => {

    const btn = e.target.closest('.actionBtn');

    if (btn.dataset.action === 'create') {
        var newTaskInput = document.getElementById("newTask");
        var newTask = newTaskInput.value;
        if (newTask === '') return;
        newTaskInput.value = "";
        var newTaskDiv = document.createElement('div');
        newTaskDiv.classList.add('taskTemp');
        newTaskDiv.setAttribute('data-status', 'inToDo');
        newTaskDiv.innerHTML = `<p class='task'>` + newTask + `</p><div>
                    <div data-action="delete" class="actionBtn"">Del</div>
                    <div data-action="moveRight" class="actionBtn">move >></div> 
                    <div data-action="moveLeft" class="actionBtn"><< move</div></div>`;
        document.getElementById("inToDoDiv").appendChild(newTaskDiv);
        newTaskDiv.getElementsByClassName('actionBtn')[2].style.display = 'none';
        return;

    }

    var taskDiv = btn.closest('.taskTemp');

    if (btn.dataset.action === "delete") {
        taskDiv.remove();
    }
    else if (btn.dataset.action === "moveRight") {
        if (taskDiv.dataset.status === 'inToDo') {
            inProgressDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inProgress';
            taskDiv.getElementsByClassName('actionBtn')[2].style.display = 'block';
        }
        else if (taskDiv.dataset.status === 'inProgress') {
            inReviewDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inReview';
        }
        else if (taskDiv.dataset.status === 'inReview') {
            inDoneDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inDone';
            taskDiv.getElementsByClassName("actionBtn")[1].style.display = 'none';

        }
    }
    else if (btn.dataset.action === 'moveLeft') {
        if (taskDiv.dataset.status === 'inProgress') {
            inToDoDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inToDo';
            taskDiv.getElementsByClassName('actionBtn')[2].style.display = 'none';
        }
        else if (taskDiv.dataset.status === 'inReview') {
            inProgressDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inProgress';
        }
        else if (taskDiv.dataset.status === 'inDone') {
            inReviewDiv.appendChild(taskDiv);
            taskDiv.getElementsByClassName('actionBtn')[1].style.display = 'block';
            taskDiv.dataset.status = 'inReview';
        }
    }
})
