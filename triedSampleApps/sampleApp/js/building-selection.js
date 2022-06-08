$(document).ready(function () {   
    GetBuildingNamebyClientId();
    $("#buildingpage_btn").click(function () {
        var clientId = GetDataFromLocalStorage(clientIdStr);
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

    $("#buildingId").click(function () {
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
    webOS.service.request("luna://com.yourdomain.airquality.service/", {
        method: "buildingnamebyclientid",
        parameters: { clientId: clientId},
        onFailure: showFailure,
        onSuccess: BindBuildingIdSelect
    });
}

function BindBuildingIdSelect(result) {
    var select = document.getElementById("buildingId");
    $(select).html("<option value='0'>Select lobby</option>");
    $.each(result.data, function (key, value) {
        $(select)
            .append($("<option></option>")
                .attr("value", value.Building_Name)
                .text(value.Building_Name));
    });
}

function GetDeviceIdbyClientIdAndBuildingName() {
    var clientId = GetDataFromLocalStorage(clientIdStr);
    var buildingId = $("#buildingId option:selected").val();

    if (ISNULLOrEmpty(buildingId))
    {
        alert("Please select lobby");
        return;
    }

    webOS.service.request("luna://com.yourdomain.airquality.service/", {
        method: "deviceidbybuildingname",
        parameters: { clientId: clientId, buildingId: buildingId },
        onFailure: showFailure,
        onSuccess: FillDeviceId
    });
}

function FillDeviceId(result) {
    var deviceId = result.data[0].Device_ID;
    $("#deviceId").val(deviceId);
}
