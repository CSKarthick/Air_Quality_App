$(document).ready(function () {
    SetAppNameAndLogoFromLocalStorage();
    SetBackGroundColorFromLocalStorage();
    
    GetClientIdForLogin();

    $("#loginbtn").click(function () {
        ValidateAndLogin();
    });
});

//on load for login method
function GetClientIdForLogin()
{
    // webOS.service.request("luna://com.domain.airquality.service/", {
    //     method: "cliendIdforlogin",
    //     parameters: {},
    //     onFailure: showFailure,
    //     onSuccess: BindClientId
    // });

    var urlStr = baseUrl + "GetClientIdList"
    $.ajax({
        type: 'GET',
        url: urlStr,
        cache: false,
        dataType: 'json',
        success: function (data) {
            BindClientId(data);
        },
        error: function (xhr) {
            alert("error occured on landing");
        }
    });

}

function BindClientId(result) {
    var select = document.getElementById("clientId");
    $(select).html("");
    $.each(result, function (key, value) {
        $(select)
            .append($("<option></option>")
                .attr("value", value)
                .text(value));
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
    // webOS.service.request("luna://com.yourdomain.helloworld.service/", {
    //     method: "loginwithclientidandpassword",
    //     parameters: { clientId: clientId, password: password },
    //     onFailure: showFailure,
    //     onSuccess: ValidateAfterLogin
    // });

    var loginParameters = {
        "ClientId": clientId,
        "Password" : password
    }
    
    var urlStr = baseUrl + "Login"
    $.ajax({
        type: 'GET',
        url: urlStr,
        data : {
            "login" :JSON.stringify(loginParameters)
        }, 
        cache: false,
        success: function (data) {
            ValidateAfterLogin(data);
        },
        error: function (xhr) {
            alert("error occured on login");
        }
    });
}

function ValidateAfterLogin(result) {
    if (ISNULLOrEmpty(result) == false)
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
