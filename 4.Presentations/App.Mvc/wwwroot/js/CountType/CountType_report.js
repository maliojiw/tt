var CountType_API = "/api/v1/CountType/";

//================= Search Customizaiton =========================================

function CountType_GetSearchParameter(fileType) {
    var CountTypeSearchObject = new Object();
CountTypeSearchObject.name = $("#s_CountType_name").val();


    CountTypeSearchObject.fileType = fileType;

    //console.log(CountTypeSearchObject);

    return CountTypeSearchObject;
}

function CountType_FeedDataToSearchForm(data) {
$("#s_CountType_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function CountType_InitialForm(s) {
    var successFunc = function (result) {
        CountType_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + CountType_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_CountType_customValidation = function (group) {
    return "";
};


function CountType_DoSearch(fileType) {
    if (!ValidateForm('s_CountType', s_CountType_customValidation)) {
        return;
    }

    var p = $.param(CountType_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/CountType/CountType_report?" + p;

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

