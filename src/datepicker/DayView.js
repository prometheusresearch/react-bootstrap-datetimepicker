/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015-present Prometheus Research, LLC
 */

import moment from 'moment';
import React from 'react';
import * as ReactUI from '@prometheusresearch/react-ui';
import {css, create} from '@prometheusresearch/react-ui/stylesheet';

import {Paginator} from '../ui';
import Day from './Day';

export default class DayView extends React.Component {

  static propTypes = {
    viewDate: React.PropTypes.object.isRequired,
    onViewDate: React.PropTypes.func.isRequired,
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    showToday: React.PropTypes.bool,
    showMonths: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
    tableStyle: React.PropTypes.object,
    Day: React.PropTypes.func,
  };

  static defaultProps = {
    showToday: true,
    Day,
  };

  static stylesheet = create({

    DayOfWeek: {
      Component: 'th',
      textAlign: 'center',
      height: 30,
      width: 30,
      padding: 5,
      fontSize: '90%',
      color: css.rgb(136),
      fontWeight: 'normal',
    }
  });

  render() {
    return (
      <Paginator
        title={
          <span>
            {moment.months()[this.props.viewDate.month()]}
            {' '}
            {this.props.viewDate.year()}
          </span>
        }
        onPrev={this.onPrevMonth}
        onNext={this.onNextMonth}
        onUp={this.props.showMonths}>
        {this.renderDays()}
      </Paginator>
    );
  }

  renderDays() {
    let {viewDate, value, showToday, Day} = this.props;

    let today = moment();
    let date = startDateFor(viewDate);
    let endDate = endDateFor(viewDate);

    let rows = [];
    let cells = [];

    while (date.isBefore(endDate)) {
      let isActive = date.isSame(value, 'day');
      let isToday = date.isSame(today, 'day');
      cells.push(
        <Day
          key={date.month() + '-' + date.date()}
          onClick={this.props.onChange}
          outOfRange={date.isBefore(viewDate, 'month') || date.isAfter(viewDate, 'month')}
          value={date}
          date={date}
          active={isActive}
          today={showToday && isToday}
          />
      );

      if (date.weekday() === today.clone().endOf('week').weekday()) {
        rows.push(
          <ReactUI.Block key={date.month() + '-' + date.date()}>
            {cells}
          </ReactUI.Block>
        );
        cells = [];
      }

      date = date.clone().add(1, 'days');
    }

    return rows;
  }

  onNextMonth = () => {
    let viewDate = this.props.viewDate.clone().add(1, 'months');
    this.props.onViewDate(viewDate);
  };

  onPrevMonth = () => {
    this.props.onViewDate(this.props.viewDate.clone().subtract(1, 'months'));
  };

}

function startDateFor(date) {
  let startDate = date.clone();
  startDate = startDate.subtract(1, 'months');
  startDate = startDate.date(startDate.daysInMonth());
  startDate = startDate.startOf('week');
  return startDate;
}

function endDateFor(date) {
  let startDate = startDateFor(date);
  let endDate = startDate.clone().add(42, 'days');
  return endDate;
}
