'use strict';

var React                 = require('react');
var DateTimePickerDays    = require('./DateTimePickerDays');
var DateTimePickerMonths  = require('./DateTimePickerMonths');
var DateTimePickerYears   = require('./DateTimePickerYears');

var DateTimePickerDate = React.createClass({

  propTypes: {
    subtractMonth: React.PropTypes.func.isRequired,
    addMonth: React.PropTypes.func.isRequired,
    viewDate: React.PropTypes.object.isRequired,
    selectedDate: React.PropTypes.object.isRequired,
    showToday: React.PropTypes.bool,
    viewMode: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    daysOfWeekDisabled: React.PropTypes.array,
    setSelectedDate: React.PropTypes.func.isRequired,
    subtractYear: React.PropTypes.func.isRequired,
    addYear: React.PropTypes.func.isRequired,
    setViewMonth: React.PropTypes.func.isRequired,
    setViewYear: React.PropTypes.func.isRequired,
    addDecade: React.PropTypes.func.isRequired,
    subtractDecade: React.PropTypes.func.isRequired,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object
  },

  getInitialState() {
    var viewModes = {
      days: {
        daysDisplayed: true,
        monthsDisplayed: false,
        yearsDisplayed: false
      }, 
      months: {
        daysDisplayed: false,
        monthsDisplayed: true,
        yearsDisplayed: false
      }, 
      years: {
        daysDisplayed: false,
        monthsDisplayed: false,
        yearsDisplayed: true
      }
    };
    return (
      viewModes[this.props.viewMode] ||
      viewModes[Object.keys(viewModes)[this.props.viewMode]] ||
      viewModes['days']
    );
  },

  showMonths() {
    return this.setState({
      daysDisplayed: false,
      monthsDisplayed: true
    });
  },

  showYears() {
    return this.setState({
      monthsDisplayed: false,
      yearsDisplayed: true
    });
  },

  setViewYear(e) {
    this.props.setViewYear(e.target.innerHTML);
    return this.setState({
      yearsDisplayed: false,
      monthsDisplayed: true
    });
  },

  setViewMonth(e) {
    this.props.setViewMonth(e.target.innerHTML);
    return this.setState({
      monthsDisplayed: false,
      daysDisplayed: true
    });
  },

  renderDays() {
    if (this.state.daysDisplayed) {
      return (
        <DateTimePickerDays
          renderDay={this.props.renderDay}
          style={this.props.pickerStyle}
          tableStyle={this.props.pickerTableStyle}
          addMonth={this.props.addMonth}
          subtractMonth={this.props.subtractMonth}
          setSelectedDate={this.props.setSelectedDate}
          viewDate={this.props.viewDate}
          selectedDate={this.props.selectedDate}
          showToday={this.props.showToday}
          daysOfWeekDisabled={this.props.daysOfWeekDisabled}
          showMonths={this.showMonths}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          />
      );
    } else {
      return null;
    }
  },

  renderMonths() {
    if (this.state.monthsDisplayed) {
      return (
        <DateTimePickerMonths
          renderMonth={this.props.renderMonth}
          style={this.props.pickerStyle}
          tableStyle={this.props.pickerTableStyle}
          subtractYear={this.props.subtractYear}
          addYear={this.props.addYear}
          viewDate={this.props.viewDate}
          selectedDate={this.props.selectedDate}
          showYears={this.showYears}
          setViewMonth={this.setViewMonth}
          />
      );
    } else {
      return null;
    }
  },

  renderYears() {
    if (this.state.yearsDisplayed) {
      return (
        <DateTimePickerYears
          style={this.props.pickerStyle}
          tableStyle={this.props.pickerTableStyle}
          viewDate={this.props.viewDate}
          selectedDate={this.props.selectedDate}
          setViewYear={this.setViewYear}
          addDecade={this.props.addDecade}
          subtractDecade={this.props.subtractDecade}
          />
      );
    } else {
      return null;
    }
  },
  render: function() {
    return (
      <div className="datepicker" style={this.props.style}>
        {this.renderDays()}
        {this.renderMonths()}
        {this.renderYears()}
      </div>
    );
  }
});

module.exports = DateTimePickerDate;
