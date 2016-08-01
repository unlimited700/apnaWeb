import alt from '../../alt';
import APIService from '../../services/APIService';

var SearchActions = require('../../actions/search/SearchActions');
var UserActions = require('../../actions/user/UserActions');

class SearchStore {

    constructor() {
        this.selectedProblems = [];
        this.searchResults = [];
        this.searchInitialized = false;
        this.searchTerm = "";
        this.mappingStatus = "";
        this.mapping = {
            problem :{
                searchTerm: "",
                searchResults: []
            },
            solution: {
                searchTerm: "",
                searchResults: []
            },
            selectedSolution: [],
            selectedProblem: [],
            allProblems: [],
            allSolutions: [],
            // Static data for calculating index for mapping problem
            mappingDuration: [2,5,10,15,20,30,45,60,90,120],
            mappingDays: [1,2,5,10,15,20,30,45,60],
            mappingFrequency: [1,2,3,4,5,10,20],
            calculateIndex: (duration, days, frequency) => {
                var durationIndex = this.mapping.mappingDuration.indexOf(duration);
                var daysIndex = this.mapping.mappingDays.indexOf(days);
                var frequencyIndex = this.mapping.mappingFrequency.indexOf(frequency);
                if(durationIndex == -1 || daysIndex == -1 || frequencyIndex == -1)
                    return -1;
                return durationIndex * this.mapping.mappingDays.length * this.mapping.mappingFrequency.length +
                    daysIndex * this.mapping.mappingFrequency.length +
                    frequencyIndex + 1;
            }
        };

        this.recommendation = {recommendedDoctors: [], recommendedFood: [], recommendedYoga: [], recommendedRemedies:[]};
        this.isRecommendationLoading = true;
        var object = this;

        APIService.getProblems(data => {
            this.mapping.allProblems = data.problems;
            this.setState({allProblems: data.problems});
        });

        this.bindListeners({
            handleAdd: SearchActions.ADD,
            handleDelete: SearchActions.DELETE,
            handleSearch: SearchActions.SEARCH,
            handleRecommend: SearchActions.RECOMMEND,
            handleMappingProblemSearch: SearchActions.MAPPING_PROBLEM_SEARCH,
            handleMappingProblemAdd: SearchActions.MAPPING_PROBLEM_ADD,
            handleMappingProblemDelete: SearchActions.MAPPING_PROBLEM_DELETE,
            handleMappingSolutionSearch: SearchActions.MAPPING_SOLUTION_SEARCH,
            handleMappingSolutionAdd: SearchActions.MAPPING_SOLUTION_ADD,
            handleMappingSolutionDelete: SearchActions.MAPPING_SOLUTION_DELETE,
            handleMapping: SearchActions.MAP_PROBLEM_SOLUTION,
            updateSolutions: SearchActions.UPDATE_SOLUTIONS,
            clearData: UserActions.LOGOUT,
            clearData: UserActions.LOGIN
        });
    }
    _clearSearch() {
        for (i in this.selectedProblems.length) {
            allProblems.push(this.selectedProblems[i]);
        }
        this.searchTerm = "";
        this.selectedProblems = [];
    }
    _clearRecommendationResults() {
        this.recommendation = {
            recommendedYoga: [],
            recommendedDoctors: [],
            recommendedFood: [],
            recommendedRemedies: []
        }

    }

    clearData() {
        this._clearSearch();
        this.mappingStatus = "";
        this.searchResults = [];
        this.recommendation = [];
        this.searchInitialized = false;
    }

    handleAdd(text) {
        var added = this.allProblems.splice(this.allProblems.indexOf(text), 1)[0];
        if(added) {
            this.selectedProblems.push(added);
        }
        this.searchTerm = "";
        this.searchResults = [];
        this.searchInitialized = true;
        return true;
    }

    handleDelete(index) {
        var deleted = this.selectedProblems.splice(index, 1)[0];
        if(deleted) {
            this.allProblems.push(deleted);
        }
        if(!this.selectedProblems.length)
            this.searchInitialized = false;
        return true;
    }

    handleRecommend() {
        this.setState({isRecommendationLoading: true});
        if(this.selectedProblems.length) {
            APIService.getRecommendations(this.selectedProblems, response => {
                this.setState({
                    isRecommendationLoading: false,
                    recommendation: response
                })
            }, error => {
                this._clearRecommendationResults();
                this.setState( {
                    isRecommendationLoading: false
                });

            })
        }
        else {
            this._clearRecommendationResults();
            this.setState({
                isRecommendationLoading: false
            })
        }
    }


    handleSearch(text=this.searchTerm) {
        this.searchResults = [];
        this.searchTerm = text;
        if(!text) {
            return;
        }
        var pattern = new RegExp("^"+text, 'g');

        for( var problem in this.allProblems) {
            if(this.allProblems[problem].toLowerCase().match(pattern)) {
                this.searchResults.push(this.allProblems[problem])
            }
        }
        for( var problem in this.allProblems) {
            if(!(this.searchResults.indexOf(this.allProblems[problem]) > -1 ) && this.allProblems[problem].toLowerCase().match(text) )
                this.searchResults.push(this.allProblems[problem]);
        }
    }


    /**
     * Mapping functions
     */

    handleMappingProblemSearch(text) {
        this.mapping.problem.searchResults = [];
        this.mapping.problem.searchTerm = text;
        if(!text) {
            return;
        }
        var pattern = new RegExp("^"+text, 'g');

        for( var problem in this.mapping.allProblems) {
            if(this.mapping.allProblems[problem].toLowerCase().match(pattern)) {
                this.mapping.problem.searchResults.push(this.mapping.allProblems[problem])
            }
        }
        for( var problem in this.mapping.allProblems) {
            if(!(this.mapping.problem.searchResults.indexOf(this.allProblems[problem]) > -1 ) && this.mapping.allProblems[problem].toLowerCase().match(text) )
                this.mapping.problem.searchResults.push(this.mapping.allProblems[problem]);
        }
    }

    handleMappingSolutionSearch(text) {
        this.mapping.solution.searchResults = [];
        this.mapping.solution.searchTerm = text;
        if(!text) {
            return;
        }
        var pattern = new RegExp("^"+text, 'g');

        for( var solution in this.mapping.allSolutions) {
            if(this.mapping.allSolutions[solution].toLowerCase().match(pattern)) {
                this.mapping.solution.searchResults.push(this.mapping.allSolutions[solution])
            }
        }
        for( var solution in this.mapping.allSolutions) {
            if(!(this.mapping.solution.searchResults.indexOf(this.mapping.allSolutions[solution]) > -1 ) && this.mapping.allSolutions[solution].toLowerCase().match(text) )
                this.mapping.solution.searchResults.push(this.mapping.allSolutions[solution]);
        }

    }

    handleMappingProblemAdd(text) {
        var added = this.mapping.allProblems.splice(this.mapping.allProblems.indexOf(text), 1)[0];
        if(added) {
            this.mapping.selectedProblem = [added];
        }
        this.mapping.problem.searchTerm = "";
        this.mapping.problem.searchResults = [];
        return true;
    }
    handleMappingSolutionAdd(text) {
        var added = this.mapping.allSolutions.splice(this.mapping.allSolutions.indexOf(text), 1)[0];
        if(added) {
            this.mapping.selectedSolution.push(added);
        }
        this.mapping.solution.searchTerm = "";
        this.mapping.solution.searchResults = [];
        return true;
    }
    handleMappingProblemDelete() {
        this.mapping.allProblems.push(this.mapping.selectedProblem[0]);
        this.mapping.selectedProblem = [];
    }
    handleMappingSolutionDelete(index) {
        var toDelete = this.mapping.selectedSolutions.splice(index);
        this.mapping.allSolutions.push(toDelete);
    }

    handleMapping(data) {
        /**
         * @param data
         *  Contains (Duration or Frequency) and Days
         */
        var obj = this;
        if(!parseInt(data.frequency || !parseInt(data.duration) || !parseInt(data.days))) {
            obj.setState({mappingStatus: "Please select frequency, duration and days."});
            return;
        }
        if(obj.mapping.selectedProblem.length && obj.mapping.selectedSolution.length) {

            obj.setState({mappingStatus: "Mapping ..."});
            var doseIndex = obj.mapping.calculateIndex(data.duration, data.days, data.frequency);
            if(doseIndex == -1) {
                obj.setState({mappingStatus: "Invalid choice, please try again."});
                return ;
            }
            var postData = [];
            this.mapping.selectedProblem.map(problem => {
                this.mapping.selectedSolution.map(solution => {
                    postData.push({
                        problem: problem,
                        solution: solution,
                        rating: 1,
                        doseId: doseIndex
                    })
                })
            })

            var data = {
                solution: postData,
                uid: localStorage.getItem('uid'),
                authtoken: localStorage.getItem('token')
            }
            APIService.mapProblemSolution(data, response => {
                var message = "";

                if(response.responseCode == 200) {
                    message = "Added successfully.";
                }
                else {
                    message = "Something went wrong, please try again.";
                }
                for(var i in obj.mapping.selectedSolution)
                    obj.mapping.allSolutions.push(obj.mapping.selectedSolution[i]);
                obj.mapping.allProblems.push(obj.mapping.selectedProblem[0]);
                obj.mapping.selectedProblem = [];
                obj.mapping.selectedSolution = [];
                obj.setState({mappingStatus: message});



                setTimeout(function() {
                    obj.setState({mappingStatus: ""});
                }, 2000);
            });
        }
    }

    updateSolutions() {
        if(localStorage.getItem('uid')) {
            APIService.getSolutions({
                uid: localStorage.getItem('uid'),
                authtoken: localStorage.getItem('token')
            }, data => {
                this.mapping.allSolutions = data.solutions;
            })
        }
    }

}

module.exports = alt.createStore(SearchStore, 'SearchStore');
