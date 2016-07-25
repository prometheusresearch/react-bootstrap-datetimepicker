/**
 * @copyright 2015-present, Prometheus Research, LLC
 */

import * as React from 'react';
import * as ReactUI from '@prometheusresearch/react-ui';
import {style, css} from '@prometheusresearch/react-ui/stylesheet';

import {CELL_SIZE} from './theme';

let ButtonBase = style(ReactUI.Button, {
  textWidth: 300,

  text: css.rgb(70),
  textHover: css.rgb(68),
  textFocus: css.rgb(68),
  textActive: css.rgb(255),
  textDisabled: '#dadada',

  background: css.color.transparent,
  backgroundHover: css.rgb(241),
  backgroundFocus: css.rgb(255),
  backgroundActive: css.rgb(180),
  backgroundDisabled: css.rgb(255),

  border: css.color.transparent,
  borderHover: css.color.transparent,
  borderFocus: css.color.transparent,
  borderActive: css.rgb(180),
  borderDisabled: css.color.transparent,

  shadowFocus: css.none,
  shadowActive: css.none,
}, {displayName: 'ButtonBase'});

export default function Button({
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
  return <ButtonBase {...props} style={style} />;
}
