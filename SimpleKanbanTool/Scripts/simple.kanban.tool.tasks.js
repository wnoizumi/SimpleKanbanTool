$(document).ready(function () {
    allStatus = new Array();
    allStatus[0] = "toDo";
    allStatus[1] = "doing";
    allStatus[2] = "done";

    $("#toDo").droppable({
        drop: handleDropEvent
    });
    $("#doing").droppable({
        drop: handleDropEvent
    });
    $("#done").droppable({
        drop: handleDropEvent
    });

    loadTasks();    
    $("#saveTask").click(function (e) {
        var title = $('#title').val();
        var description = $('#description').val();
        var task = { Id: 0, Title: title, Description: description, Status: 0 };
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
                    $('#title').val("");
                    $('#description').val("");
                }
            }
        });
        return true;
    });
});

function loadTasks() {
    $.getJSON("api/task/",
    function (data) {
        $.each(data, function (key, val) {
            loadTask(val);
        });
    });
}

function loadTask(val) {
    var id = 'task' + val.id;
    var cardHtml = '<div class="card" id="' + id + '">' +
            '<button class="close">x</button>' +
            val.title + '</div>';
    
    $(cardHtml).appendTo($('#' + allStatus[val.status]));
    var card = $("#" + id);
    card.draggable({
        cursor: 'move',
    });

    if (val.topOffset > 0 && val.leftOffset > 0)
    {
        card.offset({ top: val.topOffset, left: val.leftOffset });
    }

    card.children(".close").click(function (e) {
        var confirmed = confirm("Are you sure?");
        if (confirmed == true) {
            var card = $(this).parent();
            var id = card.attr("id");
            id = id.replace("task", "");

            $.ajax({
                url: "/api/task/" + id,
                type: 'DELETE',
                cache: false,
                statusCode: {
                    200: function (data) {
                        card.remove();
                    }
                }
            });
        }
    });
}

function handleDropEvent(event, ui) {  
    var card = ui.draggable;
    var status = $(this).attr('id');

    var taskId = card.attr('id').replace("task", "");
    var topOffset = card.position().top;
    var leftOffset = card.position().left;

    var task = { Id: taskId, Title: "", Description: "", Status: allStatus.indexOf(status), TopOffset: topOffset, LeftOffset: leftOffset };
    var json = JSON.stringify(task);

    $.ajax({
        url: "/api/task/" + taskId,
        type: 'PUT',
        cache: false,
        data: json,
        contentType: 'application/json; charset=utf-8',
    });
}

