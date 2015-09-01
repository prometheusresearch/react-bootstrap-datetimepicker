/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind             from 'autobind-decorator';
import cx                   from 'classnames';
import React, {PropTypes}   from 'react';

export default class Day extends React.Component {

  render() {
    let {date, className} = this.props;
    return (
      <td tabIndex={0} className={cx(className)} onClick={this.onClick}>
        {date.date()}
      </td>
    );
  }

  @autobind
  onClick() {
    this.props.onClick(this.props.date);
  }
}
