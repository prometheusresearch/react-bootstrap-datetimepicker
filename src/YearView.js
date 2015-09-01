/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind           from 'autobind-decorator';
import cx                 from 'classnames';
import React, {PropTypes} from 'react';
import Year               from './Year';

export default class YearView extends React.Component {

  static propTypes = {
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    onViewDate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  render() {
    let year = parseInt(this.props.viewDate.year() / 10, 10) * 10;
    return (
      <div className="datepicker-years" style={{...this.props.style, display: "block"}}>
        <table className="table-condensed" style={this.props.tableStyle}>
          <thead>
            <tr>
              <th className="prev" onClick={this.onPrevDecade}>‹</th>
              <th className="switch" colSpan="5">{year} - {year+9}</th>
              <th className="next" onClick={this.onNextDecade}>›</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7">{this.renderYears()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderYears() {
    let selectedYear = this.props.selectedDate.year();
    return decadeYearRange(this.props.viewDate).map(item =>
      <Year
        key={item.year}
        year={item.year}
        active={item.year === selectedYear}
        outOfRange={item.outOfRange}
        onClick={this.onYearClick}
        />
    );
  }

  @autobind
  onPrevDecade() {
    this.props.onViewDate(this.props.viewDate.clone().subtract(10, 'years'));
  }

  @autobind
  onNextDecade() {
    this.props.onViewDate(this.props.viewDate.clone().add(10, 'years'));
  }

  @autobind
  onYearClick(year) {
    this.props.onViewDate(this.props.viewDate.clone().year(year));
    this.props.onClose();
  }
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
