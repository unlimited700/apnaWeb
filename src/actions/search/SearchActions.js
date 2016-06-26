import alt from '../../alt';

class SearchActions {
    search(text) {
        return text;
    }

    delete(index) {
//        console.log("delete event called: ", index);
        return index;
    }

    add(text) {
//        console.log("request to add", index);
        return text;
    }

    problemsFetchFailed(errorMessage) {
        return errorMessage;
    }

    problemsLoading(problem) {
        return problem;
    }
}

module.exports = alt.createActions(SearchActions);