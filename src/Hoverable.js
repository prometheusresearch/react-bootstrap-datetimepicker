/**
 * @copyright 2015, Prometheus Research, LLC
 */

import autobind from 'autobind-decorator';
import React    from 'react';

export default function Hoverable(Component) {
  let displayName = Component.displayName || Component.name;

  return class extends React.Component {
    static displayName = `Hoverable(${displayName})`;

    constructor(props) {
      super(props);
      this.state = {hover: false};
    }

    render() {
      return (
        <Component
          {...this.props}
          hover={this.state.hover}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          />
      );
    }

    @autobind
    onMouseEnter(e) {
      this.setState({hover: true});
      if (this.props.onMouseEnter) {
        this.props.onMouseEnter(e);
      }
    }

    @autobind
    onMouseLeave(e) {
      this.setState({hover: false});
      if (this.props.onMouseLeave) {
        this.props.onMouseLeave(e);
      }
    }
  };
}
