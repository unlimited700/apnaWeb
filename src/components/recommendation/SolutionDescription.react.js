import React from 'react';
import classnames from 'classnames';

var Description = React.createClass({

    render: function() {
        let classes = classnames('content', {active: this.props.isActive});
        return (
            <div>{this.props.content.step ? (<div className={classes}>{this.props.content.step.split("\n").map((text, i) => {
                return (
                    <p key={i}> {text }</p>
                );
            })}</div>): ""}
            </div>
        );
    }
});


module.exports = Description;