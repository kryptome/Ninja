var YQL = require('yql');


exports.getWeather = function (city) {
    if (!arguments[0]) {
        var city = false;
    }
    return new Promise(function (fulfill, reject) {
        if (!city) {
            fulfill("Use /weather < Cityname > to get weaather details");
        }
        var query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + '")');
        query.exec(function (err, data) {
            if (err) {
                reject(err);
            }
            if (data.query.results == null) {
                fulfill("No details regarding " + city + " found ");
            } else {
                var astronomy = data.query.results.channel.astronomy;
                var location = data.query.results.channel.location;
                var condition = data.query.results.channel.item.condition;
                var celcius = ((condition.temp - 32) * (5 / 9));
                celcius = celcius.toFixed(2);
                var str = 'The current weather in ' + location.city + ', ' + location.region + ' is ' + celcius + '°C. ' +
                    "Sunrise : " + astronomy.sunrise + " Sunset : " + astronomy.sunset
                fulfill(str);
            }
        });
    });
}