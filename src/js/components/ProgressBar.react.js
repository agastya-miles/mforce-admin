var React = require('react');

var cx = require('react/lib/cx');


var ProgressBar = React.createClass({

    divStyle : {
        width: '0%'
    },

    render: function () {
        this.divStyle.width = this.props.properties.progress + "%";
        return  (
        <div className="progress">
            <div id="progress_user"
                className={cx({
                    'progress-bar-success': this.props.properties.finished,
                    'progress-bar' : true
                })}
                role="progressbar" aria-valuenow="0"
                aria-valuemin="0" aria-valuemax="100" style={this.divStyle}>
                <span className="sr-only">10% Complete</span>
            </div>
        </div>
        );
    }

});

module.exports = ProgressBar;
