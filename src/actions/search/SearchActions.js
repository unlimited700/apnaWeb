var SearchDispatcher = require('../../dispatchers/search/SearchDispatcher');
var C = require('../../constants/Constants');

var SearchActions = {

    create: function(text) {
        SearchDispatcher.handleSearchAction({
            actionType: C.ActionConstants.PROBLEM_ADD,
            text: text
        })
    },

    destroy: function (text) {
        SearchDispatcher.handleSearchAction({
            actionType: C.ActionConstants.PROBLEM_DESTROY,
            text: text
        });
    }
};

module.exports = SearchActions;