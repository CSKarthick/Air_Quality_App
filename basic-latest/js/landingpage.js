$(document).ready(function () {
    var uniqueIdVal = GetDataFromLocalStorage(uniqueIdStr);
    if(ISNULLOrEmpty(uniqueIdVal) == false)
    {
        RedirecttoLoginHTML();
        return;
    }

    $("#unique_id_login_btn").click(function () {
        ValidateAndRedirectToLoginpage();
    });
});


//check and redirect to login page
function ValidateAndRedirectToLoginpage()
{
    var uniqueId = $("#unique_id").val();

    if (!CheckUniqueId(uniqueId))
    {
        alert("Unique Id cannot be empty");
        return;
    }
    GetCMSDetailsbyUniqueId(uniqueId);
}

function CheckUniqueId(uniqueId) {
    if (ISNULLOrEmpty(uniqueId)) { return false; }

    return true;
}

function GetCMSDetailsbyUniqueId(uniqueId)
{
    var urlStr = baseUrl + "GetUserDetailsForCMS"
    $.ajax({
        type: 'GET',
        url: urlStr,
        data : {
            "uniqueId" :uniqueId
        }, 
        cache: false,
        success: function (data) {
            ValidateAndRedirectToLoginPage(uniqueId, data);
        },
        error: function (xhr) {
            alert("error occured on login");
        }
    });
}

function ValidateAndRedirectToLoginPage(uniqueId, result) {
    if (ISNULLOrEmpty(result)|| (ISNULLOrEmpty(result.logo1) && ISNULLOrEmpty(result.logo2) && ISNULLOrEmpty(result.audio) 
                                && ISNULLOrEmpty(result.appName) && ISNULLOrEmpty(result.color1) && ISNULLOrEmpty(result.color2) 
                                && ISNULLOrEmpty(result.email) && ISNULLOrEmpty(result.thanksMessage)))
    {
        alert("Please enter valid Unique Id");
        return;
    }
    SetLocalStorageFromUniqueId(uniqueId, result);
    RedirecttoLoginHTML();
    return;
}

function SetLocalStorageFromUniqueId(uniqueId, result)
{
    if(ISNULLOrEmpty(uniqueId) == false){ SetLocalStorage(uniqueIdStr,uniqueId); }
    if(ISNULLOrEmpty(result.logo1) == false){ SetLocalStorage(logo1Str,result.logo1); }
    if(ISNULLOrEmpty(result.logo2) == false){ SetLocalStorage(logo2Str,result.logo2); }
    if(ISNULLOrEmpty(result.audio) == false){ SetLocalStorage(audioStr,result.audio); }
    if(ISNULLOrEmpty(result.appName) == false){ SetLocalStorage(appNameStr,result.appName); }
    if(ISNULLOrEmpty(result.color1) == false){ SetLocalStorage(color1Str,result.color1); }
    if(ISNULLOrEmpty(result.color2) == false){ SetLocalStorage(color2Str,result.color2); }
    if(ISNULLOrEmpty(result.email) == false){ SetLocalStorage(emailStr,result.email); }
    if(ISNULLOrEmpty(result.thanksMessage) == false){ SetLocalStorage(thanksMsgStr,result.thanksMessage); }
}

function SetLocalStorage(resultStr, result)
{
    localStorage.setItem(resultStr, result);   
}

function RedirecttoLoginHTML()
{
    window.location.href = "index.html"
}
