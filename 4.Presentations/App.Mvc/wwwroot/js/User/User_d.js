var User_editMode = "CREATE";
var User_API = "/api/v1/User/";

//================= Form Data Customizaiton =========================================

function User_FeedDataToForm(data) {
$("#User_id").val(data.id);
$("#User_nickname").val(data.nickname);
$("#User_fullname").val(data.fullname);
$("#User_phone").val(data.phone);
$("#User_email").val(data.email);
$("#User_password").val(data.password);
CheckBoxFeedDataToForm($("#User_isAdmin"), data.isAdmin);
CheckBoxFeedDataToForm($("#User_isWorker"), data.isWorker);
CheckBoxFeedDataToForm($("#User_isResearcher"), data.isResearcher);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function User_GetFromForm() {
    var UserObject = new Object();
UserObject.id = $("#User_id").val();
UserObject.nickname = $("#User_nickname").val();
UserObject.fullname = $("#User_fullname").val();
UserObject.phone = $("#User_phone").val();
UserObject.email = $("#User_email").val();
UserObject.password = $("#User_password").val();
UserObject.isAdmin = CheckBoxGetFromForm($("#User_isAdmin"));
UserObject.isWorker = CheckBoxGetFromForm($("#User_isWorker"));
UserObject.isResearcher = CheckBoxGetFromForm($("#User_isResearcher"));


    return UserObject;
}

function User_InitialForm() {
    var successFunc = function (result) {
        User_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + User_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function User_SetEditForm(a) {
    var successFunc = function (result) {
        User_editMode = "UPDATE";
        User_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + User_API + a, successFunc, AlertDanger);
}

function User_SetCreateForm() {
    User_editMode = "CREATE";
	User_InitialForm();
}

//================= Update and Delete =========================================

var User_customValidation = function (group) {
    return "";
};

function User_PutUpdate() {
	if (!ValidateForm('User', User_customValidation))
    {
        return;
    }
    var data = User_GetFromForm();

    //Update Mode
    if (User_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + User_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + User_API, data, successFunc2, AlertDanger);
    }
}

function User_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            User_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + User_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


