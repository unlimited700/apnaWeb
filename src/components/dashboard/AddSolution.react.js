import React from 'react';
import UserActions from '../../actions/user/UserActions';

var AddSolution = React.createClass({

    render: function () {
        return (
            <div className="problem-container">
                <h3>Add solution</h3>
                <p>{this.props.addedSolutionStatus}</p>
                <form onSubmit={this.addSolution} className="form-container">
                    <input type="text" placeholder="Solution Title"/>
                    <textarea placeholder="Describe the solution here..."></textarea>
                    <input type="text" placeholder="Contradictions (if any)"/>
                    <br /><br />
                    <div>
                        Solution Type: &nbsp; &nbsp;
                        <select>
                            <option value="YOGA">YOGA </option>
                            <option value="FOOD">FOOD </option>
                            <option value="REMEDIES">REMEDIES </option>
                        </select>
                    </div><br />
                    <button type="submit" className="green-btn">Add</button>
                </form>
            </div>
        );
    },


    addSolution: function (event) {
        event.preventDefault();
        var tar = event.target;
        var solution = tar.children[0].value;
        var step = tar.children[1].value;
        var contrad = tar.children[2].value;
        var solType = tar.children[5].children[0].value;
        UserActions.addSolution({solution: solution, step: step, solType: solType, contradiction: contrad});
    }
});

module.exports = AddSolution;