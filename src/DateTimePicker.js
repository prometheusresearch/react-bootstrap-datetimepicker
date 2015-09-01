/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import React, {PropTypes} from 'react/addons';
import cx                 from 'classnames';
import DateTimePickerDate from './DateTimePickerDate';
import DateTimePickerTime from './DateTimePickerTime';
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
    setSelectedDate: PropTypes.func.isRequired,
    subtractHour: PropTypes.func.isRequired,
    addHour: PropTypes.func.isRequired,
    subtractMinute: PropTypes.func.isRequired,
    addMinute: PropTypes.func.isRequired,
    togglePeriod: PropTypes.func.isRequired,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,

    onViewDate: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className={cx(this.props.widgetClasses)} style={this.props.widgetStyle}>
        <ul className="list-unstyled">
          {this.renderDatePicker()}
          {this.renderSwitchButton()}
          {this.renderTimePicker()}
        </ul>
      </div>

    );
  }

  renderDatePicker() {
    if (this.props.showDatePicker) {
      return (
        <li>
          <DateTimePickerDate
            setSelectedDate={this.props.setSelectedDate}
            viewDate={this.props.viewDate}
            selectedDate={this.props.selectedDate}
            showToday={this.props.showToday}
            viewMode={this.props.viewMode}
            daysOfWeekDisabled={this.props.daysOfWeekDisabled}
            onViewDate={this.props.onViewDate}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            />
        </li>
      );
    }
  }

  renderTimePicker() {
    if (this.props.showTimePicker) {
      return (
        <li>
          <DateTimePickerTime
            viewDate={this.props.viewDate}
            selectedDate={this.props.selectedDate}
            setSelectedHour={this.props.setSelectedHour}
            setSelectedMinute={this.props.setSelectedMinute}
            addHour={this.props.addHour}
            subtractHour={this.props.subtractHour}
            addMinute={this.props.addMinute}
            subtractMinute={this.props.subtractMinute}
            togglePeriod={this.props.togglePeriod}
            mode={this.props.mode}
            />
        </li>
      );
    }
  }

  renderSwitchButton() {
    if (this.props.mode === Constants.MODE_DATETIME) {
      return (
        <li>
          <span
            className="btn picker-switch"
            style={{width:'100%'}}
            onClick={this.props.togglePicker}>
            <Glyphicon glyph={this.props.showTimePicker ? 'calendar' : 'time'} />
          </span>
        </li>
      );
    }
  }

}
