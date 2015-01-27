var React = require('react');

var DatabaseLogTable = React.createClass({

    render: function() {

        var logEntry = [];

        for ( var i in this.props.dblog) {
            logEntry.push(<tr key={i}>
                <td >{this.props.dblog[i].when}</td>
                <td >{this.props.dblog[i].what}</td>
                <td >{this.props.dblog[i].comment}</td>
            </tr>);
        }
        return (
            <table className="table table-condensed table-hover table-striped apply-bootgrid">
                <thead>
                    <tr>
                        <th>Når</th>
                        <th>Hva</th>
                        <th data-column-id="Comment">Kommentar</th>
                    </tr>
                </thead>
                <tbody id="dblog-table" >
                     {logEntry}
                </tbody>
            </table>

        );

    }
});


module.exports = DatabaseLogTable;

