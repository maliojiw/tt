var ActionType_editMode = "CREATE";
var ActionType_API = "/api/v1/ActionType/";

//================= Form Data Customizaiton =========================================

function ActionType_FeedDataToForm(data) {
$("#ActionType_id").val(data.id);
$("#ActionType_name").val(data.name);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function ActionType_GetFromForm() {
    var ActionTypeObject = new Object();
ActionTypeObject.id = $("#ActionType_id").val();
ActionTypeObject.name = $("#ActionType_name").val();


    return ActionTypeObject;
}

function ActionType_InitialForm() {
    var successFunc = function (result) {
        ActionType_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + ActionType_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function ActionType_SetEditForm(a) {
    var successFunc = function (result) {
        ActionType_editMode = "UPDATE";
        ActionType_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + ActionType_API + a, successFunc, AlertDanger);
}

function ActionType_SetCreateForm() {
    ActionType_editMode = "CREATE";
	ActionType_InitialForm();
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
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + ActionType_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + ActionType_API, data, successFunc2, AlertDanger);
    }
}

function ActionType_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            ActionType_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + ActionType_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


