$(document).ready(function () {
    GetClientIdForLogin();

    $("#loginbtn").click(function () {
        ValidateAndLogin();
    });
});

//on load for login method
function GetClientIdForLogin()
{
    webOS.service.request("luna://com.domain.app.service/", {
        method: "cliendIdforlogin",
        parameters: {},
        onFailure: showFailure,
        onSuccess: BindClientId
    });
}

function BindClientId(result) {
    var select = document.getElementById("clientId");
    $(select).html("");
    $.each(result.data, function (key, value) {
        $(select)
            .append($("<option></option>")
                .attr("value", value.Client_ID)
                .text(value.Client_ID));
    });

    var storageClientId = localStorage.getItem(clientIdStr);
    if (ISNULLOrEmpty(storageClientId) == false)
    {
        $("#clientId").val(storageClientId).trigger("change");
    }
}

//check and login

function ValidateAndLogin()
{
    var clientId = $("#clientId option:selected").val();
    var password = $("#pwd").val();

    if (!CheckClientIdAndPassword(clientId, password))
    {
        alert("Client Id or Password cannot be empty");
        return;
    }
    LoginbyClientIdAndPassword(clientId, password);
}

function CheckClientIdAndPassword(clientId, password) {
    if (ISNULLOrEmpty(clientId) || ISNULLOrEmpty(password)) { return false; }
    return true;
}

function LoginbyClientIdAndPassword(clientId, password)
{
    webOS.service.request("luna://com.domain.app.service/", {
        method: "loginwithclientidandpassword",
        parameters: { clientId: clientId, password: password },
        onFailure: showFailure,
        onSuccess: ValidateAfterLogin
    });
}

function ValidateAfterLogin(result) {
    if (result.data[0].LoginCount <= 0)
    {
        alert("Please enter valid password");
        return;
    }
    RedirecttoBuildingHTML();
}

function RedirecttoBuildingHTML()
{
    var clientId = $("#clientId option:selected").val();
    localStorage.setItem(clientIdStr, clientId);
    window.location.href = "building-selection.html"
}
