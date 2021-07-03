$(onReady);

function onReady(){
    console.log('jQuery linked successfully');
    getTasks();
    $('#newTask').on('click', addTask);
    $('#tasksTable').on('click', '.complete', completeTask);
}

function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then(response => {
        showTasks(response);
    }).catch(response => {
        console.log('Error getting tasks', response);
    })
}

function showTasks(tasks){
    $('#tasksTable').empty();
    for (const task of tasks) {
        let status = task.isComplete ? 'Complete' : 'In progress';
        $('#tasksTable').append(`
            <tr>
                <th>${task.task}</th>
                <th>${status}</th>
                <th><button data-id=${task.id} class="complete">Complete</button></th>
                <th><button data-id=${task.id} class="delete">Delete</button></th>
            </tr>
        `);
    }
}

function addTask(){
    let newTask = {
        task: $('#taskInput').val(),
        isComplete: false
    }
    clearInputs();
    $.ajax({
        method: 'POST',
        url: '/task',
        data: newTask
    }).then(response => {
        getTasks();
    }).catch(response => {
        console.log('Error adding new task', response);
    })
}

function completeTask(){
    let id = $(this).data('id');
    console.log(id);
    $.ajax({
        method: 'PUT',
        url: `/task/${id}`,
    }).then(response => {
        getTasks();
    }).catch(response => {
        console.log('Error changing status of task', response);
    })
}

function clearInputs(){
    $('#taskInput').val('');
}
