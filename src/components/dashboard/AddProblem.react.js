import React from 'react';
import UserActions from '../../actions/user/UserActions';

var AddProblem = React.createClass({

    render: function () {
        return (
            <div className="search-container">
                <h3>Add problem</h3>
                <p>{this.props.addedProblemStatus}</p>
                <form onSubmit={this.addProblem} className="form-container">
                    <input type="text" placeholder="Problem"/><br /><br />
                    <div>
                        Problem Type: &nbsp; 
                        <select>
                            <option value="DISEASE">DISEASE </option>
                            <option value="SYMPTOM">SYMPTOM </option>
                            <option value="BODY">BODY </option>
                        </select>
                    </div><br />
                    <button type="submit" className="green-btn">Add</button>
                </form>
            </div>
        );
    },


    addProblem: function (event) {
        event.preventDefault();
        var prob = event.target.children[0].value;
        var type = event.target.children[3].children[0].value;
        UserActions.addProblem( prob, type);

        event.target.children[0].value = "";
    }
});

module.exports = AddProblem;