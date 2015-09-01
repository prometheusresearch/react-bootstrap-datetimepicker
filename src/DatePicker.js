/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind           from 'autobind-decorator';
import React, {PropTypes} from 'react';
import DayView            from './DayView';
import MonthView          from './MonthView';
import YearView           from './YearView';

const VIEW_MODES = {
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

const VIEW_MODES_KEYS = Object.keys(VIEW_MODES);

export default class DatePicker extends React.Component {

  static propTypes = {
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    showToday: PropTypes.bool,
    viewMode: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    daysOfWeekDisabled: PropTypes.array,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,

    onViewDate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = (
      VIEW_MODES[this.props.viewMode] ||
      VIEW_MODES[VIEW_MODES_KEYS[this.props.viewMode]] ||
      VIEW_MODES.days
    );
  }

  render() {
    return (
      <div className="datepicker" style={this.props.style}>
        {this.state.daysDisplayed &&
          <DayView
            selectedDate={this.props.selectedDate}
            onSelectedDate={this.props.onSelectedDate}
            viewDate={this.props.viewDate}
            onViewDate={this.props.onViewDate}
            renderDay={this.props.renderDay}
            style={this.props.pickerStyle}
            tableStyle={this.props.pickerTableStyle}
            showToday={this.props.showToday}
            daysOfWeekDisabled={this.props.daysOfWeekDisabled}
            showMonths={this.showMonths}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            />}
        {this.state.monthsDisplayed &&
          <MonthView
            selectedDate={this.props.selectedDate}
            onSelectedDate={this.props.onSelectedDate}
            viewDate={this.props.viewDate}
            onViewDate={this.props.onViewDate}
            renderMonth={this.props.renderMonth}
            style={this.props.pickerStyle}
            tableStyle={this.props.pickerTableStyle}
            showYears={this.showYears}
            onClose={this.onMonthsClose}
            />}
        {this.state.yearsDisplayed &&
          <YearView
            selectedDate={this.props.selectedDate}
            onSelectedDate={this.props.onSelectedDate}
            viewDate={this.props.viewDate}
            onViewDate={this.props.onViewDate}
            style={this.props.pickerStyle}
            tableStyle={this.props.pickerTableStyle}
            onClose={this.onYearsClose}
            />}
      </div>
    );
  }

  @autobind
  showMonths() {
    return this.setState({
      daysDisplayed: false,
      monthsDisplayed: true
    });
  }

  @autobind
  showYears() {
    return this.setState({
      monthsDisplayed: false,
      yearsDisplayed: true
    });
  }

  @autobind
  onYearsClose() {
    this.setState({
      yearsDisplayed: false,
      monthsDisplayed: true
    });
  }

  @autobind
  onMonthsClose() {
    this.setState({
      monthsDisplayed: false,
      daysDisplayed: true
    });
  }
}
