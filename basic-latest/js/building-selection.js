$(document).ready(function () {
    SetAppNameAndLogoFromLocalStorage();
    SetBackGroundColorFromLocalStorage();
       
    GetBuildingNamebyClientId();
    $("#buildingpage_btn").click(function () {
        // var clientId = GetDataFromLocalStorage(clientIdStr);
        var buildingId = $("#buildingId option:selected").val();
        var deviceId = $("#deviceId").val();
        if (ISNULLOrEmpty(buildingId) || buildingId == "0")
        {
            alert("Lobby cannot be null");
            return;
        }
        SetBuildingIdAndDeviceIdinLocalStorage(buildingId, deviceId);
        RedirectToSensorPage();
    });

    $("#buildingId").change(function () {
        if (ISNULLOrEmpty($(this).val()) == true || $(this).val() == "0") {
            $("#deviceId").val("");
            return;
        }
        GetDeviceIdbyClientIdAndBuildingName();
    });
});

function RedirectToSensorPage()
{
    window.location.href = "points.html";
}

function SetBuildingIdAndDeviceIdinLocalStorage(buildingId, deviceId)
{
    localStorage.setItem(buildingIdStr, buildingId);
    localStorage.setItem(deviceIdStr, deviceId);
}


function GetBuildingNamebyClientId() {
    var clientId = GetDataFromLocalStorage(clientIdStr);
    
    var urlStr = baseUrl + "GetBuildingNameByClientId"
    $.ajax({
        type: 'GET',
        url: urlStr,
        data : {
            "clientId" :clientId
        }, 
        cache: false,
        success: function (data) {
            BindBuildingIdSelect(data);
        },
        error: function (xhr) {
            alert("error occured on getting the building Id");
        }
    });
}

function BindBuildingIdSelect(result) {
    var select = document.getElementById("buildingId");
    $(select).html("<option value='0'>Select lobby</option>");
    $.each(result, function (key, value) {
        $(select)
            .append($("<option></option>")
                .attr("value", value)
                .text(value));
    });
    var storageBuildingId = localStorage.getItem(buildingIdStr);
    if (ISNULLOrEmpty(storageBuildingId) == false)
    {
        $("#buildingId").val(storageBuildingId).trigger("change");
    }
}

function GetDeviceIdbyClientIdAndBuildingName() {
    var clientId = GetDataFromLocalStorage(clientIdStr);
    var buildingId = $("#buildingId option:selected").val();

    if (ISNULLOrEmpty(buildingId))
    {
        alert("Please select lobby");
        return;
    }

    var urlStr = baseUrl + "GetDeviceIdListByBuildingName"
    $.ajax({
        type: 'GET',
        url: urlStr,
        data : {
            "clientId" : clientId,
            "buildingName" : buildingId
        }, 
        cache: false,
        success: function (data) {
            FillDeviceId(data);
        },
        error: function (xhr) {
            alert("error occured on getting the device name");
        }
    });

}

function FillDeviceId(result) {
    // var deviceId = result.data[0].Device_ID;
    $("#deviceId").val(result);
}

