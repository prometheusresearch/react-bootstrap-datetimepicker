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
    activeMode: PropTypes.object.isRequired,
    onActiveMode: PropTypes.func.isRequired,

    viewDate: PropTypes.object.isRequired,
    onViewDate: PropTypes.func.isRequired,

    selectedDate: PropTypes.object.isRequired,
    onSelectedDate: PropTypes.func.isRequired,

    mode: PropTypes.oneOf([
      Mode.date,
      Mode.time,
      Mode.datetime
    ]),
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
        {activeMode.self === Mode.date &&
          <DatePicker
            activeMode={activeMode.date}
            onActiveMode={this._onActiveDateMode}
            viewDate={viewDate}
            onViewDate={onViewDate}
            selectedDate={selectedDate}
            onSelectedDate={onSelectedDate}
            />}
        {mode === Mode.datetime &&
          <Button
            size={{width: '100%'}}
            onClick={this._onActiveMode}>
            <Glyphicon glyph={activeMode.self === Mode.date ? 'time' : 'calendar'} />
          </Button>}
        {activeMode.self === Mode.time &&
          <TimePicker
            activeMode={activeMode.time}
            onActiveMode={this._onActiveTimeMode}
            viewDate={viewDate}
            onViewDate={onViewDate}
            selectedDate={selectedDate}
            onSelectedDate={onSelectedDate}
            />}
      </div>

    );
  }

  @autobind
  _onActiveMode() {
    let {activeMode} = this.props;
    let self = activeMode.self === Mode.date ?  Mode.time : Mode.date;
    this.props.onActiveMode({...activeMode, self});
  }

  @autobind
  _onActiveDateMode(date) {
    let {activeMode} = this.props;
    this.props.onActiveMode({...activeMode, date});
  }

  @autobind
  _onActiveTimeMode(time) {
    let {activeMode} = this.props;
    this.props.onActiveMode({...activeMode, time});
  }
}
