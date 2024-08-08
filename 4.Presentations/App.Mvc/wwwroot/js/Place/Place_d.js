var Place_editMode = "CREATE";
var Place_API = "/api/v1/Place/";

//================= Form Data Customizaiton =========================================

function Place_FeedDataToForm(data) {
$("#Place_id").val(data.id);
$("#Place_name").val(data.name);
$("#Place_province").val(data.province);
$("#Place_amphor").val(data.amphor);
$("#Place_tumbon").val(data.tumbon);
$("#Place_riverName").val(data.riverName);
$("#Place_nearbyPlace").val(data.nearbyPlace);
$("#Place_locationLat").val(data.locationLat);
$("#Place_locationLong").val(data.locationLong);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function Place_GetFromForm() {
    var PlaceObject = new Object();
PlaceObject.id = $("#Place_id").val();
PlaceObject.name = $("#Place_name").val();
PlaceObject.province = $("#Place_province").val();
PlaceObject.amphor = $("#Place_amphor").val();
PlaceObject.tumbon = $("#Place_tumbon").val();
PlaceObject.riverName = $("#Place_riverName").val();
PlaceObject.nearbyPlace = $("#Place_nearbyPlace").val();
PlaceObject.locationLat = $("#Place_locationLat").val();
PlaceObject.locationLong = $("#Place_locationLong").val();


    return PlaceObject;
}

function Place_InitialForm() {
    var successFunc = function (result) {
        Place_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Place_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Place_SetEditForm(a) {
    var successFunc = function (result) {
        Place_editMode = "UPDATE";
        Place_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Place_API + a, successFunc, AlertDanger);
}

function Place_SetCreateForm() {
    Place_editMode = "CREATE";
	Place_InitialForm();
}

//================= Update and Delete =========================================

var Place_customValidation = function (group) {
    return "";
};

function Place_PutUpdate() {
	if (!ValidateForm('Place', Place_customValidation))
    {
        return;
    }
    var data = Place_GetFromForm();

    //Update Mode
    if (Place_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Place_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Place_API, data, successFunc2, AlertDanger);
    }
}

function Place_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            Place_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Place_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


