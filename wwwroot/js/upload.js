$("#importExlBTN").click(function () {
    var input = document.getElementById("excelFile");
    var files = input.files;
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        formData.append("excelFile", files[i]);
    }
    var token = $("input[name='anticsrf']").val();
    if (files.length > 0) {
        $.ajax({
            url: "Home/ULExcel",
            type: "post",
            contentType: false,
            processData: false,
            data: formData,
            headers:
            {
                "RequestVerificationToken": token
            },
            success: function (result) {
                if (result.item1 == "") {
                    result.item1 = "全部資料成功上傳。";
                }
                //上傳資料結果
                $("#resultMsg").html(result.item1);
                $("#successCount").text(result.item2);
                $("#failedCount").text(result.item3);
                $("#importExlResultMessageModal").modal();
            },
            error: function () {
                console.log("Error upload data ");
            }
        });
    } else {
        $("#resultMsg").html("檔案不能是空的。<br>");
        $("#successCount").text("0");
        $("#failedCount").text("0");
        $("#importExlResultMessageModal").modal();
    }
});
$("#importfileBTN").click(function () {
    var input = document.getElementById("files");
    var filerKit = $("#files").prop("jFiler");
    var files = input.files;
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        let flag = filerKit.files_list.some(function (item) {
            if (item.file.name === files[i].name) {
                return true;
            }else{
                return false;
            }
        });
        if (flag) {
            formData.append("files", files[i]);           
        }        
    }
    var token = $("input[name='anticsrf']").val();
    if (files.length > 0) {
        $.ajax({
            url: "Home/ULFiles",
            type: "post",
            contentType: false,
            processData: false,
            data: formData,
            headers:
            {
                "RequestVerificationToken": token
            },
            success: function (result) {
                if (result.item1 == "") {
                    result.item1 = "全部資料成功上傳。";
                }
                $("#resultMsg").html(result.item1);
                $("#successCount").text(result.item2);
                $("#failedCount").text(result.item3);
                $("#importExlResultMessageModal").modal();
            },
            error: function () {
                console.log("Error upload data ");
            }
        });
    } else {
        $("#resultMsg").html("檔案不能是空的。<br>");
        $("#successCount").text("0");
        $("#failedCount").text("0");
        $("#importExlResultMessageModal").modal();
    }
});

$(function () {
    $('#files').filer({
        showThumbs: true,
        addMore: true,
        changeInput: true,
        extensions: ["mp3", 'm4a'],
        allowDuplicates: false,
        templates: {
            box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
            item: '<li class="jFiler-item">\
                        <div class="jFiler-item-container">\
                            <div class="jFiler-item-inner">\
                                <div class="jFiler-item-thumb">\
                                    <div class="jFiler-item-status"></div>\
                                    <div class="jFiler-item-thumb-overlay">\
                                        <div class="jFiler-item-info">\
                                            <div style="display:table-cell;vertical-align: middle;">\
                                                <span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
                                                <span class="jFiler-item-others">{{fi-size2}}</span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    {{fi-image}}\
                                </div>\
                                <div class="jFiler-item-assets jFiler-row">\
                                    <ul class="list-inline pull-left">\
                                        <li><input type="text" name="audioNotes" class="form-control form-control-sm" placeholder="備註欄填寫">{{fi-progressBar}}</li>\
                                    </ul>\
                                    <ul class="list-inline pull-right">\
                                        <li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
                                    </ul>\
                                </div>\
                            </div>\
                        </div>\
                    </li>'
        },
    });
});