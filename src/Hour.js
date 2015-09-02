/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind           from 'autobind-decorator';
import React, {PropTypes} from 'react';
import Glyphicon          from './Glyphicon';
import Button             from './Button';

export default class Hour extends React.Component {

  render() {
    let {hour} = this.props;
    return (
      <td>
        <Button size={{width: 32}} onClick={this.onClick}>
          {hour}
        </Button>
      </td>
    );
  }

  @autobind
  onClick() {
    this.props.onClick(this.props.hour);
  }
}
