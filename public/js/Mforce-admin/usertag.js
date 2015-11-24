$("#editTag").click(function(){
    var str = $("#tags").text();
    $("#tag-edit").show();
    $("#inputtags").val(str);
    $("#tag-display").hide();
});

function afterSave(){
    var str = $("#inputtags").val();
    $("#tag-display").show();
    $("#tags").text(str);
    $("#tag-edit").hide();
}

$("#cancel-button").click(function(){
    $("#tag-display").show();
    $("#tag-edit").hide();
});

$("#save-button").click(function(){
    var a={ tags : $("#inputtags").val()};
    var tags = a.tags.split(",");
    for(var i=0;i<tags.length;i++){
        tags[i]= {name:tags[i]};
    }
    var serve=JSON.stringify(tags);
    $.ajax({
        type: "POST",
        url: "/admin-saveusertags",
        data: serve,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $(location).attr('href',"/admin-uploadusertags");
        },
        error: function () {
            afterSave();
        }
    });
});

