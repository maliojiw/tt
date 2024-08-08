var CountGroup_editMode = "CREATE";
var CountGroup_API = "/api/v1/CountGroup/";

//================= Form Data Customizaiton =========================================

function CountGroup_FeedDataToForm(data) {
$("#CountGroup_id").val(data.id);
$("#CountGroup_name").val(data.name);
$("#CountGroup_nearbyCount").val(data.nearbyCount);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function CountGroup_GetFromForm() {
    var CountGroupObject = new Object();
CountGroupObject.id = $("#CountGroup_id").val();
CountGroupObject.name = $("#CountGroup_name").val();
CountGroupObject.nearbyCount = $("#CountGroup_nearbyCount").val();


    return CountGroupObject;
}

function CountGroup_InitialForm() {
    var successFunc = function (result) {
        CountGroup_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + CountGroup_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function CountGroup_SetEditForm(a) {
    var successFunc = function (result) {
        CountGroup_editMode = "UPDATE";
        CountGroup_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + CountGroup_API + a, successFunc, AlertDanger);
}

function CountGroup_SetCreateForm() {
    CountGroup_editMode = "CREATE";
	CountGroup_InitialForm();
}

//================= Update and Delete =========================================

var CountGroup_customValidation = function (group) {
    return "";
};

function CountGroup_PutUpdate() {
	if (!ValidateForm('CountGroup', CountGroup_customValidation))
    {
        return;
    }
    var data = CountGroup_GetFromForm();

    //Update Mode
    if (CountGroup_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + CountGroup_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + CountGroup_API, data, successFunc2, AlertDanger);
    }
}

function CountGroup_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            CountGroup_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + CountGroup_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


