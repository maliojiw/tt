var ActionType_editMode = "CREATE";
var ActionType_API = "/api/v1/ActionType/";

//================= Search Customizaiton =========================================

function ActionType_GetSearchParameter() {
    var ActionTypeSearchObject = new Object();

    return ActionTypeSearchObject;
}

//================= Pivot Table =========================================
var ActionTypeDataPivot = [];

var ActionType_setupPivotTable = function (result) {

    ActionTypeDataPivot = result.map(item => [
        item.name,
        item.counter
    ]);

    ActionTypeDataPivot.unshift([
        'วิธีกำจัด',
        "จำนวน"
    ]);

    if (ActionTypeDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#ActionTypePivot").pivotUI(
            ActionTypeDataPivot,
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



function ActionType_InitiatePivotTable() {
    startLoad();
    var p = $.param(ActionType_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/ActionType/GetListBySearch?" + p, ActionType_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'ActionType.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("ActionType.pdf");
};



