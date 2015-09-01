/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind             from 'autobind-decorator';
import cx                   from 'classnames';
import moment               from 'moment';
import React, {PropTypes}   from 'react';
import Month                from './Month';

const MONTHS_SHORT = moment.monthsShort();
const YEAR_MONTH_RANGE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function renderMonth(props) {
  return <Month {...props} />;
}

export default class MonthView extends React.Component {

  static propTypes = {
    viewDate: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    showYears: PropTypes.func.isRequired,
    renderMonth: PropTypes.func,
    onViewDate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    renderMonth
  };

  render() {
    return (
      <div className="datepicker-months" style={{...this.props.style, display: 'block'}}>
        <table className="table-condensed" style={this.props.tableStyle}>
          <thead>
            <tr>
              <th className="prev" onClick={this.onPrevYear}>‹</th>
              <th className="switch" colSpan="5" onClick={this.props.showYears}>{this.props.viewDate.year()}</th>
              <th className="next" onClick={this.onNextYear}>›</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7">{this.renderMonths()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderMonths() {
    let viewYear = this.props.viewDate.year();
    let selectedYear = this.props.selectedDate.year();
    let selectedMonth = this.props.selectedDate.month();
    return YEAR_MONTH_RANGE.map(month => this.props.renderMonth({
      key: month,
      active: month === selectedMonth && viewYear === selectedYear,
      month: month,
      year: viewYear,
      value: MONTHS_SHORT[month],
      onClick: this.onMonthClick,
    }));
  }

  @autobind
  onNextYear() {
    this.props.onViewDate(this.props.viewDate.clone().add(1, 'years'));
  }

  @autobind
  onPrevYear() {
    this.props.onViewDate(this.props.viewDate.clone().subtract(1, 'years'));
  }

  @autobind
  onMonthClick(month) {
    this.props.onViewDate(this.props.viewDate.clone().month(month));
    this.props.onClose();
  }
}
