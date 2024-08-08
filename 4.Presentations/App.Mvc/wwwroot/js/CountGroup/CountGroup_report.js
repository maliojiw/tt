var CountGroup_API = "/api/v1/CountGroup/";

//================= Search Customizaiton =========================================

function CountGroup_GetSearchParameter(fileType) {
    var CountGroupSearchObject = new Object();
CountGroupSearchObject.name = $("#s_CountGroup_name").val();


    CountGroupSearchObject.fileType = fileType;

    //console.log(CountGroupSearchObject);

    return CountGroupSearchObject;
}

function CountGroup_FeedDataToSearchForm(data) {
$("#s_CountGroup_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function CountGroup_InitialForm(s) {
    var successFunc = function (result) {
        CountGroup_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + CountGroup_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_CountGroup_customValidation = function (group) {
    return "";
};


function CountGroup_DoSearch(fileType) {
    if (!ValidateForm('s_CountGroup', s_CountGroup_customValidation)) {
        return;
    }

    var p = $.param(CountGroup_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/CountGroup/CountGroup_report?" + p;

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

