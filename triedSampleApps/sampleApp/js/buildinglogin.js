function displayReponse() {
    var value = document.getElementById("input").value;
    webOS.service.request("luna://com.yourdomain.airquality.service/", {
        method: "hello",
        parameters: { name: value },
        onFailure: showFailure,
        onSuccess: showSuccess
    });
}

function GetClientIdForLogin()
{
    webOS.service.request("luna://com.yourdomain.airquality.service/", {
        method: "cliendIdforlogin",
        parameters: {},
        onFailure: showFailure,
        onSuccess: BindClientId
    });
}

function BindClientId(result) {
    var select = document.getElementById("clientId");
    for (var i = 0; i <= result.count; i++) {
        var option = document.createElement("option");
        option.text = result[i];
        option.value = result[i];
        select.appendChild(option);
    }
}

