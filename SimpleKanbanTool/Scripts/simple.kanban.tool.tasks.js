$(document).ready(function () {
    loadTasks();
    $("#saveTask").click(function (e) {
        var title = $('#title').val();
        var description = $('#description').val();
        var task = { Id: 0, Title: title, Description: description };
        var json = JSON.stringify(task);

        $.ajax({
            url: '/api/task',
            cache: false,
            type: 'POST',
            data: json,
            contentType: 'application/json; charset=utf-8',
            statusCode: {
                201 /*Created*/: function (data) {
                    loadTask(data);
                }
            }
        });
        return true;
    });
});

function loadTasks() {
    $.getJSON("api/task/",
    function (data) {
        var todoCount = 0;

        $.each(data, function (key, val) {
            var card = '<div class="card" id="task' + val.Id + '">' + val.Title + '</div>';
            $(card).appendTo($('#toDo'));
            todoCount++;
        });
        $(".card").draggable();
    });
}

function loadTask(data) {
    var card = '<div class="card" id="task' + data.Id + '">' + data.Title + '</div>';
    $(card).appendTo($('#toDo'));
    $(".card").draggable();
}