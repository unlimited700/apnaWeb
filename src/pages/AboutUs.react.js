import React from 'react';

var AboutUs = React.createClass({
    render: function() {
        return (
            <div className="about-container">
                <center>
                    <h2>About Us</h2>
                    <h4 className="dark-grey">Healthcare system needs to be addressed as an infrastructure for the good of all citizens rather than a business enterprise.</h4>
                    <p className="justify">
                        We start to help the mankind from its basic need of a healthy lifestyle. We are committed to providing a self-sustainable health care system using the ancient Indian medicinal techniques. We have launched our health recommendation engine which provide suggestions for all the health problems using Ayurveda, Yoga, and Naturopathy.
                    </p>
                </center>
            </div>
        );
    }
});

module.exports = AboutUs;
