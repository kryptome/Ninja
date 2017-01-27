var YQL = require('yql');
var weather=require('./weather');

exports.getLocationDetails = function (lati, long) {
    return new Promise(function (fulfill, reject) {
        var string;
        var query = new YQL('select * from ugeo.reversegeocode where latitude=' + lati +
            ' and longitude=' + long + ' and appname="your-assigned-appname"');
        query.exec(function (err, data) {
            if (err) {
                reject(err);
            }
            var detail = data.query.results.result.locations.woe;
            string = "*Name* : " + detail.name + "\n*Time zone* : " + detail.timezone.name;
            weather.getWeather(detail.name).then(function(result){
                string=string+result;
                fulfill(string);
            })
        });

    });
}