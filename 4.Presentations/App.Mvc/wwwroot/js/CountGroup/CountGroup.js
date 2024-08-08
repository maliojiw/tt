var CountGroup_editMode = "CREATE";
var CountGroup_API = "/api/v1/CountGroup/";

//================= Search Customizaiton =========================================

function CountGroup_GetSearchParameter() {
    var CountGroupSearchObject = new Object();
CountGroupSearchObject.name = $("#s_CountGroup_name").val();

    return CountGroupSearchObject;
}

function CountGroup_FeedDataToSearchForm(data) {
$("#s_CountGroup_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function CountGroup_FeedDataToForm(data) {
$("#CountGroup_id").val(data.id);
$("#CountGroup_name").val(data.name);
$("#CountGroup_nearbyCount").val(data.nearbyCount);

}

function CountGroup_GetFromForm() {
    var CountGroupObject = new Object();
CountGroupObject.id = $("#CountGroup_id").val();
CountGroupObject.name = $("#CountGroup_name").val();
CountGroupObject.nearbyCount = $("#CountGroup_nearbyCount").val();


    return CountGroupObject;
}

function CountGroup_InitialForm(s) {
    var successFunc = function (result) {
        CountGroup_FeedDataToForm(result);
		CountGroup_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#CountGroupModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + CountGroup_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function CountGroup_GoCreate() {
    // Incase model popup
    CountGroup_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/CountGroupView/CountGroup_d");
}

function CountGroup_GoEdit(a) {
    // Incase model popup
    CountGroup_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/CountGroupView/CountGroup_d?id=" + a);
}

function CountGroup_SetEditForm(a) {
    var successFunc = function (result) {
        CountGroup_editMode = "UPDATE";
        CountGroup_FeedDataToForm(result);
        $("#CountGroupModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + CountGroup_API + a, successFunc, AlertDanger);
}

function CountGroup_SetCreateForm(s) {
    CountGroup_editMode = "CREATE";
	CountGroup_InitialForm(s);
}

function CountGroup_RefreshTable() {
    // Incase model popup
    CountGroup_DoSearch();

    // Incase open new page
    //window.parent.CountGroup_DoSearch();
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
            $("#CountGroupModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            CountGroup_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + CountGroup_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#CountGroupModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            CountGroup_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + CountGroup_API, data, successFunc2, AlertDanger);
    }
}

function CountGroup_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#CountGroupModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            CountGroup_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + CountGroup_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var CountGroupTableV;

var CountGroup_setupTable = function (result) {
	tmp = '"';
    CountGroupTableV = $('#CountGroupTable').DataTable({
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
                { "data": "nearbyCount" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:CountGroup_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:CountGroup_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function CountGroup_InitiateDataTable() {
	startLoad();
	var p = $.param(CountGroup_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/CountGroup/GetListBySearch?"+p, CountGroup_setupTable, AlertDanger);
}

function CountGroup_DoSearch() {
    var p = $.param(CountGroup_GetSearchParameter());
    var CountGroup_reload = function (result) {
        CountGroupTableV.destroy();
        CountGroup_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/CountGroup/GetListBySearch?"+p, CountGroup_reload, AlertDanger);
}

function CountGroup_GetSelect(f) {
    var CountGroup_selectitem = [];
    $.each(CountGroupTableV.rows('.selected').data(), function (key, value) {
        CountGroup_selectitem.push(value[f]);
    });
    alert(CountGroup_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



