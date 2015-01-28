var React = require('react');
var ReactPropTypes = React.PropTypes;

var cx = require('react/lib/cx');

var NavigationBarItem = React.createClass({


    propTypes: {
        id: ReactPropTypes.string.isRequired,
        onClick: ReactPropTypes.func.isRequired
    },
    render: function () {
        return (<li
            className={cx({
                'active': this.props.active
            })}>
            <a id={this.props.id} onClick={this.props.onClick } href={this.props.href }>{this.props.children}</a>
        </li>
        );
    }

});

module.exports = NavigationBarItem;
