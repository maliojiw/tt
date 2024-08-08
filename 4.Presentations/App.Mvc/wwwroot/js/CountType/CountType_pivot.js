var CountType_editMode = "CREATE";
var CountType_API = "/api/v1/CountType/";

//================= Search Customizaiton =========================================

function CountType_GetSearchParameter() {
    var CountTypeSearchObject = new Object();

    return CountTypeSearchObject;
}

//================= Pivot Table =========================================
var CountTypeDataPivot = [];

var CountType_setupPivotTable = function (result) {

    CountTypeDataPivot = result.map(item => [
        item.name,
        item.counter
    ]);

    CountTypeDataPivot.unshift([
        'วิธีตรวจนับ',
        "จำนวน"
    ]);

    if (CountTypeDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#CountTypePivot").pivotUI(
            CountTypeDataPivot,
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



function CountType_InitiatePivotTable() {
    startLoad();
    var p = $.param(CountType_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/CountType/GetListBySearch?" + p, CountType_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'CountType.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("CountType.pdf");
};



