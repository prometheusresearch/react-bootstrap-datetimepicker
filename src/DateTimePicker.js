/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import React, {PropTypes} from 'react/addons';
import DatePicker         from './DatePicker';
import TimePicker         from './TimePicker';
import Glyphicon          from './Glyphicon';
import Constants          from './Constants';

export default class DateTimePicker extends React.Component {

  static propTypes = {
    showDatePicker: PropTypes.bool,
    showTimePicker: PropTypes.bool,
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    showToday: PropTypes.bool,
    viewMode: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    mode: PropTypes.oneOf([Constants.MODE_DATE, Constants.MODE_DATETIME, Constants.MODE_TIME]),
    daysOfWeekDisabled: PropTypes.array,
    togglePeriod: PropTypes.func.isRequired,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,

    onViewDate: PropTypes.func.isRequired,
    onSelectedDate: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div
        tabIndex={0}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}>
        <ul className="list-unstyled">
          {this.props.showDatePicker &&
            <li>
              <DatePicker
                viewDate={this.props.viewDate}
                onViewDate={this.props.onViewDate}
                selectedDate={this.props.selectedDate}
                onSelectedDate={this.props.onSelectedDate}
                showToday={this.props.showToday}
                viewMode={this.props.viewMode}
                daysOfWeekDisabled={this.props.daysOfWeekDisabled}
                onViewDate={this.props.onViewDate}
                minDate={this.props.minDate}
                maxDate={this.props.maxDate}
                />
            </li>}
          {this.props.mode === Constants.MODE_DATETIME &&
            <li>
              <span
                className="btn picker-switch"
                style={{width:'100%'}}
                onClick={this.props.togglePicker}>
                <Glyphicon glyph={this.props.showTimePicker ? 'calendar' : 'time'} />
              </span>
            </li>}
          {this.props.showTimePicker &&
            <li>
              <TimePicker
                viewDate={this.props.viewDate}
                selectedDate={this.props.selectedDate}
                onSelectedDate={this.props.onSelectedDate}
                togglePeriod={this.props.togglePeriod}
                mode={this.props.mode}
                />
            </li>}
        </ul>
      </div>

    );
  }
}
