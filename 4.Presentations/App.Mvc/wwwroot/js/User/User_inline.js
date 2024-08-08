function User_ClearForm(i, blankItem) {
	var data = blankItem;
$("#User_id_" + i).val("");
$("#User_nickname_" + i).val("");
$("#User_fullname_" + i).val("");
$("#User_phone_" + i).val("");
$("#User_email_" + i).val("");
$("#User_password_" + i).val("");
$("#User_isAdmin_" + i).prop('checked', false);
$("#User_isWorker_" + i).prop('checked', false);
$("#User_isResearcher_" + i).prop('checked', false);

}

function User_FeedDataToForm(data, i, blankItem) {
$("#User_id_" + i).val(data.id);
$("#User_nickname_" + i).val(data.nickname);
$("#User_fullname_" + i).val(data.fullname);
$("#User_phone_" + i).val(data.phone);
$("#User_email_" + i).val(data.email);
$("#User_password_" + i).val(data.password);
CheckBoxFeedDataToForm($("#User_isAdmin_" + i), data.isAdmin);
CheckBoxFeedDataToForm($("#User_isWorker_" + i), data.isWorker);
CheckBoxFeedDataToForm($("#User_isResearcher_" + i), data.isResearcher);

}

function User_GetFromForm(obj, i) {
    var UserObject = new Object();
UserObject.id = obj.find("#User_id_" + i).val();
UserObject.nickname = obj.find("#User_nickname_" + i).val();
UserObject.fullname = obj.find("#User_fullname_" + i).val();
UserObject.phone = obj.find("#User_phone_" + i).val();
UserObject.email = obj.find("#User_email_" + i).val();
UserObject.password = obj.find("#User_password_" + i).val();
UserObject.isAdmin = CheckBoxGetFromForm(obj.find("#User_isAdmin_" + i));
UserObject.isWorker = CheckBoxGetFromForm(obj.find("#User_isWorker_" + i));
UserObject.isResearcher = CheckBoxGetFromForm(obj.find("#User_isResearcher_" + i));

    UserObject.active_mode = obj.find("#isActive_" + i + "_User").val();
    return UserObject;
}

function User_GetAllData() {
    //Insert User List
    var User = [];
    $('#UserBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachUser = User_GetFromForm($(this), i);
        User.push(eachUser);
    });
    return User;
}

function User_Save(id) {
	//Insert User List
	var User = User_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/User/UpdateMultiple', User, successFunc, AlertDanger);
}

function User_Get(id, blankItem) {

	$('#UserBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_User" value="1" /><input class="form-control" type="hidden" id="User_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_nickname_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_fullname_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_phone_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_email_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_password_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="checkbox" id="User_isAdmin_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="checkbox" id="User_isWorker_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="checkbox" id="User_isResearcher_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:User_RemoveUser(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:User_RestoreUser(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#UserBody').append($(tag));
			User_FeedDataToForm(data, (i + 1), blankItem);
		});
        User_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/User", successFunc, AlertDanger);
	
}

function User_Add() {
	var successFunc = function (result) {
		var i = $("#UserBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_User" value="1" /><input class="form-control" type="hidden" id="User_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="User_nickname_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_fullname_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_phone_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_email_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_password_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="checkbox" id="User_isAdmin_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="checkbox" id="User_isWorker_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="checkbox" id="User_isResearcher_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:User_RemoveUser(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:User_RestoreUser(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#UserBody').append($(tag));
		User_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/User/" + "GetBlankItem", successFunc, AlertDanger);
}

function User_RemoveUser(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        User_Summary();
    }
}

function User_RestoreUser(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        User_Summary();
    }
}

function User_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function User_InitialForm(id) {
    var successFunc = function (result) {
        User_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/User/" + "GetBlankItem", successFunc, AlertDanger);
}
