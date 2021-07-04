$(onReady);

let order = 'ASC';//This will set in with order you see all tasks, either complete first or incomplete first
//Events handlers
function onReady(){
    getTasks();
    $('#newTask').on('click', addTask);
    $('#tasksTable').on('click', '.completeBtn', completeTask);
    $('#tasksTable').on('click', '.deleteBtn', deleteTask);
    $('#changeOrderBtn').on('click', changeOrder);
}
//Get all tasks from server
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
//Render tasks on DOM
function showTasks(tasks){
    $('#tasksTable').empty();
    for (const task of tasks) {
        //isComplete was set as a boolean so this variables are needed to show 'In progress' and 'Complete' on DOM
        let status = task.isComplete ? 'Complete' : 'In progress';
        //Sets background color of the task
        let statusClass = task.isComplete ? 'completeTask' : 'taskInProgress';
        let completeBtn = "";
        //If task is complete it will not show the complete button
        if(!task.isComplete){
            completeBtn = `<button data-id=${task.id} class="completeBtn btn btn-success btn-sm">Complete</button>`
        }
        //If task.completeDate is empty show nothing on DOM, else show formatted date
        let completionDate = "";
        if (task.completeDate){
            completionDate = prettyDate(task.completeDate)
        }
        $('#tasksTable').append(`
            <tr class=${statusClass}>
                <th>${task.task}</th>
                <th>${status}</th>
                <th>${completionDate}</th>
                <th>${completeBtn}</th>
                <th><button data-id=${task.id} class="deleteBtn btn btn-danger btn-sm">Delete</button></th>
            </tr>
        `);
    }
}
//new task function
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
//change status of task to Complete
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
    //Alert message when trying to delete a task using Sweet Alerts
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to get it back!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            //Task successfully deleted alert
          swal("Task deleted!", {
            icon: "success",
          });
          //Only delete message when ok is selected on the warning alert
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
//Change the variable for showing the task Complete or In Progress first.
//It also changes the color of the button.
function changeOrder(){
    order = order === 'ASC' ? 'DESC' : 'ASC';
    switch (order){
        case 'ASC':
            $('#changeOrderBtn').text('Complete First');
            $('#changeOrderBtn').removeClass('taskInProgress');
            break;
        case 'DESC':
            $('#changeOrderBtn').text('Incomplete First');
            $('#changeOrderBtn').addClass('taskInProgress')
            break;
    }
    getTasks();
}

//date formatting
function prettyDate(unformattedDate) {
    const dateString = new Date(unformattedDate);
    const year = dateString.getFullYear();
    let month = (1 + dateString.getMonth()).toString() ;
    let day = dateString.getDate().toString();
    month = month.length === 1 ? '0' + month : month;
    day = day.length === 1 ? '0' + day : day;
    return month + '-' + day + '-' + year;
} 