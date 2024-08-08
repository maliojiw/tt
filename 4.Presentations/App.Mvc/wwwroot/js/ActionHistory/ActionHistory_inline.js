function ActionHistory_ClearForm(i, blankItem) {
	var data = blankItem;
$("#ActionHistory_id_" + i).val("");
$("#ActionHistory_actionDate_" + i).val("");
$("#ActionHistory_note_" + i).val("");
DropDownClearFormAndFeedWithData($("#ActionHistory_userId_" + i), blankItem, "id", "nickname", "item_userId", data.userId);
DropDownClearFormAndFeedWithData($("#ActionHistory_actionId_" + i), blankItem, "id", "name", "item_actionId", data.actionId);

}

function ActionHistory_FeedDataToForm(data, i, blankItem) {
$("#ActionHistory_id_" + i).val(data.id);
$("#ActionHistory_actionDate_" + i).val(formatDate(data.actionDate));
$("#ActionHistory_note_" + i).val(data.note);
DropDownClearFormAndFeedWithData($("#ActionHistory_userId_" + i), blankItem, "id", "nickname", "item_userId", data.userId);
DropDownClearFormAndFeedWithData($("#ActionHistory_actionId_" + i), blankItem, "id", "name", "item_actionId", data.actionId);

}

function ActionHistory_GetFromForm(obj, i) {
    var ActionHistoryObject = new Object();
ActionHistoryObject.id = obj.find("#ActionHistory_id_" + i).val();
ActionHistoryObject.actionDate = getDate(obj.find("#ActionHistory_actionDate_" + i).val());
ActionHistoryObject.note = obj.find("#ActionHistory_note_" + i).val();
ActionHistoryObject.userId = obj.find("#ActionHistory_userId_" + i).val();
ActionHistoryObject.actionId = obj.find("#ActionHistory_actionId_" + i).val();

    ActionHistoryObject.active_mode = obj.find("#isActive_" + i + "_ActionHistory").val();
    return ActionHistoryObject;
}

function ActionHistory_GetAllData() {
    //Insert ActionHistory List
    var ActionHistory = [];
    $('#ActionHistoryBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachActionHistory = ActionHistory_GetFromForm($(this), i);
        ActionHistory.push(eachActionHistory);
    });
    return ActionHistory;
}

function ActionHistory_Save(id) {
	//Insert ActionHistory List
	var ActionHistory = ActionHistory_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/ActionHistory/UpdateMultiple', ActionHistory, successFunc, AlertDanger);
}

function ActionHistory_Get(id, blankItem) {

	$('#ActionHistoryBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_ActionHistory" value="1" /><input class="form-control" type="hidden" id="ActionHistory_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="ActionHistory_actionDate_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="ActionHistory_note_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><select class="form-control" id="ActionHistory_userId_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="ActionHistory_actionId_' + (i + 1) +'"></select></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:ActionHistory_RemoveActionHistory(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:ActionHistory_RestoreActionHistory(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#ActionHistoryBody').append($(tag));
			ActionHistory_FeedDataToForm(data, (i + 1), blankItem);
		});
        ActionHistory_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/ActionHistory", successFunc, AlertDanger);
			//AjaxGetRequest(apisite + '/api/ActionHistory/GetListByuserId/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/ActionHistory/GetListByactionId/' + a, successFunc, AlertDanger);

}

function ActionHistory_Add() {
	var successFunc = function (result) {
		var i = $("#ActionHistoryBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_ActionHistory" value="1" /><input class="form-control" type="hidden" id="ActionHistory_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="ActionHistory_actionDate_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="ActionHistory_note_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><select class="form-control" id="ActionHistory_userId_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="ActionHistory_actionId_' + (i + 1) +'"></select></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:ActionHistory_RemoveActionHistory(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:ActionHistory_RestoreActionHistory(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#ActionHistoryBody').append($(tag));
		ActionHistory_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/ActionHistory/" + "GetBlankItem", successFunc, AlertDanger);
}

function ActionHistory_RemoveActionHistory(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        ActionHistory_Summary();
    }
}

function ActionHistory_RestoreActionHistory(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        ActionHistory_Summary();
    }
}

function ActionHistory_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function ActionHistory_InitialForm(id) {
    var successFunc = function (result) {
        ActionHistory_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/ActionHistory/" + "GetBlankItem", successFunc, AlertDanger);
}
