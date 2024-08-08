var FoundHistory_editMode = "CREATE";
var FoundHistory_API = "/api/v1/FoundHistory/";

//================= Search Customizaiton =========================================

function FoundHistory_GetSearchParameter() {
    var FoundHistorySearchObject = new Object();

    return FoundHistorySearchObject;
}

//================= Pivot Table =========================================
var FoundHistoryDataPivot = [];

var FoundHistory_setupPivotTable = function (result) {

    FoundHistoryDataPivot = result.map(item => [
        item.foundDate,        item.countTypeId_CountType_name,
        item.placeId_Place_name,
        item.totalFound_CountGroup_name,
        item.note,        item.userId_User_nickname,

        item.counter
    ]);

    FoundHistoryDataPivot.unshift([
        'วันที่พบ',        'วิธีนับจำนวน',        'ตำแหน่งที่พบ',        'จำนวนที่พบ',        'รายละเอียดเพิ่มเติม',        'ผู้ให้ข้อมูล',
        "จำนวน"
    ]);

    if (FoundHistoryDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#FoundHistoryPivot").pivotUI(
            FoundHistoryDataPivot,
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



function FoundHistory_InitiatePivotTable() {
    startLoad();
    var p = $.param(FoundHistory_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/FoundHistory/GetListBySearch?" + p, FoundHistory_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'FoundHistory.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("FoundHistory.pdf");
};



