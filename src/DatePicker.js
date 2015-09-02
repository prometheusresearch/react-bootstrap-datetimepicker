/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind           from 'autobind-decorator';
import keyMirror          from 'keymirror';
import React, {PropTypes} from 'react';
import DayView            from './DayView';
import MonthView          from './MonthView';
import YearView           from './YearView';

let Mode = keyMirror({
  days: null,
  months: null,
  years: null,
});

export default class DatePicker extends React.Component {

  static Mode = Mode;

  static propTypes = {
    activeMode: PropTypes.oneOf([Mode.days, Mode.months, Mode.years]),
    onActiveMode: PropTypes.func.isRequired,
    viewDate: PropTypes.object.isRequired,
    onViewDate: PropTypes.func.isRequired,
    selectedDate: PropTypes.object.isRequired,
    onSelectedDate: PropTypes.func.isRequired,
    showToday: PropTypes.bool,
    viewMode: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }

  render() {
    let {activeMode} = this.props;
    return (
      <div style={this.props.style}>
        {activeMode === Mode.days &&
          <DayView
            selectedDate={this.props.selectedDate}
            onSelectedDate={this.props.onSelectedDate}
            viewDate={this.props.viewDate}
            onViewDate={this.props.onViewDate}
            renderDay={this.props.renderDay}
            style={this.props.pickerStyle}
            tableStyle={this.props.pickerTableStyle}
            showToday={this.props.showToday}
            showMonths={this.showMonths}
            />}
        {activeMode === Mode.months &&
          <MonthView
            selectedDate={this.props.selectedDate}
            onSelectedDate={this.props.onSelectedDate}
            viewDate={this.props.viewDate}
            onViewDate={this.props.onViewDate}
            renderMonth={this.props.renderMonth}
            style={this.props.pickerStyle}
            tableStyle={this.props.pickerTableStyle}
            showYears={this.showYears}
            onClose={this.showDays}
            />}
        {activeMode === Mode.years &&
          <YearView
            selectedDate={this.props.selectedDate}
            onSelectedDate={this.props.onSelectedDate}
            viewDate={this.props.viewDate}
            onViewDate={this.props.onViewDate}
            style={this.props.pickerStyle}
            tableStyle={this.props.pickerTableStyle}
            onClose={this.showMonths}
            />}
      </div>
    );
  }

  @autobind
  showMonths() {
    this.props.onActiveMode(Mode.months);
  }

  @autobind
  showYears() {
    this.props.onActiveMode(Mode.years);
  }

  @autobind
  showDays() {
    this.props.onActiveMode(Mode.days);
  }
}
