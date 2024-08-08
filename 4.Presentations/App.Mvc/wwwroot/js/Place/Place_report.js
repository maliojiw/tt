var Place_API = "/api/v1/Place/";

//================= Search Customizaiton =========================================

function Place_GetSearchParameter(fileType) {
    var PlaceSearchObject = new Object();
PlaceSearchObject.name = $("#s_Place_name").val();
PlaceSearchObject.province = $("#s_Place_province").val();
PlaceSearchObject.amphor = $("#s_Place_amphor").val();
PlaceSearchObject.tumbon = $("#s_Place_tumbon").val();
PlaceSearchObject.riverName = $("#s_Place_riverName").val();
PlaceSearchObject.nearbyPlace = $("#s_Place_nearbyPlace").val();


    PlaceSearchObject.fileType = fileType;

    //console.log(PlaceSearchObject);

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

function Place_InitialForm(s) {
    var successFunc = function (result) {
        Place_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + Place_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_Place_customValidation = function (group) {
    return "";
};


function Place_DoSearch(fileType) {
    if (!ValidateForm('s_Place', s_Place_customValidation)) {
        return;
    }

    var p = $.param(Place_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/Place/Place_report?" + p;

    if (fileType === "pdf") {
        var successFunc = function (result) {
            $("#report_result").attr("src", result);
            $("#report_result").show();
            //$("#report_xModel").modal("show");
            endLoad();
        };
        startLoad();
        AjaxGetBinaryRequest(report_url, successFunc, AlertDanger);
    } else {
        var successFunc = function (result) {
            $("#report_result").hide();
            window.open(result);
            endLoad();
        };
        startLoad();
        AjaxGetBinaryRequest(report_url, successFunc, AlertDanger);       
	}
}

