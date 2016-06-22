var SearchDispatcher = require('../../dispatchers/search/SearchDispatcher');
var EventEmitter = require('events').EventEmitter;
var C = require('../../constants/Constants')
var assign = require('object-assign');
//var Api = require('../Api');

var _allProblems = {};
var _selectedProblems = {};

var SearchStore = assign({}, EventEmitter.prototype, {
    /**
     * Get the collection of Problems.
     */
    all: function() {
        return _allProblems;
        /*
        if (_allProblems) {
            return _allProblems;
        }
        else {
            Api.get('/v1/problems').then(function(problems) {
               _allProblems =  problems;
            });
        }
        */
    },

    selected: function () {
        return _selectedProblems;
    },

    emitChange: function() {
        this.emit(C.ActionConstants.RECIEVED_PROBLEMS);
    },

    addChangeListener: function(callback) {
        this.on(C.ActionConstants.RECIEVED_PROBLEMS, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(C.ActionConstants.RECIEVED_PROBLEMS, callback);
    },

    dispatcherIndex: SearchDispatcher.register(function(payload) {
        var action = payload.action;
        var text;

        switch(action.actionType) {
            case C.SEARCH:
                SearchStore.emitChange();
                break;
        }

        return true;
    })
});

module.exports = SearchStore;