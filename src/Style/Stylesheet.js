/**
 * @copyright 2015 Prometheus Research, LLC
 */

import addStyleToDOM          from 'style-loader/addStyles';
import CSSPropertyOperations  from 'react/lib/CSSPropertyOperations';
import map                    from 'lodash/collection/map';
import filter                 from 'lodash/collection/filter';

export default class Stylesheet {

  constructor(style, id) {
    let {css, nameToClassName} = compileStylesheet(style, id)
    this.style = style;
    this.id = id;
    this.css = css;
    this.className = nameToClassName;
    this._refs = 0;
    this._remove = null;
    this._disposePerform = this._disposePerform.bind(this);
    this._disposeTimer = null;
  }

  apply(state = {}) {
    return filter(this.className, (className, key) => key === 'default' || state[key]).join(' ');
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

const SUPPORTED_PSEUDO_CLASSES = {
  focus: true,
  hover: true,
  active: true,
};

function compileStylesheet(style, id) {
  let nameToClassName = {};
  let css = map(style, (rules, cls) => {
    let css = CSSPropertyOperations.createMarkupForStyles(rules);
    if (SUPPORTED_PSEUDO_CLASSES[cls]) {
      let pseudoClassName = id + ':' + cls;
      let className = id + '--' + cls;
      nameToClassName[cls] = className;
      return `.${className}, .${pseudoClassName} { ${css} }`;
    } else {
      let className = cls === 'default' ? id : id + '--' + cls;
      nameToClassName[cls] = className;
      return `.${className} { ${css} }`;
    }
  }).join('\n');
  return {css: [[id, css]], nameToClassName};
}
