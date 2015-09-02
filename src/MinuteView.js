/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind           from 'autobind-decorator';
import React, {PropTypes} from 'react';
import Glyphicon          from './Glyphicon';
import Constants          from './Constants';
import Minute             from './Minute';
import Button             from './Button';

export default class MinuteView extends React.Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    selectedDate: PropTypes.object.isRequired,
    onSelectedDate: PropTypes.func.isRequired,
  };

  render() {
    let {onClose} = this.props;
    return (
      <div data-action="selectMinute">
        <Button size={{width: '100%'}} onClick={onClose}>
          <Glyphicon glyph="time" />
        </Button>
        <table>
          <tbody>
            <tr>
              <Minute minute={0} onClick={this.onMinuteClick} />
              <Minute minute={5} onClick={this.onMinuteClick} />
              <Minute minute={10} onClick={this.onMinuteClick} />
              <Minute minute={15} onClick={this.onMinuteClick} />
            </tr>
            <tr>
              <Minute minute={20} onClick={this.onMinuteClick} />
              <Minute minute={25} onClick={this.onMinuteClick} />
              <Minute minute={30} onClick={this.onMinuteClick} />
              <Minute minute={35} onClick={this.onMinuteClick} />
            </tr>
            <tr>
              <Minute minute={40} onClick={this.onMinuteClick} />
              <Minute minute={45} onClick={this.onMinuteClick} />
              <Minute minute={55} onClick={this.onMinuteClick} />
              <Minute minute={60} onClick={this.onMinuteClick} />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  @autobind
  onMinuteClick(minute) {
    let selectedDate = this.props.selectedDate.minutes(minute);
    this.props.onSelectedDate(selectedDate);
    this.props.onClose();
  }
}
