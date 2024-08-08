var CountGroup_editMode = "CREATE";
var CountGroup_API = "/api/v1/CountGroup/";

//================= Search Customizaiton =========================================

function CountGroup_GetSearchParameter() {
    var CountGroupSearchObject = new Object();

    return CountGroupSearchObject;
}

//================= Pivot Table =========================================
var CountGroupDataPivot = [];

var CountGroup_setupPivotTable = function (result) {

    CountGroupDataPivot = result.map(item => [
        item.name,        item.nearbyCount,
        item.counter
    ]);

    CountGroupDataPivot.unshift([
        'ประมาณการ จำนวนที่พบ',        'เทียบได้เป็นจำนวน',
        "จำนวน"
    ]);

    if (CountGroupDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#CountGroupPivot").pivotUI(
            CountGroupDataPivot,
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



function CountGroup_InitiatePivotTable() {
    startLoad();
    var p = $.param(CountGroup_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/CountGroup/GetListBySearch?" + p, CountGroup_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'CountGroup.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("CountGroup.pdf");
};



