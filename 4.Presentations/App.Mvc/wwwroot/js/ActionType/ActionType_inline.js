function ActionType_ClearForm(i, blankItem) {
	var data = blankItem;
$("#ActionType_id_" + i).val("");
$("#ActionType_name_" + i).val("");

}

function ActionType_FeedDataToForm(data, i, blankItem) {
$("#ActionType_id_" + i).val(data.id);
$("#ActionType_name_" + i).val(data.name);

}

function ActionType_GetFromForm(obj, i) {
    var ActionTypeObject = new Object();
ActionTypeObject.id = obj.find("#ActionType_id_" + i).val();
ActionTypeObject.name = obj.find("#ActionType_name_" + i).val();

    ActionTypeObject.active_mode = obj.find("#isActive_" + i + "_ActionType").val();
    return ActionTypeObject;
}

function ActionType_GetAllData() {
    //Insert ActionType List
    var ActionType = [];
    $('#ActionTypeBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachActionType = ActionType_GetFromForm($(this), i);
        ActionType.push(eachActionType);
    });
    return ActionType;
}

function ActionType_Save(id) {
	//Insert ActionType List
	var ActionType = ActionType_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/ActionType/UpdateMultiple', ActionType, successFunc, AlertDanger);
}

function ActionType_Get(id, blankItem) {

	$('#ActionTypeBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_ActionType" value="1" /><input class="form-control" type="hidden" id="ActionType_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="ActionType_name_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:ActionType_RemoveActionType(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:ActionType_RestoreActionType(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#ActionTypeBody').append($(tag));
			ActionType_FeedDataToForm(data, (i + 1), blankItem);
		});
        ActionType_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/ActionType", successFunc, AlertDanger);
	
}

function ActionType_Add() {
	var successFunc = function (result) {
		var i = $("#ActionTypeBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_ActionType" value="1" /><input class="form-control" type="hidden" id="ActionType_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="ActionType_name_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:ActionType_RemoveActionType(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:ActionType_RestoreActionType(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#ActionTypeBody').append($(tag));
		ActionType_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/ActionType/" + "GetBlankItem", successFunc, AlertDanger);
}

function ActionType_RemoveActionType(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        ActionType_Summary();
    }
}

function ActionType_RestoreActionType(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        ActionType_Summary();
    }
}

function ActionType_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function ActionType_InitialForm(id) {
    var successFunc = function (result) {
        ActionType_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/ActionType/" + "GetBlankItem", successFunc, AlertDanger);
}
