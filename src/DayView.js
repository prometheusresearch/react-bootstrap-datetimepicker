/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind             from 'autobind-decorator';
import moment               from 'moment';
import React, {PropTypes}   from 'react';
import Day                  from './Day';
import {Themeable}          from 'rethemeable';
import Styled               from './Styled';
import Button               from './Button';

function renderDay(props) {
  return <Day {...props} />;
}

@Themeable
export default class DayView extends React.Component {

  static propTypes = {
    viewDate: PropTypes.object.isRequired,
    onViewDate: PropTypes.func.isRequired,
    selectedDate: PropTypes.object.isRequired,
    onSelectedDate: PropTypes.func.isRequired,
    showToday: PropTypes.bool,
    showMonths: PropTypes.func.isRequired,
    renderDay: PropTypes.func,
  };

  static defaultProps = {
    showToday: true,
    renderDay
  };

  static defaultTheme = Styled({

    day: {
      Component: 'td',
      textAlign: 'center',
    },

    dayOfWeek: {
      Component: 'th',
      textAlign: 'center',
      padding: 5
    }
  }, 'DayView');

  render() {
    return (
      <div style={{...this.props.style, display: 'block'}}>
        <table style={this.props.tableStyle}>
          <thead>
            <tr>
              <th><Button bold onClick={this.onPrevMonth} size={{width: '100%', height: 32}}>‹</Button></th>
              <th colSpan="5">
                <Button bold size={{width: '100%'}} onClick={this.props.showMonths}>
                  {moment.months()[this.props.viewDate.month()]} {this.props.viewDate.year()}
                </Button>
              </th>
              <th><Button bold onClick={this.onNextMonth} size={{width: '100%', height: 32}}>›</Button></th>
            </tr>
            <tr>
              <this.theme.dayOfWeek>Su</this.theme.dayOfWeek>
              <this.theme.dayOfWeek>Mo</this.theme.dayOfWeek>
              <this.theme.dayOfWeek>Tu</this.theme.dayOfWeek>
              <this.theme.dayOfWeek>We</this.theme.dayOfWeek>
              <this.theme.dayOfWeek>Th</this.theme.dayOfWeek>
              <this.theme.dayOfWeek>Fr</this.theme.dayOfWeek>
              <this.theme.dayOfWeek>Sa</this.theme.dayOfWeek>
            </tr>
          </thead>
          <tbody>
            {this.renderDays()}
          </tbody>
        </table>
      </div>
    );
  }

  @autobind
  onNextMonth() {
    let viewDate = this.props.viewDate.clone().add(1, 'months');
    this.props.onViewDate(viewDate);
  }

  @autobind
  onPrevMonth() {
    this.props.onViewDate(this.props.viewDate.clone().subtract(1, 'months'));
  }

  renderDays() {
    let {viewDate, selectedDate, showToday} = this.props;

    let today = moment();
    let date = startDateFor(viewDate);
    let endDate = endDateFor(viewDate);

    let rows = [];
    let cells = [];

    while (date.isBefore(endDate)) {
      let isActive = date.isSame(selectedDate, 'day');
      let isToday = date.isSame(today, 'day');
      cells.push(
        <this.theme.day key={date.month() + '-' + date.date()}>
          {this.props.renderDay({
            onClick: this.props.onSelectedDate,
            outOfRange: date.isBefore(viewDate, 'month') || date.isAfter(viewDate, 'month'),
            value: date,
            date: date,
            active: isActive,
            today: isToday,
            showToday: showToday,
          })}
        </this.theme.day>
      );

      if (date.weekday() === today.clone().endOf('week').weekday()) {
        rows.push(
          <tr key={date.month() + '-' + date.date()}>
            {cells}
          </tr>
        );
        cells = [];
      }

      date = date.clone().add(1, 'days');
    }

    return rows;
  }
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
