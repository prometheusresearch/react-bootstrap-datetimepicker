/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015-present Prometheus Research, LLC
 */

import chunk from 'lodash/chunk';
import moment from 'moment';
import React from 'react';

import {Paginator} from '../ui';
import Month from './Month';

const MONTHS_SHORT = moment.monthsShort();
const YEAR_MONTH_RANGE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default class MonthView extends React.Component {

  static propTypes = {
    value: React.PropTypes.object,
    showYears: React.PropTypes.func.isRequired,
    viewDate: React.PropTypes.object.isRequired,
    onViewDate: React.PropTypes.func.isRequired,
    onViewDateSelect: React.PropTypes.func.isRequired,
    Month: React.PropTypes.func,
  };

  static defaultProps = {
    Month: Month,
  };

  render() {
    let {Month, viewDate, value = moment()} = this.props;
    let viewYear = viewDate.year();
    let year = value.year();
    let month = value.month();
    let cells = YEAR_MONTH_RANGE.map(m =>
      <Month
        key={m}
        active={m === month && viewYear === year}
        month={m}
        year={viewYear}
        value={MONTHS_SHORT[m]}
        onClick={this.onMonthClick}
        />
    );
    let rows = chunk(cells, 3).map((row, idx) => <div key={idx}>{row}</div>);
    return (
      <Paginator
        title={this.props.viewDate.year()}
        onPrev={this.onPrevYear}
        onNext={this.onNextYear}
        onUp={this.onYearsMode}>
        {rows}
      </Paginator>
    );
  }

  onYearsMode = () => {
    this.props.onMode('years');
  };

  onNextYear = () => {
    let viewDate = this.props.viewDate.clone().add(1, 'years');
    this.props.onViewDate(viewDate);
  };

  onPrevYear = () => {
    let viewDate = this.props.viewDate.clone().subtract(1, 'years');
    this.props.onViewDate(viewDate);
  };

  onMonthClick = (month) => {
    let viewDate = this.props.viewDate.clone().month(month);
    this.props.onViewDateSelect(viewDate);
  };
}
