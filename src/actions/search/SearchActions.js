import alt from '../../alt';

class SearchActions {
    search(text) {
        return text.trim().toLowerCase();
    }

    delete(index) {
//        console.log("delete event called: ", index);
        return index;
    }

    add(text) {
//        console.log("request to add", index);
        return text;
    }

    recommend() {
        return true;
    }

    mappingProblemSearch(text) {
        return text.trim().toLowerCase();
    }
    mappingProblemAdd(text) {
        return text;
    }
    mappingProblemDelete(index) {
        return index;
    }


    mappingSolutionSearch(text) {
        return text.trim().toLowerCase();
    }
    mappingSolutionAdd(text) {
        return text;
    }
    mappingSolutionDelete(index) {
        return index;
    }

    mapProblemSolution(data) {
        return data;
    }

    updateSolutions() {
        return true;
    }

}

module.exports = alt.createActions(SearchActions);