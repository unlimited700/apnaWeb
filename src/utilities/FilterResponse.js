import NProgress from 'nprogress';

var soFar;
var contentLength;
var fullResponse = "";

var FilterResponse = function(data) {
    fullResponse = "";
    soFar = 0;
    contentLength = data.headers.get('Content-Length');
    return pump(data.body.getReader());
}

function pump(reader) {
    return reader.read().then(function(result) {
        if(result.done) {
            NProgress.done();
            return JSON.parse(fullResponse);
        }
        var decoder = new TextDecoder();
        const chunk = result.value;
        fullResponse += decoder.decode(result.value || new Uint8Array, { stream: !result.done});

        soFar += result.value.byteLength;
        updateProgress();
        return pump(reader);
    });
}

function updateProgress(reader) {
    NProgress.inc(.5);
//    console.log("loaded: ", soFar / contentLength);
}

module.exports = FilterResponse;