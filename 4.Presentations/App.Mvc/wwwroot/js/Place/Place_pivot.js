var Place_editMode = "CREATE";
var Place_API = "/api/v1/Place/";

//================= Search Customizaiton =========================================

function Place_GetSearchParameter() {
    var PlaceSearchObject = new Object();

    return PlaceSearchObject;
}

//================= Pivot Table =========================================
var PlaceDataPivot = [];

var Place_setupPivotTable = function (result) {

    PlaceDataPivot = result.map(item => [
        item.name,        item.province,        item.amphor,        item.tumbon,        item.riverName,        item.nearbyPlace,        item.locationLat,        item.locationLong,
        item.counter
    ]);

    PlaceDataPivot.unshift([
        'ชื่อเรียกจุดที่พบ',        'จังหวัด',        'อำเภอ',        'ตำบล',        'ชื่อแม่น้ำ',        'สถานที่ใกล้เคียง',        'Lat',        'Long',
        "จำนวน"
    ]);

    if (PlaceDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#PlacePivot").pivotUI(
            PlaceDataPivot,
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



function Place_InitiatePivotTable() {
    startLoad();
    var p = $.param(Place_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Place/GetListBySearch?" + p, Place_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'Place.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("Place.pdf");
};



