var FoundHistory_editMode = "CREATE";
var FoundHistory_API = "/api/v1/FoundHistory/";

//================= Form Data Customizaiton =========================================

function FoundHistory_FeedDataToForm(data) {
$("#FoundHistory_id").val(data.id);
$("#FoundHistory_foundDate").val(formatDate(data.foundDate));
DropDownClearFormAndFeedWithData($("#FoundHistory_countTypeId"), data, "id", "name", "item_countTypeId", data.countTypeId);
DropDownClearFormAndFeedWithData($("#FoundHistory_placeId"), data, "id", "name", "item_placeId", data.placeId);
DropDownClearFormAndFeedWithData($("#FoundHistory_totalFound"), data, "id", "name", "item_totalFound", data.totalFound);
$("#FoundHistory_note").val(data.note);
DropDownClearFormAndFeedWithData($("#FoundHistory_userId"), data, "id", "nickname", "item_userId", data.userId);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
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

function FoundHistory_InitialForm() {
    var successFunc = function (result) {
        FoundHistory_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + FoundHistory_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function FoundHistory_SetEditForm(a) {
    var successFunc = function (result) {
        FoundHistory_editMode = "UPDATE";
        FoundHistory_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + FoundHistory_API + a, successFunc, AlertDanger);
}

function FoundHistory_SetCreateForm() {
    FoundHistory_editMode = "CREATE";
	FoundHistory_InitialForm();
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
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + FoundHistory_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + FoundHistory_API, data, successFunc2, AlertDanger);
    }
}

function FoundHistory_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            FoundHistory_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + FoundHistory_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


