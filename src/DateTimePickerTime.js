'use strict';

var React = require('react');
var DateTimePickerMinutes = require('./DateTimePickerMinutes');
var DateTimePickerHours = require('./DateTimePickerHours');
var Glyphicon = require('./Glyphicon');
var Constants = require('./Constants');

var DateTimePickerTime = React.createClass({

  propTypes: {
    setSelectedHour: React.PropTypes.func.isRequired,
    setSelectedMinute: React.PropTypes.func.isRequired,
    subtractHour: React.PropTypes.func.isRequired,
    addHour: React.PropTypes.func.isRequired,
    subtractMinute: React.PropTypes.func.isRequired,
    addMinute: React.PropTypes.func.isRequired,
    viewDate: React.PropTypes.object.isRequired,
    selectedDate: React.PropTypes.object.isRequired,
    togglePeriod: React.PropTypes.func.isRequired,
    mode: React.PropTypes.oneOf([Constants.MODE_DATE, Constants.MODE_DATETIME, Constants.MODE_TIME])
  },

  getInitialState() {
    return {
      minutesDisplayed: false,
      hoursDisplayed: false
    };
  },

  goBack() {
    return this.setState({
      minutesDisplayed: false,
      hoursDisplayed: false
    });
  },

  showMinutes() {
    return this.setState({
      minutesDisplayed: true
    });
  },

  showHours() {
    return this.setState({
      hoursDisplayed: true
    });
  },

  renderMinutes() {
    if (this.state.minutesDisplayed) {
      return (
        <DateTimePickerMinutes
          {...this.props}
          onSwitch={this.goBack}
          onSelect={this.onSelectMinute}
          />
      );
    }
  },

  renderHours() {
    if (this.state.hoursDisplayed) {
      return (
        <DateTimePickerHours
          {...this.props}
          onSwitch={this.goBack}
          onSelect={this.onSelectHour}
          />
      );
    }
  },

  onSelectHour(e) {
    this.goBack();
    this.props.setSelectedHour(e);
  },

  onSelectMinute(e) {
    this.goBack();
    this.props.setSelectedMinute(e);
  },

  renderPicker() {
    if (!this.state.minutesDisplayed && !this.state.hoursDisplayed) {
      return (
        <div className="timepicker-picker">
          <table className="table-condensed">
            <tbody>
              <tr>
                <td><a className="btn" onClick={this.props.addHour}><Glyphicon glyph="chevron-up" /></a></td>
                <td className="separator"></td>
                <td><a className="btn" onClick={this.props.addMinute}><Glyphicon glyph="chevron-up" /></a></td>
              </tr>
              <tr>
                <td><span className="timepicker-hour" onClick={this.showHours}>{this.props.selectedDate.format('HH')}</span></td>
                <td className="separator">:</td>
                <td><span className="timepicker-minute" onClick={this.showMinutes}>{this.props.selectedDate.format('mm')}</span></td>
              </tr>
              <tr>
                <td><a className="btn" onClick={this.props.subtractHour}><Glyphicon glyph="chevron-down" /></a></td>
                <td className="separator"></td>
                <td><a className="btn" onClick={this.props.subtractMinute}><Glyphicon glyph="chevron-down" /></a></td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  },

  render() {
    return (
      <div className="timepicker">
        {this.renderPicker()}
        {this.renderHours()}
        {this.renderMinutes()}
      </div>
    );
  }
});

module.exports = DateTimePickerTime;
