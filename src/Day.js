/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind             from 'autobind-decorator';
import React, {PropTypes}   from 'react';
import Button               from './Button';

export default class Day extends React.Component {

  static propTypes = {
    date: PropTypes.object,
    active: PropTypes.bool,
    outOfRange: PropTypes.bool,
    onClick: PropTypes.func,
  };

  render() {
    let {date, active, outOfRange, ...props} = this.props;
    return (
      <Button
        size={{width: 32, height: 32}}
        dimmed={outOfRange}
        active={active}
        {...props}
        tabIndex={-1}
        onClick={this.onClick}>
        {date.date()}
      </Button>
    );
  }

  @autobind
  onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.date);
    }
  }
}
