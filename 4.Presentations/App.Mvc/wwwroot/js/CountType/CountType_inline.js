function CountType_ClearForm(i, blankItem) {
	var data = blankItem;
$("#CountType_id_" + i).val("");
$("#CountType_name_" + i).val("");

}

function CountType_FeedDataToForm(data, i, blankItem) {
$("#CountType_id_" + i).val(data.id);
$("#CountType_name_" + i).val(data.name);

}

function CountType_GetFromForm(obj, i) {
    var CountTypeObject = new Object();
CountTypeObject.id = obj.find("#CountType_id_" + i).val();
CountTypeObject.name = obj.find("#CountType_name_" + i).val();

    CountTypeObject.active_mode = obj.find("#isActive_" + i + "_CountType").val();
    return CountTypeObject;
}

function CountType_GetAllData() {
    //Insert CountType List
    var CountType = [];
    $('#CountTypeBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachCountType = CountType_GetFromForm($(this), i);
        CountType.push(eachCountType);
    });
    return CountType;
}

function CountType_Save(id) {
	//Insert CountType List
	var CountType = CountType_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/CountType/UpdateMultiple', CountType, successFunc, AlertDanger);
}

function CountType_Get(id, blankItem) {

	$('#CountTypeBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_CountType" value="1" /><input class="form-control" type="hidden" id="CountType_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="CountType_name_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:CountType_RemoveCountType(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:CountType_RestoreCountType(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#CountTypeBody').append($(tag));
			CountType_FeedDataToForm(data, (i + 1), blankItem);
		});
        CountType_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/CountType", successFunc, AlertDanger);
	
}

function CountType_Add() {
	var successFunc = function (result) {
		var i = $("#CountTypeBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_CountType" value="1" /><input class="form-control" type="hidden" id="CountType_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="CountType_name_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:CountType_RemoveCountType(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:CountType_RestoreCountType(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#CountTypeBody').append($(tag));
		CountType_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/CountType/" + "GetBlankItem", successFunc, AlertDanger);
}

function CountType_RemoveCountType(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        CountType_Summary();
    }
}

function CountType_RestoreCountType(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        CountType_Summary();
    }
}

function CountType_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function CountType_InitialForm(id) {
    var successFunc = function (result) {
        CountType_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/CountType/" + "GetBlankItem", successFunc, AlertDanger);
}
