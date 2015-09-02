/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind             from 'autobind-decorator';
import cx                   from 'classnames';
import moment               from 'moment';
import React, {PropTypes}   from 'react';
import Day                  from './Day';
import Stylesheet           from './Stylesheet';
import Button               from './Button';

let Style = Stylesheet({

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
});

function renderDay(props) {
  return <Day {...props} />;
}

export default class DayView extends React.Component {

  static propTypes = {
    viewDate: PropTypes.object.isRequired,
    onViewDate: PropTypes.func.isRequired,
    selectedDate: PropTypes.object.isRequired,
    onSelectedDate: PropTypes.func.isRequired,
    showToday: PropTypes.bool,
    showMonths: PropTypes.func.isRequired,
  };

  static defaultProps = {
    showToday: true,
    renderDay
  };

  render() {
    let dayOfWeekStyle = Style.dayOfWeek();
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
              <th style={dayOfWeekStyle}>Su</th>
              <th style={dayOfWeekStyle}>Mo</th>
              <th style={dayOfWeekStyle}>Tu</th>
              <th style={dayOfWeekStyle}>We</th>
              <th style={dayOfWeekStyle}>Th</th>
              <th style={dayOfWeekStyle}>Fr</th>
              <th style={dayOfWeekStyle}>Sa</th>
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
    let dayStyle = Style.day();
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
        <td key={date.month() + '-' + date.date()} style={dayStyle}>
          {this.props.renderDay({
            onClick: this.props.onSelectedDate,
            outOfRange: date.isBefore(viewDate, 'month') || date.isAfter(viewDate, 'month'),
            today: showToday && isToday,
            value: date,
            date: date,
            active: isActive,
            today: isToday,
            showToday: showToday,
          })}
        </td>
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
  startDate = startDate.date(startDate.daysInMonth())
  startDate = startDate.startOf('week');
  return startDate;
}

function endDateFor(date) {
  let startDate = startDateFor(date);
  let endDate = startDate.clone().add(42, 'days');
  return endDate;
}
