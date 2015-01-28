var React = require('react');
var Reflux = require("reflux");

var DatabaseActions = require('../actions/DatabaseActions.reflux');
var DatabaseStore = require('../stores/DatabaseStore.reflux.js');
var DatabaseLogTable = require('./DatabaseLogTable.react');


var ProgressBar = require('./ProgressBar.react');


function getDatabaseViewState() {
    return {
        progress: DatabaseStore.getDatabaseViewProgress(),
        dblog: DatabaseStore.getDbLog()
    }
}
var DatabaseView = React.createClass({


    getInitialState: function () {
        return getDatabaseViewState();
    },

    mixins: [Reflux.listenTo(DatabaseStore,"onStatusChange")],

    onStatusChange: function (data) {
        console.log("data");
        this.setState( getDatabaseViewState() );
    },

    render: function () {
        return (
            <div className={this.props.className}>

                <div className="col-md-4">
                    <button onClick={this._syncDatabase} type="button" className="btn btn-primary">
                        Synkroniser database
                    </button>
                    <ProgressBar properties={this.state.progress.userDatabaseProperties}/>
                    <ProgressBar properties={this.state.progress.cvDatabaseProperties}/>


                    <button onClick={this._deleteDatabase} type="button" className="btn btn-primary">
                        Slett database
                    </button>
                    <ProgressBar properties={this.state.progress.deleteDatabaseProperties}/>
                </div>
                <div >
                    <DatabaseLogTable dblog={this.state.dblog}/>
                </div>

            </div>
        );
    },

    _syncDatabase: function () {
        DatabaseActions.syncDatabase();
    },

    _deleteDatabase: function () {
        DatabaseActions.deleteDatabase();
    },

    _onChange: function (e) {
        this.setState(getDatabaseViewState());
    }
});

module.exports = DatabaseView;
