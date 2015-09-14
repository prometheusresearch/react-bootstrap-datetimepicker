/**
 * @copyright 2015 Prometheus Research, LLC
 */

import React, {PropTypes} from 'react';
import Stylesheet         from '@prometheusresearch/react-stylesheet';
import Button             from './Button';

@Stylesheet
export default class Paginator extends React.Component {

  static propTypes = {
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onUp: PropTypes.func,
    title: PropTypes.node,
    children: PropTypes.node,
  };

  static stylesheet = {
    Controls: {
      height: 32,
      textAlign: 'center'
    }
  };

  render() {
    let {onPrev, onNext, onUp, title, children} = this.props;
    return (
      <div>
        <this.stylesheet.Controls>
          <Button bold onClick={onPrev} size={{width: '15%', height: 32}}>‹</Button>
          <Button bold onClick={onUp} size={{width: '70%'}}>{title}</Button>
          <Button bold onClick={onNext} size={{width: '15%', height: 32}}>›</Button>
        </this.stylesheet.Controls>
        <div>
          {children}
        </div>
      </div>
    );
  }
}
