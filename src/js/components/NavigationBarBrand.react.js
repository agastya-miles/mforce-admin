var React = require('react');

var NavigationBarBrand = React.createClass({

    render: function () {
        return (
            <div className="navbar-header">
                <a className="navbar-brand" href="#">{this.props.children}</a>
            </div>);
    }
});

module.exports = NavigationBarBrand;
