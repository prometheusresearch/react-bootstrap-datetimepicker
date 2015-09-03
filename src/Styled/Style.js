/**
 * @copyright 2015 Prometheus Research, LLC
 */

import addStyleToDOM          from 'style-loader/addStyles';
import CSSPropertyOperations  from 'react/lib/CSSPropertyOperations';
import isPlainObject          from 'lodash/lang/isPlainObject';
import uniqueId               from 'lodash/utility/uniqueId';
import forEach                from 'lodash/collection/forEach';
import map                    from 'lodash/collection/map';
import filter                 from 'lodash/collection/filter';
import decamelize             from 'decamelize';

const self = 'self';

const SUPPORTED_PSEUDO_CLASSES = {
  focus: true,
  hover: true,
  active: true,
  checked: true,
  default: true,
  disabled: true,
  empty: true,
  enabled: true,
  firstChild: true,
  fullscreen: true,
  indeterminate: true,
  invalid: true,
  lastChild: true,
  left: true,
  link: true,
  onlyChild: true,
  optional: true,
  required: true,
  right: true,
  root: true,
  scope: true,
  target: true,
  valid: true,
  visited: true,
};

export default class Style {

  static create(spec, id = '') {
    id = uniqueId(id ? `Style_${id}` : 'Style');
    return new Style(convertSpecToStyle(spec), id);
  }

  constructor(style, id) {
    let {css, className} = compileStylesheet(style, id)
    this.style = style;
    this.id = id;
    this.css = css;
    this.className = className;

    this._refs = 0;
    this._remove = null;
    this._disposePerform = this._disposePerform.bind(this);
    this._disposeTimer = null;
  }

  asClassName(state = {}) {
    return filter(
      this.className,
      (className, key) => key === self || state[key]
    ).join(' ');
  }

  use() {
    this._refs = this._refs + 1;
    if (this._disposeTimer !== null) {
      clearTimeout(this._disposeTimer);
      this._disposeTimer = null;
    }
    if (this._remove === null) {
      this._remove = addStyleToDOM(this.css);
    }
    return this;
  }

  dispose() {
    this._refs = this._refs - 1;
    if (this._disposeTimer === null) {
      this._disposeTimer = setTimeout(this._disposePerform, 0);
    }
    return this;
  }

  _disposePerform() {
    if (this._refs < 1) {
      this._remove();
      this._remove = null;
    }
  }

}

function convertSpecToStyle(spec) {
  let style = {
    [self]: {}
  };

  forEach(spec, (value, key) => {
    if (isPlainObject(value)) {
      style[key] = value;
    } else {
      style[self][key] = value;
    }
  });

  return style;
}

function compileStylesheet(style, id) {
  let mapping = {};

  let css = map(style, (rules, cls) => {
    let css = CSSPropertyOperations.createMarkupForStyles(rules);

    if (SUPPORTED_PSEUDO_CLASSES[cls]) {
      // We compile styles for states both as pseudoclasses and as regular
      // classes so we can force some of states via JS
      let pseudoClassName = `${id}:${decamelize(cls, '-')}`;
      let className = `${id}--${cls}`;
      mapping[cls] = className;
      return `.${className}, .${pseudoClassName} { ${css} }`;
    } else {
      let className = cls === self ? id : id + '--' + cls;
      mapping[cls] = className;
      return `.${className} { ${css} }`;
    }
  }).join('\n');

  return {css: [[id, css]], className: mapping};
}
