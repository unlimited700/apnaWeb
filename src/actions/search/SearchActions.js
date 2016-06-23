var alt = require('../../alt');

class SearchActions {
    search(text) {
        return text;
    }

    delete(index) {
//        console.log("delete event called: ", index);
        return index;
    }

    add(index) {
//        console.log("request to add", index);
        return index;
    }

    problemsFetchFailed(errorMessage) {
        return errorMessage;
    }

    problemsLoading(problem) {
        return problem;
    }
}

module.exports = alt.createActions(SearchActions);