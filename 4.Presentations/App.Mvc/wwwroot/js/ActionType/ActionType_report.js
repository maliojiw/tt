var ActionType_API = "/api/v1/ActionType/";

//================= Search Customizaiton =========================================

function ActionType_GetSearchParameter(fileType) {
    var ActionTypeSearchObject = new Object();
ActionTypeSearchObject.name = $("#s_ActionType_name").val();


    ActionTypeSearchObject.fileType = fileType;

    //console.log(ActionTypeSearchObject);

    return ActionTypeSearchObject;
}

function ActionType_FeedDataToSearchForm(data) {
$("#s_ActionType_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function ActionType_InitialForm(s) {
    var successFunc = function (result) {
        ActionType_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + ActionType_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_ActionType_customValidation = function (group) {
    return "";
};


function ActionType_DoSearch(fileType) {
    if (!ValidateForm('s_ActionType', s_ActionType_customValidation)) {
        return;
    }

    var p = $.param(ActionType_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/ActionType/ActionType_report?" + p;

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

