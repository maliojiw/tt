var ActionHistory_editMode = "CREATE";
var ActionHistory_API = "/api/v1/ActionHistory/";

//================= Form Data Customizaiton =========================================

function ActionHistory_FeedDataToForm(data) {
$("#ActionHistory_id").val(data.id);
$("#ActionHistory_actionDate").val(formatDate(data.actionDate));
$("#ActionHistory_note").val(data.note);
DropDownClearFormAndFeedWithData($("#ActionHistory_userId"), data, "id", "nickname", "item_userId", data.userId);
DropDownClearFormAndFeedWithData($("#ActionHistory_actionId"), data, "id", "name", "item_actionId", data.actionId);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
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

function ActionHistory_InitialForm() {
    var successFunc = function (result) {
        ActionHistory_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + ActionHistory_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function ActionHistory_SetEditForm(a) {
    var successFunc = function (result) {
        ActionHistory_editMode = "UPDATE";
        ActionHistory_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + ActionHistory_API + a, successFunc, AlertDanger);
}

function ActionHistory_SetCreateForm() {
    ActionHistory_editMode = "CREATE";
	ActionHistory_InitialForm();
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
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + ActionHistory_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + ActionHistory_API, data, successFunc2, AlertDanger);
    }
}

function ActionHistory_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            ActionHistory_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + ActionHistory_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


