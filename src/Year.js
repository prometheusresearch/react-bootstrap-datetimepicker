/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind from 'autobind-decorator';
import cx       from 'classnames';
import React    from 'react';

export default class Year extends React.Component {

  render() {
    let {year, outOfRange, active} = this.props;
    let className = cx({
      year: true,
      old: outOfRange,
      active: active,
    });
    return (
      <span
        className={className}
        onClick={this.onClick}>
        {year}
      </span>
    );
  }

  @autobind
  onClick() {
    this.props.onClick(this.props.year);
  }
}
