'use strict';

var React = require('react');
var Glyphicon = require('./Glyphicon');
var Constants = require('./Constants');

var Hour = React.createClass({

  render() {
    var {hour, ...props} = this.props;
    return (
      <td className="hour" onClick={this.onClick} onSelect={undefined}>
        {hour}
      </td>
    );
  },

  onClick(e) {
    this.props.onSelect(e);
  }
});

var DateTimePickerHoursStyle = {

  self: {
    display: 'block'
  },

  switch: {
    width: '100%'
  }
};

var DateTimePickerHours = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
    onSwitch: React.PropTypes.func.isRequired
  },

  render() {
    var {onSelect, onSwitch, ...props} = this.props;
    return (
      <div className="timepicker-hours" data-action="selectHour" style={DateTimePickerHoursStyle.self}>
        <ul className="list-unstyled">
          <li>
            <span
              className="btn picker-switch"
              style={DateTimePickerHoursStyle.switch}
              onClick={onSwitch}>
              <Glyphicon glyph="time" />
            </span>
          </li>
        </ul>
        <table className="table-condensed">
          <tbody>
            <tr>
              <Hour hour={1} onSelect={onSelect} />
              <Hour hour={2} onSelect={onSelect} />
              <Hour hour={3} onSelect={onSelect} />
              <Hour hour={4} onSelect={onSelect} />
            </tr>
            <tr>
              <Hour hour={5} onSelect={onSelect} />
              <Hour hour={6} onSelect={onSelect} />
              <Hour hour={7} onSelect={onSelect} />
              <Hour hour={8} onSelect={onSelect} />
            </tr>
            <tr>
              <Hour hour={9} onSelect={onSelect} />
              <Hour hour={10} onSelect={onSelect} />
              <Hour hour={11} onSelect={onSelect} />
              <Hour hour={12} onSelect={onSelect} />
            </tr>
            <tr>
              <Hour hour={13} onSelect={onSelect} />
              <Hour hour={14} onSelect={onSelect} />
              <Hour hour={15} onSelect={onSelect} />
              <Hour hour={16} onSelect={onSelect} />
            </tr>
            <tr>
              <Hour hour={17} onSelect={onSelect} />
              <Hour hour={18} onSelect={onSelect} />
              <Hour hour={19} onSelect={onSelect} />
              <Hour hour={20} onSelect={onSelect} />
            </tr>
            <tr>
              <Hour hour={21} onSelect={onSelect} />
              <Hour hour={22} onSelect={onSelect} />
              <Hour hour={23} onSelect={onSelect} />
              <Hour hour={24} onSelect={onSelect} />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = DateTimePickerHours;
