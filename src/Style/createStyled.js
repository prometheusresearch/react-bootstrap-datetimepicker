/**
 * @copyright 2015 Prometheus Research, LLC
 */

import React      from 'react';
import uniqueId   from 'lodash/utility/uniqueId';
import map        from 'lodash/collection/map';
import zipObject  from 'lodash/array/zipObject'
import Stylesheet from './Stylesheet';

function createStylesheet(style, id = '') {
  id = uniqueId(id ? `Style_${id}` : 'Style');
  return new Stylesheet(style, id);
}

function createComponent(Component, style) {
  console.log(Component, style);
  let displayName = typeof Component === 'string' ?
    Component :
    Component.displayName || Component.name;

  return class extends React.Component {
    render() {
      let {state, ...props} = this.props;
      let className = style.apply(state);
      return <Component {...props} className={className} />;
    }
    componentDidMount() {
      style.use();
    }

    componentWillUnmount() {
      style.dispose();
    }
  }
}

export default function createStyled(spec, name = null) {
  return zipObject(map(spec, (spec, key) => {
    let {Component = 'div', ...style} = spec;
    style = createStylesheet(style, name ? name + '__' + key : key);
    return [key, createComponent(Component, style)];
  }));
}
