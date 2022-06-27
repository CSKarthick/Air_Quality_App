var baseUrl = "http://projects.fldec.com:5289/AirQuality/";
var uniqueIdStr = "unique_id"
var logo1Str = "logo1_path";
var logo2Str = "logo2_path";
var audioStr = "audio_path";
var appNameStr = "appName"
var color1Str = "color1";
var color2Str = "color2";
var emailStr = "emailid";
var thanksMsgStr = "thanksMsg";
var clientIdStr = "client_id";
var buildingIdStr = "building_id";
var deviceIdStr = "device_id";



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

function SetAppNameAndLogoFromLocalStorage()
{
    $(".first_logo").css("visibility", "hidden");
    $(".second_logo").css("visibility", "hidden");

    var appName = GetDataFromLocalStorage(appNameStr);
    if(ISNULLOrEmpty(appName) == false)
    {
        $(".appTitle").text(appName);
    }
    
    var logo1 = GetDataFromLocalStorage(logo1Str);
    if(ISNULLOrEmpty(logo1) == false)
    {
        $(".first_logo").css("visibility", "visible");
        $(".first_logo").attr("src",logo1);
    }
    
    var logo2 = GetDataFromLocalStorage(logo2Str);
    if(ISNULLOrEmpty(logo2) == false)
    {
        $(".second_logo").css("visibility", "visible");
        $(".second_logo").attr("src", logo2);
    }
}

function SetBackGroundColorFromLocalStorage()
{
    var color1 = GetDataFromLocalStorage(color1Str);
    if(ISNULLOrEmpty(color1) == false)
    {
        $(".bg_color1").css("background-color", color1);
    }
    
    var color2 = GetDataFromLocalStorage(color2Str);
    if(ISNULLOrEmpty(color2) == false)
    {
        $(".bg_color2").css("background-color", color2);
    }
}

function GetDataFromLocalStorage(storageId) {
    var storageValue = localStorage.getItem(storageId);
    return storageValue;
}

function showSuccess(res) {
    console.log(res);
    alert(res);
}

function showFailure(err) {
    console.log(err);
    alert(err);
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