var FoundHistory_API = "/api/v1/FoundHistory/";

//================= Search Customizaiton =========================================

function FoundHistory_GetSearchParameter(fileType) {
    var FoundHistorySearchObject = new Object();
FoundHistorySearchObject.note = $("#s_FoundHistory_note").val();


    FoundHistorySearchObject.fileType = fileType;

    //console.log(FoundHistorySearchObject);

    return FoundHistorySearchObject;
}

function FoundHistory_FeedDataToSearchForm(data) {
$("#s_FoundHistory_note").val(data.note);

}

//================= Form Data Customizaiton =========================================

function FoundHistory_InitialForm(s) {
    var successFunc = function (result) {
        FoundHistory_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + FoundHistory_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_FoundHistory_customValidation = function (group) {
    return "";
};


function FoundHistory_DoSearch(fileType) {
    if (!ValidateForm('s_FoundHistory', s_FoundHistory_customValidation)) {
        return;
    }

    var p = $.param(FoundHistory_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/FoundHistory/FoundHistory_report?" + p;

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

