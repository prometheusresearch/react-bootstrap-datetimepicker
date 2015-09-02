/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind from 'autobind-decorator';
import cx       from 'classnames';
import React    from 'react';
import Button   from './Button';

export default class Year extends React.Component {

  render() {
    let {year, outOfRange, active} = this.props;
    return (
      <Button
        size={{width: 75, height: 32}}
        active={active}
        onClick={this.onClick}>
        {year}
      </Button>
    );
  }

  @autobind
  onClick() {
    this.props.onClick(this.props.year);
  }
}
