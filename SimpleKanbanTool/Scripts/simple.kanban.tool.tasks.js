$(document).ready(function () {
    allStatus = new Array();
    allStatus[0] = "toDo";
    allStatus[1] = "doing";
    allStatus[2] = "done";

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
        $.each(data, function (key, val) {
            loadTask(val);
        });
    });
}

function loadTask(val) {
    var id = 'task' + val.id;
    var card = '<div class="card" id="' + id + '">' +
            '<button class="close">x</button>' +
            val.title + '</div>';
    
    $(card).appendTo($('#' + allStatus[val.status]));
    $("#" + id).draggable({
        cursor: 'move',
        stop: handleDragStop
    });

    $("#" + id).children(".close").click(function (e) {
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

function handleDragStop(event, ui) {

}

