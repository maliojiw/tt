var CountType_editMode = "CREATE";
var CountType_API = "/api/v1/CountType/";

//================= Form Data Customizaiton =========================================

function CountType_FeedDataToForm(data) {
$("#CountType_id").val(data.id);
$("#CountType_name").val(data.name);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function CountType_GetFromForm() {
    var CountTypeObject = new Object();
CountTypeObject.id = $("#CountType_id").val();
CountTypeObject.name = $("#CountType_name").val();


    return CountTypeObject;
}

function CountType_InitialForm() {
    var successFunc = function (result) {
        CountType_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + CountType_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function CountType_SetEditForm(a) {
    var successFunc = function (result) {
        CountType_editMode = "UPDATE";
        CountType_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + CountType_API + a, successFunc, AlertDanger);
}

function CountType_SetCreateForm() {
    CountType_editMode = "CREATE";
	CountType_InitialForm();
}

//================= Update and Delete =========================================

var CountType_customValidation = function (group) {
    return "";
};

function CountType_PutUpdate() {
	if (!ValidateForm('CountType', CountType_customValidation))
    {
        return;
    }
    var data = CountType_GetFromForm();

    //Update Mode
    if (CountType_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + CountType_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + CountType_API, data, successFunc2, AlertDanger);
    }
}

function CountType_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            CountType_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + CountType_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


