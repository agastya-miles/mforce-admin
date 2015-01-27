var React = require('react');

var NavigationBarCollapse = React.createClass({

    render: function() {
        return (<div className="collapse navbar-collapse">{this.props.children}</div>);
    }
});

module.exports = NavigationBarCollapse;
