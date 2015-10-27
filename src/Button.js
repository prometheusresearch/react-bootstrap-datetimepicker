/**
 * @copyright 2015, Prometheus Research, LLC
 */

import React, {PropTypes} from 'react';
import {styleable, createStylesheet} from '@prometheusresearch/react-stylesheet';

@styleable
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

  static stylesheet = createStylesheet({
    Self: {
      borderRadius: 4,
      padding: 5,
      display: 'inline-block',
      textDecoration: 'none',
      cursor: 'pointer',
      textAlign: 'center',
      color: '#666',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      border: '1px solid transparent',

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
        outline: 'none',
        border: '1px solid #B7B7B7',
      }
    }
  });

  render() {
    let {
      active, bold, size: {width, height}, dimmed,
      color, backgroundColor,
      ...props
    } = this.props;
    return (
      <this.stylesheet.Self
        {...props}
        state={{bold, dimmed, active}}
        style={{width, height, color, backgroundColor}}
        role="button"
        />
    );
  }
}
