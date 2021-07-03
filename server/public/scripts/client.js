$(onReady);

function onReady(){
    console.log('jQuery linked successfully');
    getTasks();
    $('#newTask').on('click', addTask);
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
        $('#tasksTable').append(`
            <tr>
                <th>${task.task}</th>
                <th>${task.isComplete}</th>
                <th><button>Complete</button></th>
                <th><button>Delete</button></th>
            </tr>
        `);
    }
}

function addTask(){
    let newTask = {
        task: $('#taskInput').val(),
        isComplete: false
    }
    $.ajax({
        method: 'POST',
        url: '/task',
        data: newTask
    }).then(response => {
        getTasks();
    }).catch(response => {
        console.log('Error getting tasks', response);
    })
}