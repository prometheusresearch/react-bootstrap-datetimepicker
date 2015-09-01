/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind             from 'autobind-decorator';
import moment               from 'moment';
import cx                   from 'classnames';
import React, {PropTypes}   from 'react';

const MONTHS_SHORT = moment.monthsShort();

export default class Month extends React.Component {

  render() {
    let {active, month} = this.props;
    let className = {
      month: true,
      active: active
    };
    return (
      <span className={cx(className)} onClick={this.onClick}>
        {MONTHS_SHORT[month]}
      </span>
    );
  }

  @autobind
  onClick() {
    this.props.onClick(this.props.month);
  }
}

