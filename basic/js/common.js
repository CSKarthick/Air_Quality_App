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
    console.log(res);
}

function showFailure(err) {
    console.log(err);
}

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