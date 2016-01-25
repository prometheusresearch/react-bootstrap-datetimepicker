/**
 * @copyright 2015 Prometheus Research, LLC
 */

import React, {PropTypes}             from 'react';
import * as Stylesheet                from 'react-stylesheet';
import {style as styleDOM}            from 'react-dom-stylesheet';
import Button                         from './Button';

export default class Paginator extends React.Component {

  static propTypes = {
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onUp: PropTypes.func,
    title: PropTypes.node,
    children: PropTypes.node,
  };

  static stylesheet = Stylesheet.create({
    Controls: {
      height: 32,
      textAlign: 'center'
    }
  }, {styleDOM});

  render() {
    let {onPrev, onNext, onUp, title, children} = this.props;
    let stylesheet = this.constructor.stylesheet;
    return (
      <div>
        <stylesheet.Controls>
          <Button bold onClick={onPrev} size={{width: '15%', height: 32}}>‹</Button>
          <Button bold onClick={onUp} size={{width: '70%'}}>{title}</Button>
          <Button bold onClick={onNext} size={{width: '15%', height: 32}}>›</Button>
        </stylesheet.Controls>
        <div>
          {children}
        </div>
      </div>
    );
  }
}
