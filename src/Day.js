/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind             from 'autobind-decorator';
import cx                   from 'classnames';
import React, {PropTypes}   from 'react';
import Hoverable            from './Hoverable';
import Button               from './Button';

export default class Day extends React.Component {

  render() {
    let {date, className, active} = this.props;
    return (
      <td
        className={cx(className)}>
        <Button
          size={{width: 32, height: 32}}
          active={active}
          tabIndex={0}
          onClick={this.onClick}>
          {date.date()}
        </Button>
      </td>
    );
  }

  @autobind
  onClick() {
    this.props.onClick(this.props.date);
  }
}
