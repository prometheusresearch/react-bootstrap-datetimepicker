/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind             from 'autobind-decorator';
import moment               from 'moment';
import cx                   from 'classnames';
import React, {PropTypes}   from 'react';
import Button               from './Button';

const MONTHS_SHORT = moment.monthsShort();

export default class Month extends React.Component {

  render() {
    let {active, month, ...props} = this.props;
    return (
      <Button
        size={{width: 75, height: 32}}
        {...props}
        onClick={this.onClick}>
        {MONTHS_SHORT[month]}
      </Button>
    );
  }

  @autobind
  onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.month);
    }
  }
}

