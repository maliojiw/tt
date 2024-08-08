var ActionHistory_API = "/api/v1/ActionHistory/";

//================= Search Customizaiton =========================================

function ActionHistory_GetSearchParameter(fileType) {
    var ActionHistorySearchObject = new Object();
ActionHistorySearchObject.actionDate = formatDateForGetParameter(getDate($("#s_ActionHistory_actionDate").val()));
ActionHistorySearchObject.note = $("#s_ActionHistory_note").val();
ActionHistorySearchObject.userId = $("#s_ActionHistory_userId").val();
ActionHistorySearchObject.actionId = $("#s_ActionHistory_actionId").val();


    ActionHistorySearchObject.fileType = fileType;

    //console.log(ActionHistorySearchObject);

    return ActionHistorySearchObject;
}

function ActionHistory_FeedDataToSearchForm(data) {
$("#s_ActionHistory_actionDate").val(formatDate(data.actionDate));
$("#s_ActionHistory_note").val(data.note);
DropDownClearFormAndFeedWithData($("#s_ActionHistory_userId"), data, "id", "nickname", "item_userId", data.userId);
DropDownClearFormAndFeedWithData($("#s_ActionHistory_actionId"), data, "id", "name", "item_actionId", data.actionId);

}

//================= Form Data Customizaiton =========================================

function ActionHistory_InitialForm(s) {
    var successFunc = function (result) {
        ActionHistory_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + ActionHistory_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_ActionHistory_customValidation = function (group) {
    return "";
};


function ActionHistory_DoSearch(fileType) {
    if (!ValidateForm('s_ActionHistory', s_ActionHistory_customValidation)) {
        return;
    }

    var p = $.param(ActionHistory_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/ActionHistory/ActionHistory_report?" + p;

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

