var React = require('react');

var NavigationBar = React.createClass({

    render: function() {
        return ( <nav className="navbar navbar-default"><div>{this.props.children}</div></nav> );
    }
});

module.exports = NavigationBar;
