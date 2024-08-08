var ActionHistory_editMode = "CREATE";
var ActionHistory_API = "/api/v1/ActionHistory/";

//================= Search Customizaiton =========================================

function ActionHistory_GetSearchParameter() {
    var ActionHistorySearchObject = new Object();
ActionHistorySearchObject.actionDate = formatDateForGetParameter(getDate($("#s_ActionHistory_actionDate").val()));
ActionHistorySearchObject.note = $("#s_ActionHistory_note").val();
ActionHistorySearchObject.userId = $("#s_ActionHistory_userId").val();
ActionHistorySearchObject.actionId = $("#s_ActionHistory_actionId").val();

    return ActionHistorySearchObject;
}

function ActionHistory_FeedDataToSearchForm(data) {
$("#s_ActionHistory_actionDate").val(formatDate(data.actionDate));
$("#s_ActionHistory_note").val(data.note);
DropDownClearFormAndFeedWithData($("#s_ActionHistory_userId"), data, "id", "nickname", "item_userId", data.userId);
DropDownClearFormAndFeedWithData($("#s_ActionHistory_actionId"), data, "id", "name", "item_actionId", data.actionId);

}

//================= Form Data Customizaiton =========================================

function ActionHistory_FeedDataToForm(data) {
$("#ActionHistory_id").val(data.id);
$("#ActionHistory_actionDate").val(formatDate(data.actionDate));
$("#ActionHistory_note").val(data.note);
DropDownClearFormAndFeedWithData($("#ActionHistory_userId"), data, "id", "nickname", "item_userId", data.userId);
DropDownClearFormAndFeedWithData($("#ActionHistory_actionId"), data, "id", "name", "item_actionId", data.actionId);

}

function ActionHistory_GetFromForm() {
    var ActionHistoryObject = new Object();
ActionHistoryObject.id = $("#ActionHistory_id").val();
ActionHistoryObject.actionDate = getDate($("#ActionHistory_actionDate").val());
ActionHistoryObject.note = $("#ActionHistory_note").val();
ActionHistoryObject.userId = $("#ActionHistory_userId").val();
ActionHistoryObject.actionId = $("#ActionHistory_actionId").val();


    return ActionHistoryObject;
}

function ActionHistory_InitialForm(s) {
    var successFunc = function (result) {
        ActionHistory_FeedDataToForm(result);
		ActionHistory_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#ActionHistoryModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + ActionHistory_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function ActionHistory_GoCreate() {
    // Incase model popup
    ActionHistory_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/ActionHistoryView/ActionHistory_d");
}

function ActionHistory_GoEdit(a) {
    // Incase model popup
    ActionHistory_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/ActionHistoryView/ActionHistory_d?id=" + a);
}

function ActionHistory_SetEditForm(a) {
    var successFunc = function (result) {
        ActionHistory_editMode = "UPDATE";
        ActionHistory_FeedDataToForm(result);
        $("#ActionHistoryModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + ActionHistory_API + a, successFunc, AlertDanger);
}

function ActionHistory_SetCreateForm(s) {
    ActionHistory_editMode = "CREATE";
	ActionHistory_InitialForm(s);
}

function ActionHistory_RefreshTable() {
    // Incase model popup
    ActionHistory_DoSearch();

    // Incase open new page
    //window.parent.ActionHistory_DoSearch();
}

//================= Update and Delete =========================================

var ActionHistory_customValidation = function (group) {
    return "";
};

function ActionHistory_PutUpdate() {
	if (!ValidateForm('ActionHistory', ActionHistory_customValidation))
    {
        return;
    }

    var data = ActionHistory_GetFromForm();

    //Update Mode
    if (ActionHistory_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#ActionHistoryModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            ActionHistory_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + ActionHistory_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#ActionHistoryModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            ActionHistory_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + ActionHistory_API, data, successFunc2, AlertDanger);
    }
}

function ActionHistory_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#ActionHistoryModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            ActionHistory_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + ActionHistory_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var ActionHistoryTableV;

var ActionHistory_setupTable = function (result) {
	tmp = '"';
    ActionHistoryTableV = $('#ActionHistoryTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "txt_actionDate" },
                { "data": "note" },
                { "data": "userId_User_nickname" },
                { "data": "actionId_ActionType_name" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:ActionHistory_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:ActionHistory_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function ActionHistory_InitiateDataTable() {
	startLoad();
	var p = $.param(ActionHistory_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/ActionHistory/GetListBySearch?"+p, ActionHistory_setupTable, AlertDanger);
}

function ActionHistory_DoSearch() {
    var p = $.param(ActionHistory_GetSearchParameter());
    var ActionHistory_reload = function (result) {
        ActionHistoryTableV.destroy();
        ActionHistory_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/ActionHistory/GetListBySearch?"+p, ActionHistory_reload, AlertDanger);
}

function ActionHistory_GetSelect(f) {
    var ActionHistory_selectitem = [];
    $.each(ActionHistoryTableV.rows('.selected').data(), function (key, value) {
        ActionHistory_selectitem.push(value[f]);
    });
    alert(ActionHistory_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



