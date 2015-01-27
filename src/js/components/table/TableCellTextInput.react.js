var React = require('react');

var ReactPropTypes = React.PropTypes;


var ENTER_KEY_CODE = 13;


var TableCellTextInput = React.createClass({

    propTypes: {
        className: ReactPropTypes.string,
        id: ReactPropTypes.string,
        placeholder: ReactPropTypes.string,
        onSave: ReactPropTypes.func.isRequired,
        value: ReactPropTypes.string
    },


    getInitialState: function() {
        return {
            value: this.props.value || ''
        };
    },
    render:function() {
        return (
        <input className="table-cell-input"
            onChange={this._onChange}
            onKeyDown={this._onKeyDown}
            onBlur={this._save}
            value={this.state.value}
            autoFocus={true}
        /> );
    },

    _onChange: function (event ) {
        this.setState({
            value: event.target.value
        });

    },

    _onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._save();
        }
    },

    _save: function() {
        this.props.onSave(this.state.value);
        this.setState({
            value: ''
        });
    }


});


module.exports = TableCellTextInput;



