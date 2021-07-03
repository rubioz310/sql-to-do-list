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
        console.log('List of tasks:', response);
    }).catch(response => {
        console.log('Error getting tasks', response);
    })
}