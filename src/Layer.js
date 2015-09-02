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
      this._didMount);
  }

  componentDidUpdate() {
    this._component = React.render(
      React.Children.only(this.props.children),
      this._element,
      this._didUpdate);
  }

  componentWillUnmount() {
    this.props.willUnmount(this._element)
    React.unmountComponentAtNode(this._element);
    document.body.removeChild(this._element);
    this._element = null;
    this._component = null;
  }

  @autobind
  _didMount() {
    this.props.didMount(this._element);
  }

  @autobind
  _didUpdate() {
    this.props.didUpdate(this._element);
  }

  _createElement() {
    let element = document.createElement('div');
    element.style.zIndex = '15000';
    document.body.appendChild(element);
    return element;
  }
}
