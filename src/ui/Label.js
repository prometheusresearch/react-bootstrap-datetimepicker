/**
 * @copyright 2016-present, Prometheus Research, LLC
 */

import * as React from 'react';
import * as ReactUI from '@prometheusresearch/react-ui';
import {style, css} from '@prometheusresearch/react-ui/stylesheet';

import {CELL_SIZE} from './theme';

let LabelBase = style(ReactUI.Block, {
  fontWidth: 300,
  color: css.rgb(70),
  background: css.color.transparent,
}, {displayName: 'LabelBase'});

export default function Label({
  width = 1,
  height = 1,
  dim,
  emphasis,
  cellSize = CELL_SIZE,
  ...props
}) {
  width = width * cellSize;
  height = height * cellSize;
  let style = {
    width, height,
    padding: 0,
    fontSize: '90%',
    fontWeight: emphasis ? 'bold' : 'normal',
    color: dim ? css.rgb(180) : undefined,
  };
  return <LabelBase {...props} inline style={style} />;
}

