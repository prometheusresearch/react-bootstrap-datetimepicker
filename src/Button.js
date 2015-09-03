/**
 * @copyright 2015, Prometheus Research, LLC
 */

import React, {PropTypes} from 'react';
import {Themeable}        from 'rethemeable';
import {Style, create}    from './Style';

@Themeable
export default class Button extends React.Component {

  static propTypes = {
    active: PropTypes.bool,
    bold: PropTypes.bool,
    dimmed: PropTypes.bool,
    size: PropTypes.object,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    
  };

  static defaultProps = {
    size: {}
  };

  static defaultTheme = create({
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

      dimmed: {
        color: '#bbbbbb',
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
        backgroundColor: '#dddddd !important',
      },

      focus: {
        outline: '1px auto -webkit-focus-ring-color',
      }
    }
  }, 'Button');

  render() {
    let {
      active, bold, size: {width, height}, dimmed,
      color, backgroundColor,
      ...props
    } = this.props;
    return (
      <Style
        style={this.theme.self}
        state={{bold, dimmed, active}}
        width={width}
        height={height}
        color={color}
        backgroundColor={backgroundColor}>
        <a
          {...props}
          role="button"
          />
      </Style>
    );
  }
}
