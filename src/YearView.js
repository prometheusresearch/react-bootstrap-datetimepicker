/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import React from 'react';
import chunk from 'lodash/array/chunk';

import Paginator from './Paginator';
import Button from './Button';

class Year extends React.Component {

  static propTypes = {
    year: React.PropTypes.number,
    outOfRange: React.PropTypes.bool,
    active: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  };

  render() {
    let {year, outOfRange, active, ...props} = this.props;
    return (
      <Button
        {...props}
        width={7 / 3}
        dim={outOfRange}
        active={active}
        onClick={this.onClick}
        tabIndex={0}>
        {year}
      </Button>
    );
  }

  onClick = () => {
    this.props.onClick(this.props.year);
  };
}

export default class YearView extends React.Component {

  static propTypes = {
    viewDate: React.PropTypes.object.isRequired,
    selectedDate: React.PropTypes.object.isRequired,
    onViewDate: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
  }

  render() {
    let {viewDate, selectedDate} = this.props;
    let year = parseInt(viewDate.year() / 10, 10) * 10;
    let selectedYear = selectedDate.year();
    let cells = decadeYearRange(viewDate).map(item =>
      <Year
        key={item.year}
        year={item.year}
        active={item.year === selectedYear}
        outOfRange={item.outOfRange}
        onClick={this.onYearClick}
        />
    );
    let rows = chunk(cells, 3).map((row, idx) => <div key={idx}>{row}</div>);
    return (
      <Paginator
        onPrev={this.onPrevDecade}
        onNext={this.onNextDecade}
        title={`${year} — ${year + 9}`}>
        {rows}
      </Paginator>
    );
  }

  onPrevDecade = () => {
    this.props.onViewDate(this.props.viewDate.clone().subtract(10, 'years'));
  };

  onNextDecade = () => {
    this.props.onViewDate(this.props.viewDate.clone().add(10, 'years'));
  };

  onYearClick = (year) => {
    this.props.onViewDate(this.props.viewDate.clone().year(year));
    this.props.onClose();
  };
}

/**
 * Produce a year range for the provided `date`.
 */
function decadeYearRange(date) {
  let start = Math.floor(date.year() / 10) * 10;
  let end = start + 10;
  let range = [];
  for (let year = start - 1; year <= end; year++) {
    let outOfRange = year === start - 1 || year === end;
    range.push({year, outOfRange});
  }
  return range;
}
