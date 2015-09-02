/**
 * @copyright 2015, Prometheus Research, LLC
 */

import autobind from 'autobind-decorator';
import React from 'react';

export default function Focusable(Component) {
  let displayName = Component.displayName || Component.name;

  class Focusable extends React.Component {
    static displayName = `Focusable(${displayName})`;

    constructor(props) {
      super(props);
      this.state = {focus: false};
    }

    render() {
      return (
        <Component
          {...this.props}
          focus={this.state.focus}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          />
      );
    }

    @autobind
    onFocus(e) {
      this.setState({focus: true});
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }

    @autobind
    onBlur(e) {
      this.setState({focus: false});
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  }

  for (let key in Component) {
    if (Component.hasOwnProperty(key)) {
      Focusable[key] = Component[key];
    }
  }

  return Focusable;
}
