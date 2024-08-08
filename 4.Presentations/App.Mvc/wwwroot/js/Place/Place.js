var Place_editMode = "CREATE";
var Place_API = "/api/v1/Place/";

//================= Search Customizaiton =========================================

function Place_GetSearchParameter() {
    var PlaceSearchObject = new Object();
PlaceSearchObject.name = $("#s_Place_name").val();
PlaceSearchObject.province = $("#s_Place_province").val();
PlaceSearchObject.amphor = $("#s_Place_amphor").val();
PlaceSearchObject.tumbon = $("#s_Place_tumbon").val();
PlaceSearchObject.riverName = $("#s_Place_riverName").val();
PlaceSearchObject.nearbyPlace = $("#s_Place_nearbyPlace").val();

    return PlaceSearchObject;
}

function Place_FeedDataToSearchForm(data) {
$("#s_Place_name").val(data.name);
$("#s_Place_province").val(data.province);
$("#s_Place_amphor").val(data.amphor);
$("#s_Place_tumbon").val(data.tumbon);
$("#s_Place_riverName").val(data.riverName);
$("#s_Place_nearbyPlace").val(data.nearbyPlace);

}

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

function Place_InitialForm(s) {
    var successFunc = function (result) {
        Place_FeedDataToForm(result);
		Place_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#PlaceModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Place_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Place_GoCreate() {
    // Incase model popup
    Place_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/PlaceView/Place_d");
}

function Place_GoEdit(a) {
    // Incase model popup
    Place_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/PlaceView/Place_d?id=" + a);
}

function Place_SetEditForm(a) {
    var successFunc = function (result) {
        Place_editMode = "UPDATE";
        Place_FeedDataToForm(result);
        $("#PlaceModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Place_API + a, successFunc, AlertDanger);
}

function Place_SetCreateForm(s) {
    Place_editMode = "CREATE";
	Place_InitialForm(s);
}

function Place_RefreshTable() {
    // Incase model popup
    Place_DoSearch();

    // Incase open new page
    //window.parent.Place_DoSearch();
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
            $("#PlaceModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Place_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Place_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#PlaceModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Place_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Place_API, data, successFunc2, AlertDanger);
    }
}

function Place_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#PlaceModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Place_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Place_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var PlaceTableV;

var Place_setupTable = function (result) {
	tmp = '"';
    PlaceTableV = $('#PlaceTable').DataTable({
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
                { "data": "province" },
                { "data": "amphor" },
                { "data": "tumbon" },
                { "data": "riverName" },
                { "data": "nearbyPlace" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:Place_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:Place_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function Place_InitiateDataTable() {
	startLoad();
	var p = $.param(Place_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Place/GetListBySearch?"+p, Place_setupTable, AlertDanger);
}

function Place_DoSearch() {
    var p = $.param(Place_GetSearchParameter());
    var Place_reload = function (result) {
        PlaceTableV.destroy();
        Place_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Place/GetListBySearch?"+p, Place_reload, AlertDanger);
}

function Place_GetSelect(f) {
    var Place_selectitem = [];
    $.each(PlaceTableV.rows('.selected').data(), function (key, value) {
        Place_selectitem.push(value[f]);
    });
    alert(Place_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



