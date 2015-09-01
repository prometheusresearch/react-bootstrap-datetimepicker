/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind             from 'autobind-decorator';
import cx                   from 'classnames';
import moment               from 'moment';
import React, {PropTypes}   from 'react';
import Day                  from './Day';

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
    daysOfWeekDisabled: PropTypes.array,
    showMonths: PropTypes.func.isRequired,
    minDate: PropTypes.object,
    maxDate: PropTypes.object
  };

  static defaultProps = {
    showToday: true,
    renderDay: renderDay,
  };

  render() {
    return (
    <div className="datepicker-days" style={{...this.props.style, display: 'block'}}>
        <table className="table-condensed" style={this.props.tableStyle}>
          <thead>
            <tr>
              <th className="prev" onClick={this.onPrevMonth}>‹</th>
              <th className="switch" colSpan="5" onClick={this.props.showMonths}>
                {moment.months()[this.props.viewDate.month()]} {this.props.viewDate.year()}
              </th>
              <th className="next" onClick={this.onNextMonth}>›</th>
            </tr>
            <tr>
              <th className="dow">Su</th>
              <th className="dow">Mo</th>
              <th className="dow">Tu</th>
              <th className="dow">We</th>
              <th className="dow">Th</th>
              <th className="dow">Fr</th>
              <th className="dow">Sa</th>
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
    this.props.onViewDate(this.props.viewDate.clone().add(1, 'months'));
  }

  @autobind
  onPrevMonth() {
    this.props.onViewDate(this.props.viewDate.clone().subtract(1, 'months'));
  }

  renderDays() {
    let {viewDate, selectedDate, daysOfWeekDisabled, showToday, minDate, maxDate} = this.props;

    let today = moment();
    let date = startDateFor(viewDate);
    let endDate = endDateFor(viewDate);

    if (minDate) {
      minDate = minDate.clone().subtract(1, 'days');
    }
    if (maxDate) {
      maxDate = maxDate.clone();
    }

    let rows = [];
    let cells = [];

    while (date.isBefore(endDate)) {
      let isActive = date.isSame(selectedDate, 'day');
      let isToday = date.isSame(today, 'day');
      let className = {
        day: true,
        old: date.isBefore(viewDate, 'month'),
        new: date.isAfter(viewDate, 'month') && !date.isBefore(viewDate, 'month'),
        active: isActive,
        today: showToday && isToday,
        disabled: (
          minDate && date.isBefore(minDate) ||
          maxDate && date.isAfter(maxDate) ||
          daysOfWeekDisabled && daysOfWeekDisabled.indexOf(date.date()) > -1
        )
      };

      cells.push(this.props.renderDay({
        className: className,
        key: date.month() + '-' + date.date(),
        onClick: this.props.onSelectedDate,
        value: date,
        date: date,
        active: isActive,
        today: isToday,
        showToday: showToday,
      }));

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
