/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind           from 'autobind-decorator';
import React, {PropTypes} from 'react';
import MinuteView         from './MinuteView';
import HourView           from './HourView';
import Glyphicon          from './Glyphicon';
import Constants          from './Constants';
import Button             from './Button';

export default class TimePicker extends React.Component {

  static propTypes = {
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    mode: PropTypes.oneOf([Constants.MODE_DATE, Constants.MODE_DATETIME, Constants.MODE_TIME]),
    onSelectedDate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      minutesDisplayed: false,
      hoursDisplayed: false
    };
  }

  render() {
    return (
      <div className="timepicker">
        {this.renderPicker()}
        {this.state.hoursDisplayed &&
          <HourView
            onSelectedDate={this.props.onSelectedDate}
            selectedDate={this.props.selectedDate}
            onClose={this.goBack}
            />}
        {this.state.minutesDisplayed &&
          <MinuteView
            onSelectedDate={this.props.onSelectedDate}
            selectedDate={this.props.selectedDate}
            onClose={this.goBack}
            />}
      </div>
    );
  }

  renderPicker() {
    if (!this.state.minutesDisplayed && !this.state.hoursDisplayed) {
      return (
        <div className="timepicker-picker">
          <table className="table-condensed">
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
                  <Button onClick={this.showHours}>
                    {this.props.selectedDate.format('HH')}
                  </Button>
                </td>
                <td />
                <td>
                  <Button onClick={this.showMinutes}>
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
        </div>
      );
    }
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
  goBack() {
    return this.setState({
      minutesDisplayed: false,
      hoursDisplayed: false
    });
  }

  @autobind
  showMinutes() {
    return this.setState({
      minutesDisplayed: true
    });
  }

  @autobind
  showHours() {
    return this.setState({
      hoursDisplayed: true
    });
  }

}
