/**
 * @copyright 2015, Prometheus Research, LLC
 */

import React        from 'react';
import Stylesheet   from './Stylesheet';
import Hoverable    from './Hoverable';
import Focusable    from './Focusable';
import {Themeable}  from 'rethemeable';

export let Style = Stylesheet({

  self: {
    default: {
      borderRadius: 4,
      padding: 5,
      display: 'inline-block',
      textDecoration: 'none',
      cursor: 'pointer',
      textAlign: 'center',
      color: '#666',
      userSelect: 'none',
      WebkitUserSelect: 'none',
    },

    bold: {
      fontWeight: 'bold',
    },

    hover: {
      color: '#262626',
      backgroundColor: '#f5f5f5',
    },

    active: {
      color: '#262626',
      backgroundColor: '#dddddd',
    },

    focus: {
      outline: '1px auto -webkit-focus-ring-color',
    }
  }
});

@Hoverable
@Focusable
@Themeable
export default class Button extends React.Component {

  static defaultTheme = Style;

  render() {
    let {
      hover, focus, active, bold, size,
      onMouseEnter, onMouseLeave, ...props
    } = this.props;
    let style = {...this.theme.self({hover, active, bold, focus}), ...size};
    return (
      <a
        {...props}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
        />
    );
  }
}
