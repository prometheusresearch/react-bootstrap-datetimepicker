/**
 * @copyright 2015 Prometheus Research, LLC
 */

import React, {PropTypes} from 'react';
import {Themeable}        from 'rethemeable';
import Button             from './Button';
import Styled             from './Styled';

@Themeable
export default class Paginator extends React.Component {

  static propTypes = {
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onUp: PropTypes.func,
    title: PropTypes.node,
    children: PropTypes.node,
  };

  static defaultTheme = Styled({

    controls: {
      height: 32,
      textAlign: 'center'
    }
  }, 'Paginator');

  render() {
    let {onPrev, onNext, onUp, title, children} = this.props;
    return (
      <div>
        <this.theme.controls>
          <Button bold onClick={onPrev} size={{width: '15%', height: 32}}>‹</Button>
          <Button bold onClick={onUp} size={{width: '70%'}}>{title}</Button>
          <Button bold onClick={onNext} size={{width: '15%', height: 32}}>›</Button>
        </this.theme.controls>
        <div>
          {children}
        </div>
      </div>
    );
  }
}
