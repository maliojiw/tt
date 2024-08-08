var ActionType_editMode = "CREATE";
var ActionType_API = "/api/v1/ActionType/";

//================= Search Customizaiton =========================================

function ActionType_GetSearchParameter() {
    var ActionTypeSearchObject = new Object();
ActionTypeSearchObject.name = $("#s_ActionType_name").val();

    return ActionTypeSearchObject;
}

function ActionType_FeedDataToSearchForm(data) {
$("#s_ActionType_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function ActionType_FeedDataToForm(data) {
$("#ActionType_id").val(data.id);
$("#ActionType_name").val(data.name);

}

function ActionType_GetFromForm() {
    var ActionTypeObject = new Object();
ActionTypeObject.id = $("#ActionType_id").val();
ActionTypeObject.name = $("#ActionType_name").val();


    return ActionTypeObject;
}

function ActionType_InitialForm(s) {
    var successFunc = function (result) {
        ActionType_FeedDataToForm(result);
		ActionType_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#ActionTypeModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + ActionType_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function ActionType_GoCreate() {
    // Incase model popup
    ActionType_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/ActionTypeView/ActionType_d");
}

function ActionType_GoEdit(a) {
    // Incase model popup
    ActionType_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/ActionTypeView/ActionType_d?id=" + a);
}

function ActionType_SetEditForm(a) {
    var successFunc = function (result) {
        ActionType_editMode = "UPDATE";
        ActionType_FeedDataToForm(result);
        $("#ActionTypeModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + ActionType_API + a, successFunc, AlertDanger);
}

function ActionType_SetCreateForm(s) {
    ActionType_editMode = "CREATE";
	ActionType_InitialForm(s);
}

function ActionType_RefreshTable() {
    // Incase model popup
    ActionType_DoSearch();

    // Incase open new page
    //window.parent.ActionType_DoSearch();
}

//================= Update and Delete =========================================

var ActionType_customValidation = function (group) {
    return "";
};

function ActionType_PutUpdate() {
	if (!ValidateForm('ActionType', ActionType_customValidation))
    {
        return;
    }

    var data = ActionType_GetFromForm();

    //Update Mode
    if (ActionType_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#ActionTypeModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            ActionType_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + ActionType_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#ActionTypeModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            ActionType_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + ActionType_API, data, successFunc2, AlertDanger);
    }
}

function ActionType_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#ActionTypeModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            ActionType_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + ActionType_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var ActionTypeTableV;

var ActionType_setupTable = function (result) {
	tmp = '"';
    ActionTypeTableV = $('#ActionTypeTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "name" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:ActionType_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:ActionType_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function ActionType_InitiateDataTable() {
	startLoad();
	var p = $.param(ActionType_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/ActionType/GetListBySearch?"+p, ActionType_setupTable, AlertDanger);
}

function ActionType_DoSearch() {
    var p = $.param(ActionType_GetSearchParameter());
    var ActionType_reload = function (result) {
        ActionTypeTableV.destroy();
        ActionType_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/ActionType/GetListBySearch?"+p, ActionType_reload, AlertDanger);
}

function ActionType_GetSelect(f) {
    var ActionType_selectitem = [];
    $.each(ActionTypeTableV.rows('.selected').data(), function (key, value) {
        ActionType_selectitem.push(value[f]);
    });
    alert(ActionType_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



