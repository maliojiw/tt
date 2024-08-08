var FoundHistory_editMode = "CREATE";
var FoundHistory_API = "/api/v1/FoundHistory/";

//================= Search Customizaiton =========================================

function FoundHistory_GetSearchParameter() {
    var FoundHistorySearchObject = new Object();
FoundHistorySearchObject.note = $("#s_FoundHistory_note").val();

    return FoundHistorySearchObject;
}

function FoundHistory_FeedDataToSearchForm(data) {
$("#s_FoundHistory_note").val(data.note);

}

//================= Form Data Customizaiton =========================================

function FoundHistory_FeedDataToForm(data) {
$("#FoundHistory_id").val(data.id);
$("#FoundHistory_foundDate").val(formatDate(data.foundDate));
DropDownClearFormAndFeedWithData($("#FoundHistory_countTypeId"), data, "id", "name", "item_countTypeId", data.countTypeId);
DropDownClearFormAndFeedWithData($("#FoundHistory_placeId"), data, "id", "name", "item_placeId", data.placeId);
DropDownClearFormAndFeedWithData($("#FoundHistory_totalFound"), data, "id", "name", "item_totalFound", data.totalFound);
$("#FoundHistory_note").val(data.note);
DropDownClearFormAndFeedWithData($("#FoundHistory_userId"), data, "id", "nickname", "item_userId", data.userId);

}

function FoundHistory_GetFromForm() {
    var FoundHistoryObject = new Object();
FoundHistoryObject.id = $("#FoundHistory_id").val();
FoundHistoryObject.foundDate = getDate($("#FoundHistory_foundDate").val());
FoundHistoryObject.countTypeId = $("#FoundHistory_countTypeId").val();
FoundHistoryObject.placeId = $("#FoundHistory_placeId").val();
FoundHistoryObject.totalFound = $("#FoundHistory_totalFound").val();
FoundHistoryObject.note = $("#FoundHistory_note").val();
FoundHistoryObject.userId = $("#FoundHistory_userId").val();


    return FoundHistoryObject;
}

function FoundHistory_InitialForm(s) {
    var successFunc = function (result) {
        FoundHistory_FeedDataToForm(result);
		FoundHistory_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#FoundHistoryModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + FoundHistory_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function FoundHistory_GoCreate() {
    // Incase model popup
    FoundHistory_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/FoundHistoryView/FoundHistory_d");
}

function FoundHistory_GoEdit(a) {
    // Incase model popup
    FoundHistory_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/FoundHistoryView/FoundHistory_d?id=" + a);
}

function FoundHistory_SetEditForm(a) {
    var successFunc = function (result) {
        FoundHistory_editMode = "UPDATE";
        FoundHistory_FeedDataToForm(result);
        $("#FoundHistoryModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + FoundHistory_API + a, successFunc, AlertDanger);
}

function FoundHistory_SetCreateForm(s) {
    FoundHistory_editMode = "CREATE";
	FoundHistory_InitialForm(s);
}

function FoundHistory_RefreshTable() {
    // Incase model popup
    FoundHistory_DoSearch();

    // Incase open new page
    //window.parent.FoundHistory_DoSearch();
}

//================= Update and Delete =========================================

var FoundHistory_customValidation = function (group) {
    return "";
};

function FoundHistory_PutUpdate() {
	if (!ValidateForm('FoundHistory', FoundHistory_customValidation))
    {
        return;
    }

    var data = FoundHistory_GetFromForm();

    //Update Mode
    if (FoundHistory_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#FoundHistoryModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            FoundHistory_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + FoundHistory_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#FoundHistoryModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            FoundHistory_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + FoundHistory_API, data, successFunc2, AlertDanger);
    }
}

function FoundHistory_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#FoundHistoryModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            FoundHistory_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + FoundHistory_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var FoundHistoryTableV;

var FoundHistory_setupTable = function (result) {
	tmp = '"';
    FoundHistoryTableV = $('#FoundHistoryTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "txt_foundDate" },
                { "data": "countTypeId_CountType_name" },
                { "data": "placeId_Place_name" },
                { "data": "totalFound_CountGroup_name" },
                { "data": "note" },
                { "data": "userId_User_nickname" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:FoundHistory_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:FoundHistory_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
                }
            },
            //{
            //    targets: 0,
            //    data: "",
            //    defaultContent: '',
            //    orderable: false,
            //    className: 'select-checkbox'
            //}
            ],
        "language": {
            "url": appsite + "/DataTables-1.10.16/thai.json"
        },
        "paging": true,
		"searching": false
    });
	endLoad();
};

function FoundHistory_InitiateDataTable() {
	startLoad();
	var p = $.param(FoundHistory_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/FoundHistory/GetListBySearch?"+p, FoundHistory_setupTable, AlertDanger);
}

function FoundHistory_DoSearch() {
    var p = $.param(FoundHistory_GetSearchParameter());
    var FoundHistory_reload = function (result) {
        FoundHistoryTableV.destroy();
        FoundHistory_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/FoundHistory/GetListBySearch?"+p, FoundHistory_reload, AlertDanger);
}

function FoundHistory_GetSelect(f) {
    var FoundHistory_selectitem = [];
    $.each(FoundHistoryTableV.rows('.selected').data(), function (key, value) {
        FoundHistory_selectitem.push(value[f]);
    });
    alert(FoundHistory_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



