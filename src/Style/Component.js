/**
 * @copyright 2015 Prometheus Research, LLC
 */

import React, {PropTypes}     from 'react';

export default class Component extends React.Component {

  static propTypes = {
    style: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.style.use();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.style !== this.props.style) {
      this.props.style.dispose();
      nextProps.style.use();
    }
  }

  componentWillUnmount() {
    this.props.style.dispose();
  }
}
