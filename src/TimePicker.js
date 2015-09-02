/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind           from 'autobind-decorator';
import keyMirror          from 'keymirror';
import React, {PropTypes} from 'react';
import MinuteView         from './MinuteView';
import HourView           from './HourView';
import Glyphicon          from './Glyphicon';
import Button             from './Button';

let Mode = keyMirror({
  time: null,
  minutes: null,
  hours: null,
});

export default class TimePicker extends React.Component {

  static Mode = Mode;

  static propTypes = {
    activeMode: PropTypes.oneOf([Mode.time, Mode.minutes, Mode.hours]).isRequired,
    onActiveMode: PropTypes.func.isRequired,
    viewDate: PropTypes.object.isRequired,
    onViewDate: PropTypes.func.isRequired,
    selectedDate: PropTypes.object.isRequired,
    onSelectedDate: PropTypes.func.isRequired,
  };

  render() {
    let {activeMode} = this.props;
    return (
      <div>
        {activeMode === Mode.time &&
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Button onClick={this.onNextHour}><Glyphicon glyph="chevron-up" /></Button>
                  </td>
                  <td />
                  <td>
                    <Button onClick={this.onNextMinute}><Glyphicon glyph="chevron-up" /></Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button onClick={this._setHoursMode}>
                      {this.props.selectedDate.format('HH')}
                    </Button>
                  </td>
                  <td />
                  <td>
                    <Button onClick={this._setMinutesMode}>
                      {this.props.selectedDate.format('mm')}
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button onClick={this.onPrevHour}><Glyphicon glyph="chevron-down" /></Button>
                  </td>
                  <td />
                  <td>
                    <Button onClick={this.onPrevMinute}><Glyphicon glyph="chevron-down" /></Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>}
        {activeMode === Mode.hours &&
          <HourView
            onSelectedDate={this.props.onSelectedDate}
            selectedDate={this.props.selectedDate}
            onClose={this._setTimeMode}
            />}
        {activeMode === Mode.minutes &&
          <MinuteView
            onSelectedDate={this.props.onSelectedDate}
            selectedDate={this.props.selectedDate}
            onClose={this._setTimeMode}
            />}
      </div>
    );
  }

  @autobind
  onPrevHour() {
    let selectedDate = this.props.selectedDate.subtract(1, 'hours');
    this.props.onSelectedDate(selectedDate);
  }

  @autobind
  onNextHour() {
    let selectedDate = this.props.selectedDate.add(1, 'hours');
    this.props.onSelectedDate(selectedDate);
  }

  @autobind
  onPrevMinute() {
    let selectedDate = this.props.selectedDate.subtract(1, 'minutes');
    this.props.onSelectedDate(selectedDate);
  }

  @autobind
  onNextMinute() {
    let selectedDate = this.props.selectedDate.add(1, 'minutes');
    this.props.onSelectedDate(selectedDate);
  }

  @autobind
  _setTimeMode() {
    this.props.onActiveMode(Mode.time);
  }

  @autobind
  _setMinutesMode() {
    this.props.onActiveMode(Mode.minutes);
  }

  @autobind
  _setHoursMode() {
    this.props.onActiveMode(Mode.hours);
  }

}
