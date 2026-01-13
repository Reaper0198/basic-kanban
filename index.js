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
        newTaskDiv.innerHTML = `<p id='task'>` + newTask + `</p><div>
                    <div data-action="delete" class="actionBtn"">Del</div>
                    <div data-action="moveRight" class="actionBtn">move >></div> 
                    <div data-action="moveLeft" class="actionBtn"><< move</div></div>`;
        document.getElementById("inToDoDiv").appendChild(newTaskDiv);
        newTaskDiv.getElementsByClassName('actionBtn')[2].style.display = 'none';

        // localStorage.clear();

        if (localStorage.getItem('inToDo')) {
            var todoArr = JSON.parse(localStorage.getItem('inToDo'));
            todoArr = [...todoArr, newTask];
            localStorage.setItem('inToDo', JSON.stringify(todoArr));
        } else {
            localStorage.setItem('inToDo', JSON.stringify([newTask]));
        }
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
        newTaskDiv.innerHTML = `<p id='task'>` + newTask + `</p><div>
                    <div data-action="delete" class="actionBtn"">Del</div>
                    <div data-action="moveRight" class="actionBtn">move >></div> 
                    <div data-action="moveLeft" class="actionBtn"><< move</div></div>`;
        document.getElementById("inToDoDiv").appendChild(newTaskDiv);
        newTaskDiv.getElementsByClassName('actionBtn')[2].style.display = 'none';

        if (localStorage.getItem('inToDo')) {
            var todoArr = JSON.parse(localStorage.getItem('inToDo'));
            todoArr = [...todoArr, newTask];
            localStorage.setItem('inToDo', JSON.stringify(todoArr));
        } else {
            localStorage.setItem('inToDo', JSON.stringify([newTask]));
        }

        return;

    }
    var taskDiv = btn.closest('.taskTemp');
    const task = taskDiv.querySelector("#task").innerHTML;

    if (btn.dataset.action === "delete") {
        taskDiv.remove();
        removeThisTask(taskDiv.dataset.status, task);
    }
    else if (btn.dataset.action === "moveRight") {
        if (taskDiv.dataset.status === 'inToDo') {
            inProgressDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inProgress';
            taskDiv.getElementsByClassName('actionBtn')[2].style.display = 'block';

            removeThisTask("inToDo", task);
            addThisTask("inProgress", task);

        }
        else if (taskDiv.dataset.status === 'inProgress') {
            inReviewDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inReview';

            removeThisTask('inProgress', task);
            addThisTask('inReview', task);
        }
        else if (taskDiv.dataset.status === 'inReview') {
            inDoneDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inDone';
            taskDiv.getElementsByClassName("actionBtn")[1].style.display = 'none';

            removeThisTask('inReview', task);
            addThisTask('inDone', task);

        }
    }
    else if (btn.dataset.action === 'moveLeft') {
        if (taskDiv.dataset.status === 'inProgress') {
            inToDoDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inToDo';
            taskDiv.getElementsByClassName('actionBtn')[2].style.display = 'none';

            removeThisTask('inProgress', task);
            addThisTask('inToDo', task);
        }
        else if (taskDiv.dataset.status === 'inReview') {
            inProgressDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inProgress';

            removeThisTask('inReview', task);
            addThisTask('inProgress', task);
        }
        else if (taskDiv.dataset.status === 'inDone') {
            inReviewDiv.appendChild(taskDiv);
            taskDiv.getElementsByClassName('actionBtn')[1].style.display = 'block';
            taskDiv.dataset.status = 'inReview';

            removeThisTask('inDone', task);
            addThisTask('inReview', task);
        }
    }
})

function removeThisTask(type, task){
    console.log(type , " " , task);
    console.log("inside the removeThisTask function");
    var arr = JSON.parse(localStorage.getItem(type));
    var newArr = arr.filter(eachTask => eachTask !== task);
    localStorage.setItem(type, JSON.stringify(newArr));
}

function addThisTask(type, task){
    if(localStorage.getItem(type)){
        var arr = JSON.parse(localStorage.getItem(type));
        arr = [...arr, task];
        localStorage.setItem(type, JSON.stringify(arr));

    }else{
        localStorage.setItem(type, JSON.stringify([task]));
    }
}
