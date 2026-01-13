var inToDoDiv = document.getElementById('inToDoDiv');
var inProgressDiv = document.getElementById("inProgressDiv");
var inReviewDiv = document.getElementById("inReviewDiv");
var inDoneDiv = document.getElementById("inDoneDiv");
var moveRightBtn = null;
var moveLeftBtn = null;


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
        // moveRightBtn = newTaskDiv.getElementsByClassName('actionBtn')[1];
        // moveLeftBtn = newTaskDiv.getElementsByClassName('actionBtn')[2];
        // moveLeftBtn.remove();
        newTaskDiv.getElementsByClassName('actionBtn')[2].style.display = 'none';
        console.log('creating task using enter key...');
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
        // moveRightBtn = newTaskDiv.getElementsByClassName('actionBtn')[1];
        // moveLeftBtn = newTaskDiv.getElementsByClassName('actionBtn')[2];
        // moveLeftBtn.remove();
        newTaskDiv.getElementsByClassName('actionBtn')[2].style.display = 'none';
        console.log('creating task using add btn...');
        return;

    }

    var taskDiv = btn.closest('.taskTemp');

    if (btn.dataset.action === "delete") {
        taskDiv.remove();
        console.log('deleting the task...');
    }
    else if (btn.dataset.action === "moveRight") {
        // taskDiv.remove();
        if (taskDiv.dataset.status === 'inToDo') {
            inProgressDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inProgress';
            taskDiv.getElementsByClassName('actionBtn')[2].style.display = 'block';
            console.log('moving task from todo to progress...');
        }
        else if (taskDiv.dataset.status === 'inProgress') {
            inReviewDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inReview';
            console.log('moving task from progress to review...');
        }
        else if (taskDiv.dataset.status === 'inReview') {
            inDoneDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inDone';
            taskDiv.getElementsByClassName("actionBtn")[1].style.display = 'none';
            console.log('moving task from review to done...');
            // moveRightBtn.style.display = 'none';

        }
    }
    else if(btn.dataset.action === 'moveLeft'){
        // taskDiv.remove();
        if(taskDiv.dataset.status === 'inProgress'){
            inToDoDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inToDo';
            // moveLeftBtn.style.display = 'none';
            taskDiv.getElementsByClassName('actionBtn')[2].style.display = 'none';
            console.log('moving task from progress to todo...');
        }
        else if(taskDiv.dataset.status === 'inReview'){
            inProgressDiv.appendChild(taskDiv);
            taskDiv.dataset.status = 'inProgress';
            console.log('moving task from review to progress...');
        }
        else if(taskDiv.dataset.status === 'inDone'){
            inReviewDiv.appendChild(taskDiv);
            taskDiv.getElementsByClassName('actionBtn')[1].style.display = 'block';    
            taskDiv.dataset.status = 'inReview';
            console.log('moving task from done to review...');
            // moveRightBtn.style.display = 'block';
        }
    }
})
