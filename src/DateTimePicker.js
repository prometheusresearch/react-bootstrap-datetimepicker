/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import React, {PropTypes} from 'react/addons';
import DatePicker         from './DatePicker';
import TimePicker         from './TimePicker';
import Glyphicon          from './Glyphicon';
import Constants          from './Constants';
import Focusable          from './Focusable';
import Stylesheet         from './Stylesheet';
import Button             from './Button';

let Style = Stylesheet({

  self: {
    focus: {
      outline: 'none'
    }
  }
});

@Focusable
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
    let {focus} = this.props;
    return (
      <div
        style={Style.self({focus})}
        tabIndex={0}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}>
        {this.props.showDatePicker &&
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
            />}
        {this.props.mode === Constants.MODE_DATETIME &&
          <Button
            size={{width: '100%'}}
            onClick={this.props.togglePicker}>
            <Glyphicon glyph={this.props.showTimePicker ? 'calendar' : 'time'} />
          </Button>}
        {this.props.showTimePicker &&
          <TimePicker
            viewDate={this.props.viewDate}
            selectedDate={this.props.selectedDate}
            onSelectedDate={this.props.onSelectedDate}
            togglePeriod={this.props.togglePeriod}
            mode={this.props.mode}
            />}
      </div>

    );
  }
}
