function CountGroup_ClearForm(i, blankItem) {
	var data = blankItem;
$("#CountGroup_id_" + i).val("");
$("#CountGroup_name_" + i).val("");
$("#CountGroup_nearbyCount_" + i).val("");

}

function CountGroup_FeedDataToForm(data, i, blankItem) {
$("#CountGroup_id_" + i).val(data.id);
$("#CountGroup_name_" + i).val(data.name);
$("#CountGroup_nearbyCount_" + i).val(data.nearbyCount);

}

function CountGroup_GetFromForm(obj, i) {
    var CountGroupObject = new Object();
CountGroupObject.id = obj.find("#CountGroup_id_" + i).val();
CountGroupObject.name = obj.find("#CountGroup_name_" + i).val();
CountGroupObject.nearbyCount = obj.find("#CountGroup_nearbyCount_" + i).val();

    CountGroupObject.active_mode = obj.find("#isActive_" + i + "_CountGroup").val();
    return CountGroupObject;
}

function CountGroup_GetAllData() {
    //Insert CountGroup List
    var CountGroup = [];
    $('#CountGroupBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachCountGroup = CountGroup_GetFromForm($(this), i);
        CountGroup.push(eachCountGroup);
    });
    return CountGroup;
}

function CountGroup_Save(id) {
	//Insert CountGroup List
	var CountGroup = CountGroup_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/CountGroup/UpdateMultiple', CountGroup, successFunc, AlertDanger);
}

function CountGroup_Get(id, blankItem) {

	$('#CountGroupBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_CountGroup" value="1" /><input class="form-control" type="hidden" id="CountGroup_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="CountGroup_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="number" id="CountGroup_nearbyCount_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:CountGroup_RemoveCountGroup(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:CountGroup_RestoreCountGroup(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#CountGroupBody').append($(tag));
			CountGroup_FeedDataToForm(data, (i + 1), blankItem);
		});
        CountGroup_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/CountGroup", successFunc, AlertDanger);
	
}

function CountGroup_Add() {
	var successFunc = function (result) {
		var i = $("#CountGroupBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_CountGroup" value="1" /><input class="form-control" type="hidden" id="CountGroup_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="CountGroup_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="number" id="CountGroup_nearbyCount_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:CountGroup_RemoveCountGroup(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:CountGroup_RestoreCountGroup(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#CountGroupBody').append($(tag));
		CountGroup_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/CountGroup/" + "GetBlankItem", successFunc, AlertDanger);
}

function CountGroup_RemoveCountGroup(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        CountGroup_Summary();
    }
}

function CountGroup_RestoreCountGroup(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        CountGroup_Summary();
    }
}

function CountGroup_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function CountGroup_InitialForm(id) {
    var successFunc = function (result) {
        CountGroup_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/CountGroup/" + "GetBlankItem", successFunc, AlertDanger);
}
