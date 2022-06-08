var clientIdStr = "client_id";
var buildingIdStr = "building_id";
var deviceIdStr = "device_id";

//function RedirectToSensorPage(clientId, buildingId, deviceId)
//{
//    window.location.href = "points.html";
//    GetSensorDataByClientAndDeviceId(clientId, deviceId);
//    GetNearByStationForOutdoor(clientId, buildingId);
//}

//function SetBuildingIdAndDeviceIdinLocalStorage(buildingId, deviceId)
//{
//    localStorage.setItem(buildingIdStr, buildingId);
//    localStorage.setItem(deviceIdStr, deviceId);
//}


//function displayReponse() {
//    debugger;
//    var value = document.getElementById("input").value;
//    webOS.service.request("luna://com.yourdomain.helloworld.service/", {
//        method: "hello",
//        parameters: { name: value },
//        onFailure: showFailure,
//        onSuccess: showSuccess
//    });
//}

////on load for login method
//function GetClientIdForLogin()
//{
//    webOS.service.request("luna://com.yourdomain.helloworld.service/", {
//        method: "cliendIdforlogin",
//        parameters: {},
//        onFailure: showFailure,
//        onSuccess: BindClientId
//    });
//}

//function BindClientId(result) {
//    debugger;
//    var select = document.getElementById("clientId");
//    $(select).html("");
//    $.each(result.data, function (key, value) {
//        $(select)
//            .append($("<option></option>")
//                .attr("value", value.Client_ID)
//                .text(value.Client_ID));
//    });
//}

////check and login

//function ValidateAndLogin()
//{
//    var clientId = $("#clientId option:selected").val();
//    var password = $("#pwd").val();

//    if (!CheckClientIdAndPassword(clientId, password))
//    {
//        alert("Client Id or Password cannot be empty");
//        return;
//    }
//    LoginbyClientIdAndPassword(clientId, password);
//}

//function CheckClientIdAndPassword(clientId, password) {
//    if (ISNULLOrEmpty(clientId) || ISNULLOrEmpty(password)) { return false; }
//    return true;
//}

//function LoginbyClientIdAndPassword(clientId, password)
//{
//    webOS.service.request("luna://com.yourdomain.helloworld.service/", {
//        method: "loginwithclientidandpassword",
//        parameters: { clientId: clientId, password: password },
//        onFailure: showFailure,
//        onSuccess: ValidateAfterLogin
//    });
//}

//function ValidateAfterLogin(result) {
//    if (result.data[0].LoginCount <= 0)
//    {
//        alert("Please enter valid password");
//        return;
//    }
//    RedirecttoBuildingHTML();
//}

//function RedirecttoBuildingHTML()
//{
//    var clientId = $("#clientId option:selected").val();
//    localStorage.setItem(clientIdStr, clientId);
//    window.location.href = "building-selection.html"
//    GetBuildingNamebyClientId(clientId);
//}

function GetDataFromLocalStorage(storageId) {
    var storageValue = localStorage.getItem(storageId);
    return storageValue;
}

function showSuccess(res) {
    debugger;
    console.log(res);

    //document.getElementById("result1").innerHTML = "Service Responded!";
    //document.getElementById("result2").innerHTML = res.data;
}

function showFailure(err) {
    debugger;
    //document.getElementById("result1").innerHTML = "Failed!";
    //document.getElementById("result2").innerHTML = "(" + err.data.errno + ") " + err.data.code;
    console.log(err);
}

//function GetBuildingNamebyClientId() {
//    var clientId = GetDataFromLocalStorage(clientIdStr);
//    webOS.service.request("luna://com.yourdomain.helloworld.service/", {
//        method: "buildingnamebyclientid",
//        parameters: { clientId: clientId},
//        onFailure: showFailure,
//        onSuccess: BindBuildingIdSelect
//    });
//}

//function BindBuildingIdSelect(result) {
//    console.log(result);
//    var select = document.getElementById("buildingId");
//    $(select).html("<option value='0'>Select lobby</option>");
//    $.each(result.data, function (key, value) {
//        $(select)
//            .append($("<option></option>")
//                .attr("value", value.Building_Name)
//                .text(value.Building_Name));
//    });
//}

//function GetDeviceIdbyClientIdAndBuildingName() {
//    var clientId = GetDataFromLocalStorage(clientIdStr);
//    var buildingId = $("#buildingId option:selected").val();

//    if (ISNULLOrEmpty(buildingId))
//    {
//        alert("Please select lobby");
//        return;
//    }

//    webOS.service.request("luna://com.yourdomain.helloworld.service/", {
//        method: "deviceidbybuildingname",
//        parameters: { clientId: clientId, buildingId: buildingId },
//        onFailure: showFailure,
//        onSuccess: FillDeviceId
//    });
//}

//function FillDeviceId(result) {
//    console.log(result);
//    var deviceId = result.data[0].Device_ID;
//    $("#deviceId").val(deviceId);
//}

//function GetSensorDataByClientAndDeviceId(clientId, deviceId) {
//    webOS.service.request("luna://com.yourdomain.helloworld.service/", {
//        method: "sensordatabyclientidanddeviceid",
//        parameters: { clientId: clientId, deviceId: deviceId },
//        onFailure: showFailure,
//        onSuccess: BindSensorDataForIndoor
//    });
//}

//function BindSensorDataForIndoor(result)
//{
//    //TODO
//    console.log(result);
//}

//function GetNearByStationForOutdoor(clientId, buildingId)
//{
//    webOS.service.request("luna://com.yourdomain.helloworld.service/", {
//        method: "nearbystationforoutdoor",
//        parameters: { clientId: clientId, buildingId: buildingId },
//        onFailure: showFailure,
//        onSuccess: GetOutDoorData
//    });
//}

//function GetOutDoorData(result)
//{
//    console.log(result);
//    var nearByStation = result.data.length > 0 ? result.data[0].Nearby_Station : "chennai";
//    var token = "de5398d8a99e2790e8cb2a546f05341f34d98182";
//    console.log(nearByStation + " : " + token);
//    webOS.service.request("luna://com.yourdomain.helloworld.service/", {
//        method: "sensordataforoutdoor",
//        parameters: { nearByStation: nearByStation, token: token },
//        onFailure: showFailure,
//        onSuccess: BindSensorDataForOutDoor
//    });
//}

//function BindSensorDataForOutDoor(result) {
//    //TODO
//    console.log("outdoor sensor data");
//    console.log(result);
//}

function ISNULLOrEmpty(value) {
    if (value == null || value == "" || value == undefined)
        return true;
    return false;
}

function LogoutFromApp() {
    localStorage.removeItem(buildingIdStr);
    localStorage.removeItem(deviceIdStr);
    window.location.href = "index.html";
}