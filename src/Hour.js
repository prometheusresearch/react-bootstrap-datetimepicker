/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind           from 'autobind-decorator';
import React, {PropTypes} from 'react';
import Glyphicon          from './Glyphicon';
import Constants          from './Constants';
import Minute             from './Minute';

export default class Hour extends React.Component {

  render() {
    let {hour} = this.props;
    return (
      <td className="hour" onClick={this.onClick}>
        {hour}
      </td>
    );
  }

  @autobind
  onClick() {
    this.props.onClick(this.props.hour);
  }
}
