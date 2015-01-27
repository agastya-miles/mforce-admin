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
            isEditing: false
        };
    },

    render:function() {
        var input;
        if (this.state.isEditing) {
            input =
                <TableCellTextInput
                    id={this.props.id}
                    value={this.props.value}
                    onSave={this._onSave}
                />;
        }

        return (
            <td  >

                <label className={cx({
                    'editing': this.state.isEditing,
                    'table-cell-label': true
                })}
                    onDoubleClick={this._onDoubleClick}
                >{this.props.value}</label>
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
        console.log(text);

    }
});

module.exports = TableCell;
