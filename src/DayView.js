/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind             from 'autobind-decorator';
import moment               from 'moment';
import React, {PropTypes}   from 'react';
import Day                  from './Day';
import {Themeable}          from 'rethemeable';
import {Style, create}      from './Style';
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

  static defaultTheme = create({

    day: {
      default: {
        textAlign: 'center',
      }
    },

    dayOfWeek: {
      default: {
        textAlign: 'center',
        padding: 5
      }
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
              <Style style={this.theme.dayOfWeek}>
                <th>Su</th>
              </Style>
              <Style style={this.theme.dayOfWeek}>
                <th>Mo</th>
              </Style>
              <Style style={this.theme.dayOfWeek}>
                <th>Tu</th>
              </Style>
              <Style style={this.theme.dayOfWeek}>
                <th>We</th>
              </Style>
              <Style style={this.theme.dayOfWeek}>
                <th>Th</th>
              </Style>
              <Style style={this.theme.dayOfWeek}>
                <th>Fr</th>
              </Style>
              <Style style={this.theme.dayOfWeek}>
                <th>Sa</th>
              </Style>
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
        <Style style={this.theme.day} key={date.month() + '-' + date.date()}>
          <td>
            {this.props.renderDay({
              onClick: this.props.onSelectedDate,
              outOfRange: date.isBefore(viewDate, 'month') || date.isAfter(viewDate, 'month'),
              value: date,
              date: date,
              active: isActive,
              today: isToday,
              showToday: showToday,
            })}
          </td>
        </Style>
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
