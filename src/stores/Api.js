var C = require('../constants/Constants');
var base = "http://localhost:3007";

var Api = {
    get: function(url) {
        return new Promise(function (resolve, reject) {
            var options = {
                url: base + url,
                headers: {
                    'Content-Type': 'application/json',
                    'uid': C.PUBLIC_CREDENTIALS.uid,
                    'authtoken': C.PUBLIC_CREDENTIALS.authtoken
                }
            };
            Request.get(options, function (res) {
                if(res.status == 200) {
                    console.log("Problems fetched", JSON.parse(res.text));
                    resolve(JSON.parse(res.text));
                }
                else {
                    console.log("error fetching problems");
                    reject();
                }
            });
        });
    }
}

module.exports = Api;