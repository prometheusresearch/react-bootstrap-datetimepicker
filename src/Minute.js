/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind           from 'autobind-decorator';
import React, {PropTypes} from 'react';

export default class Minute extends React.Component {

  static propTypes = {
    minute: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    var {minute, ...props} = this.props;
    return (
      <td className="minute" onClick={this.onClick}>
        {minute}
      </td>
    );
  }

  @autobind
  onClick() {
    this.props.onClick(this.props.minute);
  }
}
