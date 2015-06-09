'use strict';

var React = require('react');
var Glyphicon = require('./Glyphicon');
var Constants = require('./Constants');

var Minute = React.createClass({

  render() {
    var {minute, ...props} = this.props;
    return (
      <td className="minute" onClick={this.onClick} onSelect={undefined}>
        {minute}
      </td>
    );
  },

  onClick(e) {
    this.props.onSelect(e);
  }
});

var DateTimePickerMinutesStyle = {

  self: {
    display: 'block'
  },

  switch: {
    width: '100%'
  }
};
  
var DateTimePickerMinutes = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
    onSwitch: React.PropTypes.func.isRequired
  },

  render() {
    var {onSelect, onSwitch, ...props} = this.props;
    return (
      <div className="timepicker-minutes" data-action="selectMinute" style={DateTimePickerMinutesStyle.self}>
        <ul className="list-unstyled">
          <li>
            <span
              className="btn picker-switch"
              style={DateTimePickerMinutesStyle.switch}
              onClick={onSwitch}>
              <Glyphicon glyph="time" />
            </span>
          </li>
        </ul>
        <table className="table-condensed">
          <tbody>
            <tr>
              <Minute minute={0} onSelect={onSelect} />
              <Minute minute={5} onSelect={onSelect} />
              <Minute minute={10} onSelect={onSelect} />
              <Minute minute={15} onSelect={onSelect} />
            </tr>
            <tr>
              <Minute minute={20} onSelect={onSelect} />
              <Minute minute={25} onSelect={onSelect} />
              <Minute minute={30} onSelect={onSelect} />
              <Minute minute={35} onSelect={onSelect} />
            </tr>
            <tr>
              <Minute minute={40} onSelect={onSelect} />
              <Minute minute={45} onSelect={onSelect} />
              <Minute minute={55} onSelect={onSelect} />
              <Minute minute={60} onSelect={onSelect} />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = DateTimePickerMinutes;
