/**
 * @copyright 2015 Prometheus Research, LLC
 */

import React, {PropTypes} from 'react';
import Stylesheet         from './Stylesheet';
import Button             from './Button';

let Style = Stylesheet({

  controls: {
    default: {
      height: 32,
      textAlign: 'center'
    }
  }
});

export default class Paginator extends React.Component {

  static propTypes = {
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onUp: PropTypes.func,
    title: PropTypes.node,
    children: PropTypes.node,
  };

  render() {
    let {onPrev, onNext, onUp, title, children} = this.props;
    return (
      <div>
        <div style={Style.controls()}>
          <Button bold onClick={onPrev} size={{width: '15%', height: 32}}>‹</Button>
          <Button bold onClick={onUp} size={{width: '70%'}}>{title}</Button>
          <Button bold onClick={onNext} size={{width: '15%', height: 32}}>›</Button>
        </div>
        <div>
          {children}
        </div>
      </div>
    );
  }
}
