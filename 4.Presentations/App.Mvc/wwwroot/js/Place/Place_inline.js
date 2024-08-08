function Place_ClearForm(i, blankItem) {
	var data = blankItem;
$("#Place_id_" + i).val("");
$("#Place_name_" + i).val("");
$("#Place_province_" + i).val("");
$("#Place_amphor_" + i).val("");
$("#Place_tumbon_" + i).val("");
$("#Place_riverName_" + i).val("");
$("#Place_nearbyPlace_" + i).val("");
$("#Place_locationLat_" + i).val("");
$("#Place_locationLong_" + i).val("");

}

function Place_FeedDataToForm(data, i, blankItem) {
$("#Place_id_" + i).val(data.id);
$("#Place_name_" + i).val(data.name);
$("#Place_province_" + i).val(data.province);
$("#Place_amphor_" + i).val(data.amphor);
$("#Place_tumbon_" + i).val(data.tumbon);
$("#Place_riverName_" + i).val(data.riverName);
$("#Place_nearbyPlace_" + i).val(data.nearbyPlace);
$("#Place_locationLat_" + i).val(data.locationLat);
$("#Place_locationLong_" + i).val(data.locationLong);

}

function Place_GetFromForm(obj, i) {
    var PlaceObject = new Object();
PlaceObject.id = obj.find("#Place_id_" + i).val();
PlaceObject.name = obj.find("#Place_name_" + i).val();
PlaceObject.province = obj.find("#Place_province_" + i).val();
PlaceObject.amphor = obj.find("#Place_amphor_" + i).val();
PlaceObject.tumbon = obj.find("#Place_tumbon_" + i).val();
PlaceObject.riverName = obj.find("#Place_riverName_" + i).val();
PlaceObject.nearbyPlace = obj.find("#Place_nearbyPlace_" + i).val();
PlaceObject.locationLat = obj.find("#Place_locationLat_" + i).val();
PlaceObject.locationLong = obj.find("#Place_locationLong_" + i).val();

    PlaceObject.active_mode = obj.find("#isActive_" + i + "_Place").val();
    return PlaceObject;
}

function Place_GetAllData() {
    //Insert Place List
    var Place = [];
    $('#PlaceBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachPlace = Place_GetFromForm($(this), i);
        Place.push(eachPlace);
    });
    return Place;
}

function Place_Save(id) {
	//Insert Place List
	var Place = Place_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/Place/UpdateMultiple', Place, successFunc, AlertDanger);
}

function Place_Get(id, blankItem) {

	$('#PlaceBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Place" value="1" /><input class="form-control" type="hidden" id="Place_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_province_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_amphor_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_tumbon_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_riverName_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_nearbyPlace_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_locationLat_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_locationLong_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Place_RemovePlace(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Place_RestorePlace(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#PlaceBody').append($(tag));
			Place_FeedDataToForm(data, (i + 1), blankItem);
		});
        Place_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/Place", successFunc, AlertDanger);
	
}

function Place_Add() {
	var successFunc = function (result) {
		var i = $("#PlaceBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Place" value="1" /><input class="form-control" type="hidden" id="Place_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="Place_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_province_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_amphor_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_tumbon_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_riverName_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_nearbyPlace_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_locationLat_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Place_locationLong_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Place_RemovePlace(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Place_RestorePlace(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#PlaceBody').append($(tag));
		Place_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Place/" + "GetBlankItem", successFunc, AlertDanger);
}

function Place_RemovePlace(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        Place_Summary();
    }
}

function Place_RestorePlace(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        Place_Summary();
    }
}

function Place_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function Place_InitialForm(id) {
    var successFunc = function (result) {
        Place_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/Place/" + "GetBlankItem", successFunc, AlertDanger);
}
