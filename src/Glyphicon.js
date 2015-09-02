/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import React, {PropTypes} from 'react';

export default class Glyphicon extends React.Component {

  static propTypes = {
    glyph: PropTypes.string,
  };

  render() {
    let {glyph, ...props} = this.props;
    let className = `glyphicon-${glyph} glyphicon`;
    return <span {...props} aria-hidden={true} className={className} />;
  }
}
