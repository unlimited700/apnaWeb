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

    recommend() {
        return true;
    }

}

module.exports = alt.createActions(SearchActions);