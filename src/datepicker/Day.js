/**
 * @copyright 2015-present Prometheus Research, LLC
 */

import noop from 'lodash/noop';
import React from 'react';

import {Button} from '../ui';

export default class Day extends React.Component {

  static propTypes = {
    date: React.PropTypes.object,
    active: React.PropTypes.bool,
    outOfRange: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  };

  static defaultProps = {
    onClick: noop,
  };

  render() {
    let {date, active, outOfRange} = this.props;
    return (
      <Button
        dim={outOfRange}
        active={active}
        tabIndex={-1}
        onClick={this.onClick}>
        {date.date()}
      </Button>
    );
  }

  onClick = () =>
    this.props.onClick(this.props.date);

}

