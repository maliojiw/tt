var User_editMode = "CREATE";
var User_API = "/api/v1/User/";

//================= Search Customizaiton =========================================

function User_GetSearchParameter() {
    var UserSearchObject = new Object();

    return UserSearchObject;
}

//================= Pivot Table =========================================
var UserDataPivot = [];

var User_setupPivotTable = function (result) {

    UserDataPivot = result.map(item => [
        item.nickname,        item.fullname,        item.phone,        item.email,        item.password,        item.isAdmin,        item.isWorker,        item.isResearcher,
        item.counter
    ]);

    UserDataPivot.unshift([
        'ชื่อเรียก',        'ชื่อเต็ม',        'โทรศัพท์',        'อีเมล/username',        'รหัสผ่าน',        'เป็น Admin',        'เป็น เจ้าหน้าที่ภาคสนาม',        'เป็น นักวิจัย',
        "จำนวน"
    ]);

    if (UserDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#UserPivot").pivotUI(
            UserDataPivot,
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



function User_InitiatePivotTable() {
    startLoad();
    var p = $.param(User_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/User/GetListBySearch?" + p, User_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'User.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("User.pdf");
};



