$(onReady);
let order = 'ASC';
function onReady(){
    getTasks();
    $('#newTask').on('click', addTask);
    $('#tasksTable').on('click', '.completeBtn', completeTask);
    $('#tasksTable').on('click', '.deleteBtn', deleteTask);
    $('#changeOrderBtn').on('click', changeOrder);
}

function getTasks(){
    $.ajax({
        method: 'GET',
        url: `/task?order=${order}`
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
        let statusClass = task.isComplete ? 'completeTask' : 'taskInProgress';
        let completeBtn = ""
        //If task is complete it will not show the complete button
        if(!task.isComplete){
            completeBtn = `<button data-id=${task.id} class="completeBtn btn btn-success btn-sm">Complete</button>`
        }
        $('#tasksTable').append(`
            <tr class=${statusClass}>
                <th>${task.task}</th>
                <th>${status}</th>
                <th>${completeBtn}</th>
                <th><button data-id=${task.id} class="deleteBtn btn btn-danger btn-sm">Delete</button></th>
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

function deleteTask(){
    let id = $(this).data('id');
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to get it back!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Task deleted!", {
            icon: "success",
          });
          $.ajax({
                method: 'DELETE',
                url: `/task/${id}`,
            }).then(response => {
                getTasks();
            }).catch(response => {
                console.log('Error deleting task', response);
            })
        }
      });
}

function clearInputs(){
    $('#taskInput').val('');
}

function changeOrder(){
    order = order === 'ASC' ? 'DESC' : 'ASC';
    switch (order){
        case 'ASC':
            $('#changeOrderBtn').text('Complete First');
            break;
        case 'DESC':
            $('#changeOrderBtn').text('Incomplete First');
            break;
    }
    getTasks();
}