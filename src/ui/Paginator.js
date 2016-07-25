/**
 * @copyright 2015 Prometheus Research, LLC
 */

import * as React from 'react';
import * as ReactUI from '@prometheusresearch/react-ui';

import {AngleLeft, AngleRight} from './Icon';
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
      <ReactUI.Block width={210}>
        <ReactUI.Block textAlign="center" height={30}>
          <Button
            onClick={onPrev}
            icon={<AngleLeft />}
            style={{height: 30, width: 30, padding: 0}}
            />
          <Button
            onClick={onUp}
            width={5}>
            {title}
          </Button>
          <Button
            onClick={onNext}
            icon={<AngleRight />}
            />
        </ReactUI.Block>
        <ReactUI.Block>
          {children}
        </ReactUI.Block>
      </ReactUI.Block>
    );
  }
}
