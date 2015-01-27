var React = require('react');

var NavigationBar = React.createClass({

    render: function() {
        return (  <ul className="nav navbar-nav">{this.props.children}</ul> );
    }
});

module.exports = NavigationBar;
