var indoorData;
var timerId;
$(document).ready(function () {
    SetAppNameAndLogoFromLocalStorage();
    GetIndoorAndOutDoorQirQualityData();
    SetThanksMessageFromLocalStorage();
    $('.points-carousel').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        margin: 10,
        items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 450
    });

    timerId = setInterval(function () {
        GetIndoorAndOutDoorQirQualityData();
    }, 60 * 1000);
});

function GetIndoorAndOutDoorQirQualityData()
{
    var clientId = GetDataFromLocalStorage(clientIdStr);
    var deviceId = GetDataFromLocalStorage(deviceIdStr);
    GetSensorDataByClientAndDeviceId(clientId, deviceId);
}

function GetSensorDataByClientAndDeviceId(clientId, deviceId) {

    var urlStr = baseUrl + "GetSensorDataByClientAndDeviceId"
    $.ajax({
        type: 'GET',
        url: urlStr,
        data : {
            "clientId" :clientId,
            "deviceId" : deviceId
        }, 
        cache: false,
        success: function (data) {
            BindSensorDataForIndoor(data);
        },
        error: function (xhr) {
            alert("error occured on getting the sensor data");
        }
    });
}

function BindSensorDataForIndoor(result)
{
    indoorData = result;
    var clientId = GetDataFromLocalStorage(clientIdStr);
    var buildingId = GetDataFromLocalStorage(buildingIdStr);
    GetNearByStationForOutdoor(clientId, buildingId);
}

function GetNearByStationForOutdoor(clientId, buildingId)
{
    var urlStr = baseUrl + "GetNearByStationForOutdoor"
    $.ajax({
        type: 'GET',
        url: urlStr,
        data : {
            "clientId" :clientId,
            "buildingName" : buildingId
        }, 
        cache: false,
        success: function (data) {
            GetOutDoorData(data);
        },
        error: function (xhr) {
            alert("error occured on getting the building Id");
        }
    });
}

function GetOutDoorData(result)
{
    var nearByStation = result.length > 0 ? result[0] : "chennai";
    var token = "de5398d8a99e2790e8cb2a546f05341f34d98182";
    var urlStr = "https://api.waqi.info/feed/" + nearByStation + "/?token=" + token;
    //var urlStr = "https://api.waqi.info/feed/india/gurugram/sector-51/?token=de5398d8a99e2790e8cb2a546f05341f34d98182";
    $.ajax({
        type: 'GET',
        url: urlStr,
        cache: false,
        dataType: 'json',
        success: function (data) {
            BindSensorDataForOutDoor(data);
        },
        error: function (xhr) {
            alert("error occured");
        }
    });
}

function BindSensorDataForOutDoor(result) {
    var outdoorData = result;
    var airQualityIndexMeasurementList = BuildAirqualityMeasurementJson(outdoorData);
    BindAirQualityHTML(airQualityIndexMeasurementList);
}

function BuildAirqualityMeasurementJson(outDoorData)
{
    var airQualityIndexMeasurementList = [];
    var indoorQuality = indoorData;
    var airQualityOutdoor = outDoorData;
    var outdoorAQI = airQualityOutdoor != null ? airQualityOutdoor.data.aqi.toString() : "0";
    var outdoorPM2_5 = airQualityOutdoor != null ? airQualityOutdoor.data.iaqi.pm25.v.toString() : "0";
    var outDoorPM10 = airQualityOutdoor != null ? airQualityOutdoor.data.forecast.daily.pm10[2].max.toString() : "0";

    //QualityList = DummyData();
    if (indoorQuality == null || indoorQuality.length <= 0) {
        $(".noDataAvailableDiv").removeClass("hide");
        $(".points-carousel").addClass("hide");
        return airQualityIndexMeasurementList;
    }
        retVal = true;
        var count = 0;
        var qualityCount = indoorQuality.length;

        for (var i = count; i < qualityCount; i++)
        {
            var obj1 = 
            {
                'MeasurementType' : "AQI",
                'IndoorValue' : indoorQuality[i].aqi,
                'OutdoorValue' : outdoorAQI,
                'IndoorColor' : SetAQIColor(indoorQuality[i].aqi),
                'OutdoorColor' : SetAQIColor(outdoorAQI),
                'Date' : "on " + indoorQuality[i].date,
                'Time': "at " + indoorQuality[i].time,
                'IsMessage': false
            };

            airQualityIndexMeasurementList.push(obj1);

            var obj2 = 
            {
                'MeasurementType' : "PM 2.5",
                'IndoorValue' : indoorQuality[i].pM2_5,
                //IndoorValue : SetMeasurementValue(QualityList[i].PM2_5),
                'OutdoorValue' : outdoorPM2_5,
                //OutdoorValue : SetMeasurementValue(outdoorPM2_5),
                'IndoorColor' : SetAQIColor(indoorQuality[i].pM2_5),
                'OutdoorColor' : SetAQIColor(outdoorPM2_5),
                'Date' : "on " + indoorQuality[i].date,
                'Time' : "at " + indoorQuality[i].time,
                'IsMessage' : false
            };
            airQualityIndexMeasurementList.push(obj2);

            var obj3 = 
            {
                'MeasurementType' : "PM 10",
                'IndoorValue': indoorQuality[i].pM10,
                //IndoorValue : SetMeasurementValue(QualityList[i].PM10),
                'OutdoorValue' : outDoorPM10,
                //OutdoorValue : SetMeasurementValue(outDoorPM10),
                'IndoorColor' : SetAQIColor(indoorQuality[i].pM10),
                'OutdoorColor' : SetAQIColor(outDoorPM10),
                'Date' : "on " + indoorQuality[i].date,
                'Time' : "at " + indoorQuality[i].time,
                'IsMessage' : false
            };
            airQualityIndexMeasurementList.push(obj3);

            var obj4 = 
            {
                'MeasurementType' : "Have a Healthy day",
                'IsMessage' : true
            };
            airQualityIndexMeasurementList.push(obj4);

            count++;
        }

        $(".noDataAvailableDiv").addClass("hide");
        $(".points-carousel").removeClass("hide");
    return airQualityIndexMeasurementList;
}

function BindAirQualityHTML(airQualityIndexMeasurementList)
{
    $.each(airQualityIndexMeasurementList, function (key, val) {
        if (val.IsMessage)
        {
            return;
        }

        $(".airquallity_div" + key).find(".airqual_datetime" + key).text(val.Date + " " + val.Time);
        $(".airquallity_div" + key).find(".air_qualityHeader" + key).text(val.MeasurementType);
        $(".airquallity_div" + key).find(".airqual_indoor" + key).text(val.IndoorValue);
        $(".airquallity_div" + key).find(".airqual_outdoor" + key).text(val.OutdoorValue);
        $(".airquallity_div" + key).find(".airqual_indoor" + key).css("color", val.IndoorColor);
        $(".airquallity_div" + key).find(".airqual_outdoor" + key).css("color", val.OutdoorColor);
    });
}

function SetAQIColor(aqiString)
{
    var aqi = parseFloat(aqiString);
    var color = "";
    if (aqi >= 0 && aqi <= 30) {
        color = "#74c044";
    }
    else if (aqi > 31 && aqi <= 60) {
        color = "#138f46";
    }
    else if (aqi > 61 && aqi <= 90) {
        color = "#f3eb1a";
    }
    else if (aqi > 91 && aqi <= 120) {
        color = "#c65c28";
    }
    else if (aqi > 121 && aqi <= 250) {
        color = "#ed1e24";
    }
    else {
        color = "#a41e25";
    }
    return color;
}


function SetThanksMessageFromLocalStorage()
{
    $(".common-thanks_cntnt").css("visibility", "hidden");
    $(".msg_thanks_cntnt").css("visibility", "hidden");
    var thanksMsg = GetDataFromLocalStorage(thanksMsgStr);
    if(ISNULLOrEmpty(thanksMsg) == false)
    {
        $(".msg_thanks_cntnt").css("visibility", "visible");
        $(".msg_thanks_cntnt").text(thanksMsg);
        return;
    }
    $(".common-thanks_cntnt").css("visibility", "visible");
}