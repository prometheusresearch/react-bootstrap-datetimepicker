/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind           from 'autobind-decorator';
import React, {PropTypes} from 'react';
import Glyphicon          from './Glyphicon';
import Constants          from './Constants';
import Hour               from './Hour';
import Button             from './Button';

export default class HourView extends React.Component {

  static propTypes = {
    onClose: React.PropTypes.func.isRequired,
    selectedDate: PropTypes.object.isRequired,
    onSelectedDate: PropTypes.func.isRequired,
  };

  render() {
    let {onClose} = this.props;
    return (
      <div data-action="selectHour">
        <Button size={{width: '100%'}} onClick={onClose}>
          <Glyphicon glyph="time" />
        </Button>
        <table>
          <tbody>
            <tr>
              <Hour hour={1} onClick={this.onHourClick} />
              <Hour hour={2} onClick={this.onHourClick} />
              <Hour hour={3} onClick={this.onHourClick} />
              <Hour hour={4} onClick={this.onHourClick} />
            </tr>
            <tr>
              <Hour hour={5} onClick={this.onHourClick} />
              <Hour hour={6} onClick={this.onHourClick} />
              <Hour hour={7} onClick={this.onHourClick} />
              <Hour hour={8} onClick={this.onHourClick} />
            </tr>
            <tr>
              <Hour hour={9} onClick={this.onHourClick} />
              <Hour hour={10} onClick={this.onHourClick} />
              <Hour hour={11} onClick={this.onHourClick} />
              <Hour hour={12} onClick={this.onHourClick} />
            </tr>
            <tr>
              <Hour hour={13} onClick={this.onHourClick} />
              <Hour hour={14} onClick={this.onHourClick} />
              <Hour hour={15} onClick={this.onHourClick} />
              <Hour hour={16} onClick={this.onHourClick} />
            </tr>
            <tr>
              <Hour hour={17} onClick={this.onHourClick} />
              <Hour hour={18} onClick={this.onHourClick} />
              <Hour hour={19} onClick={this.onHourClick} />
              <Hour hour={20} onClick={this.onHourClick} />
            </tr>
            <tr>
              <Hour hour={21} onClick={this.onHourClick} />
              <Hour hour={22} onClick={this.onHourClick} />
              <Hour hour={23} onClick={this.onHourClick} />
              <Hour hour={24} onClick={this.onHourClick} />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  @autobind
  onHourClick(hour) {
    let selectedDate = this.props.selectedDate.hours(hour);
    this.props.onSelectedDate(selectedDate);
    this.props.onClose();
  }
}
