/**
 * @copyright 2015 Prometheus Research, LLC
 */

import React, {PropTypes}   from 'react';
import invariant            from 'invariant';
import map                  from 'lodash/collection/map';
import isString             from 'lodash/lang/isString';
import isFunction           from 'lodash/lang/isFunction';
import zipObject            from 'lodash/array/zipObject'
import Style                from './Style';

/**
 * Create a styled component for a provided component.
 *
 * Styled component injects styles as a CSS blob and injects `className` prop
 * into underlying component.
 *
 * That means that underlying component must be either a DOM component or a
 * composite component which accepts className prop.
 */
function createComponent(Component, style) {

  let componentType = typeof Component;

  invariant(
    componentType === 'string' ||
    componentType === 'function',
    'Expected a valid React component (a string or a function), got: %s',
    componentType
  );

  let displayName = componentType === 'string' ?
    Component :
    Component.displayName || Component.name;

  return class extends React.Component {

    static displayName = `Styled(${displayName})`;

    static propTypes = {
      state: PropTypes.object
    };

    render() {
      let {state, ...props} = this.props;
      let className = style.asClassName(state);
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

/**
 * Create styled components from specs.
 */
export default function Styled(specs, name = null) {
  let components = map(specs, (spec, key) => {
    // 'default' key has styles for every component in the spec, skip it
    if (key === 'default') {
      return null;
    }
    // if already have either a string or a function that means we already have
    // a component for the key, skip it
    if (isString(spec) || isFunction(spec)) {
      return [key, spec]
    }
    let styleName = name ? `${name}__${key}` : key;
    let {Component = 'div', ...rules} = spec;
    let style = Style.create({...specs.default, ...rules}, styleName);
    return [key, createComponent(Component, style)];
  });
  return zipObject(components.filter(Boolean));
}
