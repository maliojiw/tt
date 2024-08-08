var CountType_editMode = "CREATE";
var CountType_API = "/api/v1/CountType/";

//================= Search Customizaiton =========================================

function CountType_GetSearchParameter() {
    var CountTypeSearchObject = new Object();
CountTypeSearchObject.name = $("#s_CountType_name").val();

    return CountTypeSearchObject;
}

function CountType_FeedDataToSearchForm(data) {
$("#s_CountType_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function CountType_FeedDataToForm(data) {
$("#CountType_id").val(data.id);
$("#CountType_name").val(data.name);

}

function CountType_GetFromForm() {
    var CountTypeObject = new Object();
CountTypeObject.id = $("#CountType_id").val();
CountTypeObject.name = $("#CountType_name").val();


    return CountTypeObject;
}

function CountType_InitialForm(s) {
    var successFunc = function (result) {
        CountType_FeedDataToForm(result);
		CountType_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#CountTypeModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + CountType_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function CountType_GoCreate() {
    // Incase model popup
    CountType_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/CountTypeView/CountType_d");
}

function CountType_GoEdit(a) {
    // Incase model popup
    CountType_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/CountTypeView/CountType_d?id=" + a);
}

function CountType_SetEditForm(a) {
    var successFunc = function (result) {
        CountType_editMode = "UPDATE";
        CountType_FeedDataToForm(result);
        $("#CountTypeModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + CountType_API + a, successFunc, AlertDanger);
}

function CountType_SetCreateForm(s) {
    CountType_editMode = "CREATE";
	CountType_InitialForm(s);
}

function CountType_RefreshTable() {
    // Incase model popup
    CountType_DoSearch();

    // Incase open new page
    //window.parent.CountType_DoSearch();
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
            $("#CountTypeModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            CountType_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + CountType_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#CountTypeModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            CountType_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + CountType_API, data, successFunc2, AlertDanger);
    }
}

function CountType_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#CountTypeModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            CountType_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + CountType_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var CountTypeTableV;

var CountType_setupTable = function (result) {
	tmp = '"';
    CountTypeTableV = $('#CountTypeTable').DataTable({
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
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:CountType_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:CountType_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function CountType_InitiateDataTable() {
	startLoad();
	var p = $.param(CountType_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/CountType/GetListBySearch?"+p, CountType_setupTable, AlertDanger);
}

function CountType_DoSearch() {
    var p = $.param(CountType_GetSearchParameter());
    var CountType_reload = function (result) {
        CountTypeTableV.destroy();
        CountType_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/CountType/GetListBySearch?"+p, CountType_reload, AlertDanger);
}

function CountType_GetSelect(f) {
    var CountType_selectitem = [];
    $.each(CountTypeTableV.rows('.selected').data(), function (key, value) {
        CountType_selectitem.push(value[f]);
    });
    alert(CountType_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



