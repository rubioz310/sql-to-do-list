$(onReady);

function onReady(){
    console.log('jQuery linked successfully');
    getTasks();   
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
        `)
    }
}