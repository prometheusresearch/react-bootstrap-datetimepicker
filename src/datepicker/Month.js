/**
 * @copyright 2016-present Prometheus Research, LLC
 */

import noop from 'lodash/noop';
import React from 'react';
import moment from 'moment';

import {Button} from '../ui';

const MONTHS_SHORT = moment.monthsShort();

export default class Month extends React.Component {

  static propTypes = {
    month: React.PropTypes.number,
    active: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  };

  static defaultProps = {
    onClick: noop,
  };

  render() {
    let {active, month, ...props} = this.props;
    return (
      <Button
        {...props}
        width={7 / 3}
        active={active}
        tabIndex={0}
        onClick={this.onClick}>
        {MONTHS_SHORT[month]}
      </Button>
    );
  }

  onClick = () => {
    this.props.onClick(this.props.month);
  };
}

