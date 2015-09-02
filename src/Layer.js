/**
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind from 'autobind-decorator';
import React    from 'react';

export default class Layer extends React.Component {

  constructor(props) {
    super(props);
    this._element = null;
    this._component = null;
  }

  render() {
    return null;
  }

  componentDidMount() {
    this._element = this._createElement();
    this._component = React.render(
      React.Children.only(this.props.children),
      this._element,
      this._onMount);
  }

  componentDidUpdate() {
    this._component = React.render(
      React.Children.only(this.props.children),
      this._element);
  }

  componentWillUnmount() {
    this.props.willUnmount(this._element)
    React.unmountComponentAtNode(this._element);
    document.body.removeChild(this._element);
    this._element = null;
    this._component = null;
  }

  @autobind
  _onMount() {
    this.props.didMount(this._element);
  }

  _createElement() {
    let element = document.createElement('div');
    document.body.appendChild(element);
    return element;
  }
}
