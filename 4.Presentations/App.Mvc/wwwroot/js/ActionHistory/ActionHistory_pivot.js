var ActionHistory_editMode = "CREATE";
var ActionHistory_API = "/api/v1/ActionHistory/";

//================= Search Customizaiton =========================================

function ActionHistory_GetSearchParameter() {
    var ActionHistorySearchObject = new Object();

    return ActionHistorySearchObject;
}

//================= Pivot Table =========================================
var ActionHistoryDataPivot = [];

var ActionHistory_setupPivotTable = function (result) {

    ActionHistoryDataPivot = result.map(item => [
        item.actionDate,        item.note,        item.userId_User_nickname,
        item.actionId_ActionType_name,

        item.counter
    ]);

    ActionHistoryDataPivot.unshift([
        'วันที่ทำ กิจกรรม',        'รายละเอียดเพิ่มเติม',        'ผู้ให้ข้อมูล',        'ประเภทกิจกรรม',
        "จำนวน"
    ]);

    if (ActionHistoryDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#ActionHistoryPivot").pivotUI(
            ActionHistoryDataPivot,
            {
                vals: ["จำนวน"],
                aggregatorName: "Integer Sum"
            }
        );
    } else {
        console.log("The provided data is empty or null.");
    }
    endLoad();
}



function ActionHistory_InitiatePivotTable() {
    startLoad();
    var p = $.param(ActionHistory_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/ActionHistory/GetListBySearch?" + p, ActionHistory_setupPivotTable, AlertDanger);
}

//================= Excel Export =========================================
function getExcelTableBuffer(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function exportExcelFile() {
    var tableElement = document.getElementsByClassName('pvtTable')[0];
    var wb = XLSX.utils.table_to_book(tableElement, { sheet: "data" });
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'ActionHistory.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("ActionHistory.pdf");
};



