import NProgress from 'nprogress';

var FilterResponse = function(data) {
    NProgress.done();
    return data.json();
}

module.exports = FilterResponse;