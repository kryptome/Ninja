var util = require('../util/util');
exports.getJoke = function () {
    return new Promise(function (fulfill, reject) {
        var num = Math.floor((Math.random() * 2) + 1); // generate a random number between 1 or 2
        switch (num) {
            case 1:
                util.req("https://api.chucknorris.io/jokes/random").then(function (data) {
                    fulfill(data.value);
                });
                break;
            case 2:
                util.req("http://api.yomomma.info/").then(function (data) {
                    fulfill(data.joke);
                });
                break;
        }
    });
}

function rand1() {
    return new promise(function (fulfill, reject) {
        util.req("https://api.chucknorris.io/jokes/random").then(function (data) {
            fulfill(data.value);
        });
    });

}

function rand2() {
    return new promise(function (fulfill, reject) {
        util.req("http://api.yomomma.info/").then(function (data) {
            fulfill(data.joke);
        });
    });
}