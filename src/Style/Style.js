/**
 * @copyright 2015 Prometheus Research, LLC
 */

import React      from 'react';
import Component  from './Component';

export default class Style extends Component {

  render() {
    let {children, style: stylesheet, state, ...style} = this.props;
    let className = stylesheet.apply(state);
    children = React.Children.only(children);
    children = React.cloneElement(children, {className, style});
    return children;
  }
}
