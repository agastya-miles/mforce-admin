var React = require('react');
var cx = require('react/lib/cx');
var ReactPropTypes = React.PropTypes;


var TableCellTextInput = require('./TableCellTextInput.react');


var TableCell = React.createClass({


    propTypes: {

        id: ReactPropTypes.string,
        value: ReactPropTypes.string
    },

    getInitialState: function() {
        return {
            isEditing: false,
            value: this.props.value
        };
    },

    render:function() {
        var input;
        if (this.state.isEditing) {
            input =
                <TableCellTextInput
                    id={this.props.id}
                    value={this.state.value}
                    onSave={this._onSave}
                    onEscape={this._onEscape}
                />;
        }

        return (
            <td  >

                <label className={cx({
                    'editing': this.state.isEditing,
                    'table-cell-label': true
                })}
                    onDoubleClick={this._onDoubleClick}
                >{this.state.value}</label>
            {input}

            </td>
        )
    },

    _onDoubleClick: function(e) {

        if ( this.props.editable) {
            e.preventDefault()
            this.setState({isEditing: true});
        }
    },


    _onSave: function(text) {
        this.setState({
            isEditing: false,
            value: text
        });

    },

    _onEscape: function() {

        this.setState({
            isEditing: false,
            value: this.props.value
        });

    }
});

module.exports = TableCell;
