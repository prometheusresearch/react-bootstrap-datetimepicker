/**
 * @copyright 2016-present, Prometheus Research, LLC
 */

import * as ReactUI from '@prometheusresearch/react-ui';
import {css, style} from '@prometheusresearch/react-ui/stylesheet';

export default style(ReactUI.Button, {
  textWidth: 300,

  text: css.rgb(136),
  textHover: css.rgb(68),
  textFocus: css.rgb(0, 126, 229),
  textActive: css.rgb(68),
  textDisabled: css.rgb(200),

  background: css.rgb(255),
  backgroundHover: css.rgb(255),
  backgroundFocus: css.rgb(255),
  backgroundActive: css.rgb(255),
  backgroundDisabled: css.rgb(255),

  border: css.color.transparent,
  borderHover: css.color.transparent,
  borderFocus: css.color.transparent,
  borderActive: css.color.transparent,
  borderDisabled: css.color.transparent,

  shadowFocus: css.none,
  shadowActive: css.none,
}, {displayName: 'IconButton'});
