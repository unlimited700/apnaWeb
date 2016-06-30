import React from 'react';
import { Link } from 'react-router';

var LandingComponent = React.createClass({
    render: function () {
        return (
            <div className="form-container">
                <Link to="/dash/add-problem"><button>Add New Problem</button></Link><br />
                <Link to="/dash/add-solution"><button>Add New Solution</button></Link><br />
                <button>Map New Problem Solution</button>

            </div>
        );
    }

});

module.exports = LandingComponent;