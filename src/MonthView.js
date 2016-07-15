/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015-present Prometheus Research, LLC
 */

import chunk from 'lodash/array/chunk';
import moment from 'moment';
import React from 'react';

import Paginator from './Paginator';
import Button from './Button';

const MONTHS_SHORT = moment.monthsShort();
const YEAR_MONTH_RANGE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function renderMonth(props) {
  return <Month {...props} />;
}

class Month extends React.Component {

  static propTypes = {
    month: React.PropTypes.number,
    active: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  };

  static defaultProps = {
    onClick: function() {},
  };

  render() {
    let {active, month, ...props} = this.props;
    return (
      <Button
        {...props}
        width={7 / 3}
        active={active}
        tabIndex={0}
        onClick={this.onClick}>
        {MONTHS_SHORT[month]}
      </Button>
    );
  }

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.month);
    }
  };
}

export default class MonthView extends React.Component {

  static propTypes = {
    viewDate: React.PropTypes.object.isRequired,
    selectedDate: React.PropTypes.object.isRequired,
    showYears: React.PropTypes.func.isRequired,
    onViewDate: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    renderMonth: React.PropTypes.func,
  };

  static defaultProps = {
    renderMonth
  };

  render() {
    let {renderMonth, viewDate, selectedDate} = this.props;
    let viewYear = viewDate.year();
    let selectedYear = selectedDate.year();
    let selectedMonth = selectedDate.month();
    let cells = YEAR_MONTH_RANGE.map(month => renderMonth({
      key: month,
      active: month === selectedMonth && viewYear === selectedYear,
      month: month,
      year: viewYear,
      value: MONTHS_SHORT[month],
      onClick: this.onMonthClick
    }));
    let rows = chunk(cells, 3).map((row, idx) => <div key={idx}>{row}</div>);
    return (
      <Paginator
        title={this.props.viewDate.year()}
        onPrev={this.onPrevYear}
        onNext={this.onNextYear}
        onUp={this.props.showYears}>
        {rows}
      </Paginator>
    );
  }

  onNextYear = () => {
    this.props.onViewDate(this.props.viewDate.clone().add(1, 'years'));
  };

  onPrevYear = () => {
    this.props.onViewDate(this.props.viewDate.clone().subtract(1, 'years'));
  };

  onMonthClick = (month) => {
    this.props.onViewDate(this.props.viewDate.clone().month(month));
    this.props.onClose();
  };
}
