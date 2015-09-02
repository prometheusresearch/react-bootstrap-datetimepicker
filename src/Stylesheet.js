/**
 * @copyright 2015 Prometheus Research, LLC
 */

import isObject   from 'lodash/lang/isObject';
import isFunction from 'lodash/lang/isFunction';
import assign     from 'lodash/object/assign';

function wrapStyle(style) {
  let apply = function apply(context = {}) {
    let style = {...apply.style.default};
    for (let key in apply.style) {
      if (key !== 'default' &&
          apply.style.hasOwnProperty(key)
          && context[key]) {
        assign(style, apply.style[key]);
      }
    }
    return style;
  };
  apply.style = style;
  return apply;
}

function mergeStyle(styleA, styleB) {
  if (isFunction(styleA)) {
    styleA = styleA.style;
  }
  if (isFunction(styleB)) {
    styleB = styleB.style;
  }
  let merged = {...styleA, ...styleB};
  return wrapStyle(merged);
}

function wrapSheet(sheet) {
  if (sheet.__wrapped) {
    return sheet;
  }
  let wrapped = {__wrapped: true};
  for (let key in sheet) {
    if (sheet.hasOwnProperty(key) && isObject(sheet[key])) {
      wrapped[key] = wrapStyle(sheet[key]);
    }
  }
  return wrapped;
}

function mergeSheet(sheetA, sheetB) {
  sheetA = wrapSheet(sheetA);
  sheetB = wrapSheet(sheetB);
  let merged = {...sheetA, __wrapped: true};
  for (let key in sheetB) {
    if (sheetB.hasOwnProperty(key) && key !== '__wrapped') {
      if (merged.hasOwnProperty(key)) {
        merged[key] = mergeStyle(merged[key], sheetB[key]);
      } else {
        merged[key] = sheetB[key];
      }
    }
  }
  return merged;
}

export default function create(...args) {
  return args.reduce((sheet, arg) => mergeSheet(sheet, arg), {});
}
