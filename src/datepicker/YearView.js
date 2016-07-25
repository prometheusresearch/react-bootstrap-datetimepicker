/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015-present Prometheus Research, LLC
 */

import React from 'react';
import chunk from 'lodash/chunk';
import moment from 'moment';

import {Paginator} from '../ui';
import Year from './Year';

export default class YearView extends React.Component {

  static propTypes = {
    viewDate: React.PropTypes.object.isRequired,
    value: React.PropTypes.object.isRequired,
    onViewDate: React.PropTypes.func.isRequired,
    onViewDateSelect: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    Year,
  };

  render() {
    let {Year, viewDate, value = moment()} = this.props;
    let viewYear = parseInt(viewDate.year() / 10, 10) * 10;
    let year = value.year();
    let cells = decadeYearRange(viewDate).map(item =>
      <Year
        key={item.year}
        year={item.year}
        active={item.year === year}
        outOfRange={item.outOfRange}
        onClick={this.onYearClick}
        />
    );
    let rows = chunk(cells, 3).map((row, idx) => <div key={idx}>{row}</div>);
    return (
      <Paginator
        onPrev={this.onPrevDecade}
        onNext={this.onNextDecade}
        title={`${viewYear} — ${viewYear + 9}`}>
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
    this.props.onViewDateSelect(this.props.viewDate.clone().year(year));
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
