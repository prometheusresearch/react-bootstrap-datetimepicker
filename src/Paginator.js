/**
 * @copyright 2015 Prometheus Research, LLC
 */

import * as React from 'react';
import * as ReactUI from '@prometheusresearch/react-ui';

import * as Icon from './Icon';
import Button from './Button';

export default class Paginator extends React.Component {

  static propTypes = {
    onPrev: React.PropTypes.func,
    onNext: React.PropTypes.func,
    onUp: React.PropTypes.func,
    title: React.PropTypes.node,
    children: React.PropTypes.node,
  };

  render() {
    let {onPrev, onNext, onUp, title, children} = this.props;
    return (
      <ReactUI.Block>
        <ReactUI.Block textAlign="center" height={32}>
          <Button
            onClick={onPrev}
            icon={<Icon.AngleLeft />}
            style={{height: 30, width: 30, padding: 0}}
            />
          <Button
            onClick={onUp}
            width={5}>
            {title}
          </Button>
          <Button
            onClick={onNext}
            icon={<Icon.AngleRight />}
            />
        </ReactUI.Block>
        <ReactUI.Block>
          {children}
        </ReactUI.Block>
      </ReactUI.Block>
    );
  }
}
