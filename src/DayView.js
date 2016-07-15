/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015-present Prometheus Research, LLC
 */

import moment from 'moment';
import React from 'react';
import * as ReactUI from '@prometheusresearch/react-ui';
import {css, create} from '@prometheusresearch/react-ui/stylesheet';

import * as Icon from './Icon';
import Button from './Button';

function renderDay(props) {
  return <Day {...props} />;
}

class Day extends React.Component {

  static propTypes = {
    date: React.PropTypes.object,
    active: React.PropTypes.bool,
    outOfRange: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  };

  render() {
    let {date, active, outOfRange, ...props} = this.props;
    return (
      <Button
        dim={outOfRange}
        active={active}
        tabIndex={-1}
        onClick={this.onClick}>
        {date.date()}
      </Button>
    );
  }

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.date);
    }
  };
}

export default class DayView extends React.Component {

  static propTypes = {
    viewDate: React.PropTypes.object.isRequired,
    onViewDate: React.PropTypes.func.isRequired,
    selectedDate: React.PropTypes.object.isRequired,
    onSelectedDate: React.PropTypes.func.isRequired,
    showToday: React.PropTypes.bool,
    showMonths: React.PropTypes.func.isRequired,
    renderDay: React.PropTypes.func,
    style: React.PropTypes.object,
    tableStyle: React.PropTypes.object,
  };

  static defaultProps = {
    showToday: true,
    renderDay
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
    let {DayOfWeek} = this.constructor.stylesheet;
    return (
      <ReactUI.Block style={this.props.style}>
        <table style={this.props.tableStyle}>
          <thead>
            <tr>
              <th>
                <Button
                  onClick={this.onPrevMonth}
                  icon={<Icon.AngleLeft />}
                  />
              </th>
              <th colSpan="5">
                <Button
                  width={5}
                  onClick={this.props.showMonths}>
                  {moment.months()[this.props.viewDate.month()]} {this.props.viewDate.year()}
                </Button>
              </th>
              <th>
                <Button
                  onClick={this.onNextMonth}
                  icon={<Icon.AngleRight />}
                  />
              </th>
            </tr>
            <tr>
              <DayOfWeek>Su</DayOfWeek>
              <DayOfWeek>Mo</DayOfWeek>
              <DayOfWeek>Tu</DayOfWeek>
              <DayOfWeek>We</DayOfWeek>
              <DayOfWeek>Th</DayOfWeek>
              <DayOfWeek>Fr</DayOfWeek>
              <DayOfWeek>Sa</DayOfWeek>
            </tr>
          </thead>
          <tbody>
            {this.renderDays()}
          </tbody>
        </table>
      </ReactUI.Block>
    );
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
        <td key={date.month() + '-' + date.date()}>
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
