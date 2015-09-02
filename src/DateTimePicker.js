/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind           from 'autobind-decorator';
import React, {PropTypes} from 'react';
import keyMirror          from 'keymirror';
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

let Mode = keyMirror({
  date: null,
  time: null,
  datetime: null,
});

@Focusable
export default class DateTimePicker extends React.Component {

  static Mode = Mode;

  static propTypes = {
    activeMode: PropTypes.oneOf([
      Mode.date,
      Mode.time
    ]),
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    showToday: PropTypes.bool,
    viewMode: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    mode: PropTypes.oneOf([
      Mode.date,
      Mode.time,
      Mode.datetime
    ]),
    onViewDate: PropTypes.func.isRequired,
    onSelectedDate: PropTypes.func.isRequired,
  }

  render() {
    let {
      focus, activeMode, mode,
      viewDate, onViewDate, selectedDate, onSelectedDate,
    } = this.props;
    return (
      <div
        style={Style.self({focus})}
        tabIndex={0}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}>
        {activeMode === Mode.date &&
          <DatePicker
            viewDate={viewDate}
            onViewDate={onViewDate}
            selectedDate={selectedDate}
            onSelectedDate={onSelectedDate}
            showToday={this.props.showToday}
            viewMode={this.props.viewMode}
            />}
        {mode === Mode.datetime &&
          <Button
            size={{width: '100%'}}
            onClick={this._onActiveMode}>
            <Glyphicon glyph={activeMode === Mode.date ? 'time' : 'calendar'} />
          </Button>}
        {activeMode === Mode.time &&
          <TimePicker
            viewDate={viewDate}
            selectedDate={selectedDate}
            onSelectedDate={onSelectedDate}
            mode={this.props.mode}
            />}
      </div>

    );
  }

  @autobind
  _onActiveMode() {
    let activeMode = this.props.activeMode === Mode.date ?
      Mode.time :
      Mode.date;
    this.props.onActiveMode(activeMode);
  }
}
