var request = require('request');


exports.req = function (link) {
    return new Promise(function (fulfill, reject) {
        request(link, function (error, response, body) {
            if (error && response.statusCode == 200) {
                reject();
            }
            fulfill(body);
        });
    });
}

exports.getMovieString = function (movie) {
    return new Promise(function (fulfill, reject) {
        var string = "*Title* : " + movie.title + "\n*Release Year* : " + movie.year + "\n*Imdb Rating* : " +
            movie.rating + "\n*Runtime* : " + movie.runtime + " minutes" + "\n*Summary* : " + movie.summary + "\n*Torrents* : [crap](www.google.com)";
        var torrentLinks = "";
        movie.torrents.forEach(function (torrent) {
            torrentLinks = torrentLinks + "\n*Quality* : " + torrent.quality + "\n*Size* : " + torrent.size +
                "\n Download Link : [" + movie.title_long +" "+torrent.quality + "](" + getMagnet(torrent.hash, movie.title) + ")";
        });
        //string=string+torrentLinks;
        fulfill(string);
    });
}


function getMagnet(hash, name) {
    var name=name.replace(/ /g,"_");
    var magnet = "magnet:?xt=urn:btih:" + hash + "&dn=" + name + "&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969";
    return magnet;
}