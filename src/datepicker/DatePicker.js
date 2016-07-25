/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015-present Prometheus Research, LLC
 */

import noop from 'lodash/noop';
import * as React from 'react';
import * as ReactUI from '@prometheusresearch/react-ui';
import {style} from '@prometheusresearch/react-ui/stylesheet';

import DayView from './DayView';
import MonthView from './MonthView';
import YearView from './YearView';
import {theme} from '../ui';

let Root = style(ReactUI.Block, {
  background: '#ffffff',
});

export default class DatePicker extends React.Component {

  static propTypes = {
    mode: React.PropTypes.oneOf(['days', 'months', 'years']).isRequired,
    onMode: React.PropTypes.func.isRequired,
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,

    viewDate: React.PropTypes.object.isRequired,
    onViewDate: React.PropTypes.func.isRequired,

    renderDay: React.PropTypes.func,
    Month: React.PropTypes.func,
    style: React.PropTypes.object,
  };

  static defaultProps = {
    mode: 'days',
    onClose: noop,
  };

  render() {
    let {
      style, onFocus, onBlur,
      mode, onMode,
      value, onChange,
      viewDate, onViewDate,
      renderDay, Month,
    } = this.props;
    return (
      <Root
        width={theme.CELL_SIZE * 7}
        style={style}
        onFocus={onFocus}
        onBlur={onBlur}>
        {mode === 'days' &&
          <DayView
            value={value}
            onChange={onChange}
            viewDate={viewDate}
            onViewDate={onViewDate}
            renderDay={renderDay}
            showMonths={this.showMonths}
            />}
        {mode === 'months' &&
          <MonthView
            Month={Month}
            value={value}
            onChange={onChange}
            viewDate={viewDate}
            onViewDate={onViewDate}
            onViewDateSelect={this.onMonthSelect}
            onMode={onMode}
            />}
        {mode === 'years' &&
          <YearView
            value={value}
            onChange={onChange}
            viewDate={viewDate}
            onViewDate={onViewDate}
            onViewDateSelect={this.onYearSelect}
            />}
      </Root>
    );
  }

  onMonthSelect = viewDate => {
    this.props.onViewDate(viewDate);
    this.props.onMode('days');
  };

  onYearSelect = viewDate => {
    this.props.onViewDate(viewDate);
    this.props.onMode('months');
  };

  showMonths = () => {
    this.props.onMode('months');
  };

  showYears = () => {
    this.props.onMode('years');
  };

  showDays = () => {
    this.props.onMode('days');
  };
}
