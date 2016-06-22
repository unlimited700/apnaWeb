var Dispatcher = require('../Dispatcher');
var assign = require('object-assign');



var SearchDispatcher = assign({}, Dispatcher.prototype, {

    handleSearchAction: function(action) {
        this.dispatch({
            source: 'SEARCH_ACTION',
            action: action
        });
    }

});

module.exports = SearchDispatcher;