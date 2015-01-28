var React = require('react');


var ReactRouter = require('react-router-component');
var Locations = ReactRouter.Locations;
var Location = ReactRouter.Location;
var Link = ReactRouter.Link;
var NavigationBar = require('./NavigationBar.react');
var NavigationBarBrand = require('./NavigationBarBrand.react');
var NavigationBarCollapse = require('./NavigationBarCollapse.react');
var NavigationBarNav = require('./NavigationBarNav.react');
var NavigationBarItem = require('./NavigationBarItem.react');
var DatabaseView = require('./DatabaseView.react');
var AdminUserView = require('./AdminUserView.react');



var MForceAdminApp = React.createClass({

    views : {
        database : <DatabaseView className="col-md-6"/>,
        adminusers : <AdminUserView className="col-md-8"/>
    },

    getInitialState: function () {
        return {
            activeMenuItem: 'adminusers'
        };
    },

    render: function () {
        var activeView  =  this.views[this.state.activeMenuItem];

        return (
            <div>
                <NavigationBar>
                    <NavigationBarBrand>MForceAdmin</NavigationBarBrand>
                    <NavigationBarCollapse>
                        <NavigationBarNav>

                            <NavigationBarItem
                                active={this.state.activeMenuItem === 'database'}
                                id="database"
                                href="/"
                                onClick={this._onMenuClick}>
                                Database
                            </NavigationBarItem>

                            <NavigationBarItem
                                active={this.state.activeMenuItem === 'adminusers'}
                                href="/adminusers"
                                id="adminusers" onClick={this._onMenuClick} >
                                Admin Users
                            </NavigationBarItem>

                        </NavigationBarNav>
                    </NavigationBarCollapse>
                </NavigationBar>
            {activeView}
            </div >
        );
    },


    _onMenuClick: function (e) {
        e.preventDefault();
        this.setState({
            activeMenuItem: e.target.id
        });
    }


});

module.exports = MForceAdminApp;
