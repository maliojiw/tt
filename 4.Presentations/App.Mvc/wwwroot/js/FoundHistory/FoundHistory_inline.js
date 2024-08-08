function FoundHistory_ClearForm(i, blankItem) {
	var data = blankItem;
$("#FoundHistory_id_" + i).val("");
$("#FoundHistory_foundDate_" + i).val("");
DropDownClearFormAndFeedWithData($("#FoundHistory_countTypeId_" + i), blankItem, "id", "name", "item_countTypeId", data.countTypeId);
DropDownClearFormAndFeedWithData($("#FoundHistory_placeId_" + i), blankItem, "id", "name", "item_placeId", data.placeId);
DropDownClearFormAndFeedWithData($("#FoundHistory_totalFound_" + i), blankItem, "id", "name", "item_totalFound", data.totalFound);
$("#FoundHistory_note_" + i).val("");
DropDownClearFormAndFeedWithData($("#FoundHistory_userId_" + i), blankItem, "id", "nickname", "item_userId", data.userId);

}

function FoundHistory_FeedDataToForm(data, i, blankItem) {
$("#FoundHistory_id_" + i).val(data.id);
$("#FoundHistory_foundDate_" + i).val(formatDate(data.foundDate));
DropDownClearFormAndFeedWithData($("#FoundHistory_countTypeId_" + i), blankItem, "id", "name", "item_countTypeId", data.countTypeId);
DropDownClearFormAndFeedWithData($("#FoundHistory_placeId_" + i), blankItem, "id", "name", "item_placeId", data.placeId);
DropDownClearFormAndFeedWithData($("#FoundHistory_totalFound_" + i), blankItem, "id", "name", "item_totalFound", data.totalFound);
$("#FoundHistory_note_" + i).val(data.note);
DropDownClearFormAndFeedWithData($("#FoundHistory_userId_" + i), blankItem, "id", "nickname", "item_userId", data.userId);

}

function FoundHistory_GetFromForm(obj, i) {
    var FoundHistoryObject = new Object();
FoundHistoryObject.id = obj.find("#FoundHistory_id_" + i).val();
FoundHistoryObject.foundDate = getDate(obj.find("#FoundHistory_foundDate_" + i).val());
FoundHistoryObject.countTypeId = obj.find("#FoundHistory_countTypeId_" + i).val();
FoundHistoryObject.placeId = obj.find("#FoundHistory_placeId_" + i).val();
FoundHistoryObject.totalFound = obj.find("#FoundHistory_totalFound_" + i).val();
FoundHistoryObject.note = obj.find("#FoundHistory_note_" + i).val();
FoundHistoryObject.userId = obj.find("#FoundHistory_userId_" + i).val();

    FoundHistoryObject.active_mode = obj.find("#isActive_" + i + "_FoundHistory").val();
    return FoundHistoryObject;
}

function FoundHistory_GetAllData() {
    //Insert FoundHistory List
    var FoundHistory = [];
    $('#FoundHistoryBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachFoundHistory = FoundHistory_GetFromForm($(this), i);
        FoundHistory.push(eachFoundHistory);
    });
    return FoundHistory;
}

function FoundHistory_Save(id) {
	//Insert FoundHistory List
	var FoundHistory = FoundHistory_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/FoundHistory/UpdateMultiple', FoundHistory, successFunc, AlertDanger);
}

function FoundHistory_Get(id, blankItem) {

	$('#FoundHistoryBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_FoundHistory" value="1" /><input class="form-control" type="hidden" id="FoundHistory_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="FoundHistory_foundDate_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="FoundHistory_countTypeId_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="FoundHistory_placeId_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="FoundHistory_totalFound_' + (i + 1) +'"></select></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="FoundHistory_note_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><select class="form-control" id="FoundHistory_userId_' + (i + 1) +'"></select></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:FoundHistory_RemoveFoundHistory(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:FoundHistory_RestoreFoundHistory(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#FoundHistoryBody').append($(tag));
			FoundHistory_FeedDataToForm(data, (i + 1), blankItem);
		});
        FoundHistory_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/FoundHistory", successFunc, AlertDanger);
			//AjaxGetRequest(apisite + '/api/FoundHistory/GetListBycountTypeId/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/FoundHistory/GetListByplaceId/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/FoundHistory/GetListBytotalFound/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/FoundHistory/GetListByuserId/' + a, successFunc, AlertDanger);

}

function FoundHistory_Add() {
	var successFunc = function (result) {
		var i = $("#FoundHistoryBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_FoundHistory" value="1" /><input class="form-control" type="hidden" id="FoundHistory_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="FoundHistory_foundDate_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="FoundHistory_countTypeId_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="FoundHistory_placeId_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="FoundHistory_totalFound_' + (i + 1) +'"></select></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="FoundHistory_note_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><select class="form-control" id="FoundHistory_userId_' + (i + 1) +'"></select></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:FoundHistory_RemoveFoundHistory(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:FoundHistory_RestoreFoundHistory(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#FoundHistoryBody').append($(tag));
		FoundHistory_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/FoundHistory/" + "GetBlankItem", successFunc, AlertDanger);
}

function FoundHistory_RemoveFoundHistory(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        FoundHistory_Summary();
    }
}

function FoundHistory_RestoreFoundHistory(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        FoundHistory_Summary();
    }
}

function FoundHistory_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function FoundHistory_InitialForm(id) {
    var successFunc = function (result) {
        FoundHistory_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/FoundHistory/" + "GetBlankItem", successFunc, AlertDanger);
}
