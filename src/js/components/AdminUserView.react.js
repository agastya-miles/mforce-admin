var React = require('react');
var Reflux = require("reflux");

var AdminUserStore = require('../stores/AdminUserStore.reflux.js');
var AdminUserRows = require('./AdminUserRow.react');

var AdminUserActions = require('../actions/AdminUserActions.reflux.js');



function getAdminViewState(){
    return { adminUsers : AdminUserStore.getAll() };
}

var AdminUserView = React.createClass({

    mixins: [Reflux.listenTo(AdminUserStore,"onStatusChange")],

    onStatusChange: function (adminUsers) {
        this.setState({
            adminUsers: adminUsers
        });
    },

    getInitialState: function () {
        return getAdminViewState();
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
                <table  className="editable-table table table-condensed table-striped table-hover">
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

    }



});

module.exports = AdminUserView;
