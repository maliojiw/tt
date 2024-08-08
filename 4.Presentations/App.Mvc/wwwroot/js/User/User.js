var User_editMode = "CREATE";
var User_API = "/api/v1/User/";

//================= Search Customizaiton =========================================

function User_GetSearchParameter() {
    var UserSearchObject = new Object();
UserSearchObject.nickname = $("#s_User_nickname").val();
UserSearchObject.phone = $("#s_User_phone").val();

    return UserSearchObject;
}

function User_FeedDataToSearchForm(data) {
$("#s_User_nickname").val(data.nickname);
$("#s_User_phone").val(data.phone);

}

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

function User_InitialForm(s) {
    var successFunc = function (result) {
        User_FeedDataToForm(result);
		User_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#UserModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + User_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function User_GoCreate() {
    // Incase model popup
    User_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/UserView/User_d");
}

function User_GoEdit(a) {
    // Incase model popup
    User_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/UserView/User_d?id=" + a);
}

function User_SetEditForm(a) {
    var successFunc = function (result) {
        User_editMode = "UPDATE";
        User_FeedDataToForm(result);
        $("#UserModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + User_API + a, successFunc, AlertDanger);
}

function User_SetCreateForm(s) {
    User_editMode = "CREATE";
	User_InitialForm(s);
}

function User_RefreshTable() {
    // Incase model popup
    User_DoSearch();

    // Incase open new page
    //window.parent.User_DoSearch();
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
            $("#UserModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            User_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + User_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#UserModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            User_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + User_API, data, successFunc2, AlertDanger);
    }
}

function User_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#UserModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            User_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + User_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var UserTableV;

var User_setupTable = function (result) {
	tmp = '"';
    UserTableV = $('#UserTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "nickname" },
                { "data": "fullname" },
                { "data": "phone" },
                { "data": "email" },
                { "data": "isAdmin" },
                { "data": "isWorker" },
                { "data": "isResearcher" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:User_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:User_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function User_InitiateDataTable() {
	startLoad();
	var p = $.param(User_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/User/GetListBySearch?"+p, User_setupTable, AlertDanger);
}

function User_DoSearch() {
    var p = $.param(User_GetSearchParameter());
    var User_reload = function (result) {
        UserTableV.destroy();
        User_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/User/GetListBySearch?"+p, User_reload, AlertDanger);
}

function User_GetSelect(f) {
    var User_selectitem = [];
    $.each(UserTableV.rows('.selected').data(), function (key, value) {
        User_selectitem.push(value[f]);
    });
    alert(User_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



