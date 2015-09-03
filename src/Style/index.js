/**
 * @copyright 2015 Prometheus Research, LLC
 */

import zipObject              from 'lodash/array/zipObject';
import map                    from 'lodash/collection/map';
import uniqueId               from 'lodash/utility/uniqueId';
import Stylesheet             from './Stylesheet';

export Style                  from './Style';

export function create(sheet, id) {
  let f = (style, key) => [key, createStylesheet(style, id ? id + '__' + key : key)];
  return zipObject(map(sheet, f));
}

function createStylesheet(style, id = '') {
  id = uniqueId(id ? `Style_${id}` : 'Style');
  return new Stylesheet(style, id);
}
