/**
 * @copyright 2016-present Prometheus Research, LLC
 */

import React from 'react';

import {Button} from '../ui';

export default class Year extends React.Component {

  static propTypes = {
    year: React.PropTypes.number,
    outOfRange: React.PropTypes.bool,
    active: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  };

  render() {
    let {year, outOfRange, active, ...props} = this.props;
    return (
      <Button
        {...props}
        width={7 / 3}
        dim={outOfRange}
        active={active}
        onClick={this.onClick}
        tabIndex={0}>
        {year}
      </Button>
    );
  }

  onClick = () => {
    this.props.onClick(this.props.year);
  };
}
