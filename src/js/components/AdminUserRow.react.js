var React = require('react');

var TableCell = require('./table/TableCell.react');

var AdminUserRow = React.createClass({

    render: function () {

        return (
            <tr>
                <TableCell id="_id" editable={false} value={this.props.data._id} />
                <TableCell id="name" editable={true} value={this.props.data.name} />
                <TableCell id="email" editable={true} value={this.props.data.email} />
            </tr>
        );
    }
});

module.exports = AdminUserRow;

