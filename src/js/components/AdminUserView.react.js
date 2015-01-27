var React = require('react');

var AdminUserStore = require('../stores/AdminUserStore');
var AdminUserActions = require('../actions/AdminUserActions');

var AdminUserRows = require('./AdminUserRow.react');


function getAdminViewState() {
    return {adminUsers: AdminUserStore.getAll()};
}

var AdminUserView = React.createClass({

    getInitialState: function () {
        return getAdminViewState();
    },

    componentDidMount: function () {
        AdminUserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        AdminUserStore.removeChangeListener(this._onChange);
    },

    render: function () {

        var adminUsers = [];

        for (var i in this.state.adminUsers) {
            adminUsers.push(<AdminUserRows key={i} data={this.state.adminUsers[i]} />);
        }

        return (
            <div className={this.props.className}>
                <button onClick={this._addRow} type="button" className="btn btn-default">
                    Add user
                </button>
                <table  className="editable-table  table table-condensed table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Navn</th>
                            <th>E-Mail</th>
                        </tr>
                    </thead>
                    <tbody>
                    {adminUsers}
                    </tbody>
                </table>

            </div>
        );
    },

    _addRow: function (e) {
        AdminUserActions.addRow();

    },

    _onChange: function (e) {
        this.setState(getAdminViewState());
    }


});

module.exports = AdminUserView;
