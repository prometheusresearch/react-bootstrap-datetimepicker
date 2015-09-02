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
    let {active, month} = this.props;
    return (
      <Button
        size={{width: 75, height: 32}}
        active={active}
        onClick={this.onClick}>
        {MONTHS_SHORT[month]}
      </Button>
    );
  }

  @autobind
  onClick() {
    this.props.onClick(this.props.month);
  }
}

