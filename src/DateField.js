/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015-present, Prometheus Research, LLC
 */

import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import moment from 'moment';
import Tether from 'tether';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactUI from '@prometheusresearch/react-ui';

import {Icon, Layer, IconButton} from './ui';
import DatePicker from './datepicker/DatePicker';

const TETHER_CONFIG = {
  attachment: 'top left',
  targetAttachment: 'bottom left',
  offset: '-5px 0px',
  optimizations: {
    moveElement: false
  },
  constraints: [
    {
      to: 'window',
      attachment: 'together'
    }
  ]
};

export default class DateField extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    format: React.PropTypes.string,
    inputProps: React.PropTypes.object,
    inputFormat: React.PropTypes.string,
    defaultText: React.PropTypes.string,
  };

  static defaultProps = {
    format: 'x',
    onChange: noop,
  };

  constructor(props) {
    super(props);

    this._tether = null;
    this._tetherNeedPosition = null;
    this._setOpen = debounce(open => this.setState({open}), 0);

    let date = this.props.value
      ? moment(this.props.value, this.props.format, true)
      : moment();

    this.state = {
      open: false,
      mode: 'days',
      viewDate: date.clone().startOf('month'),
      selectedDate: date.clone(),
      inputValue: this.props.value ?
        date.format(this.inputFormat) :
        this.props.defaultText
    };
  }

  render() {
    let {open, mode} = this.state;
    return (
      <ReactUI.Block>
        <ReactUI.Block onFocus={this.open} onBlur={this.close}>
          <ReactUI.Input
            style={{paddingLeft: 36}}
            variant={{focus: open}}
            ref="input"
            type="text"
            onChange={this.onChange}
            value={this.state.inputValue}
            {...this.props.inputProps}
            />
          <ReactUI.Block
            top={5}
            left={5}
            position="absolute">
            <IconButton
              variant={{focus: open}}
              style={{padding: '4px 8px'}}
              ref="button"
              size="small"
              onClick={this.onClick}
              icon={<Icon.Calendar />}
              />
          </ReactUI.Block>
        </ReactUI.Block>
        {open &&
          <Layer
            didMount={this.onLayerDidMount}
            didUpdate={this.onLayerDidUpdate}
            willUnmount={this.onLayerWillUnmount}>
            <ReactUI.Card>
              <DatePicker
                mode={mode}
                onMode={this.onMode}
                onFocus={this.open}
                onBlur={this.close}
                viewDate={this.state.viewDate}
                onViewDate={this.onViewDate}
                value={this.state.selectedDate}
                onChange={this.onSelectedDate}
                />
            </ReactUI.Card>
          </Layer>}
      </ReactUI.Block>
    );
  }

  componentWillReceiveProps(nextProps) {
    let nextDate = moment(nextProps.value, nextProps.format, true);
    if (nextDate.isValid()) {
      this.setState({
        viewDate: nextDate.clone().startOf('month'),
        selectedDate: nextDate.clone(),
        inputValue: nextDate.format(this._inputFormatFromProps(nextProps))
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.mode !== this.state.mode) {
      this._tetherNeedPosition = true;
    }
  }

  get inputFormat() {
    return this._inputFormatFromProps(this.props);
  }

  _inputFormatFromProps(props) {
    if (props.inputFormat) {
      return props.inputFormat;
    } else {
      return 'MM/DD/YY';
    }
  }

  onMode = (mode) => {
    this.setState({mode});
  };

  onClick = () => {
    ReactDOM.findDOMNode(this.refs.input).focus();
  };

  onLayerDidMount = (element) => {
    let target = ReactDOM.findDOMNode(this.refs.input);
    this._tether = new Tether({element, target, ...TETHER_CONFIG});
  };

  onLayerDidUpdate = () => {
    if (this._tetherNeedPosition) {
      this._tetherNeedPosition = false;
      this._tether.position();
    }
  };

  onLayerWillUnmount = () => {
    this._tether.disable();
    this._tether = null;
  };

  onChange = (e) => {
    let value = e.target == null ? e : e.target.value; // eslint-disable-line eqeqeq
    let nextState = {inputValue: value};
    let date = moment(value, this.inputFormat, true);
    if (date.isValid()) {
      nextState = {
        ...nextState,
        selectedDate: date.clone(),
        viewDate: date.clone().startOf('month')
      };
    }
    this.setState(
      nextState,
      () => this.props.onChange(value === '' ? null : date.format(this.props.format))
    );
  };

  onViewDate = (viewDate) => {
    this.setState({viewDate});
  };

  onSelectedDate = (date) => {
    this.setState({
      selectedDate: date,
      viewDate: date,
    }, this.onSelectedDateUpdated);
  };

  onSelectedDateUpdated = () => {
    let {selectedDate} = this.state;
    let inputValue = selectedDate.format(this.inputFormat);
    let value = selectedDate.format(this.props.format);
    this.props.onChange(value);
    this.setState({inputValue});
    this.close();
  };

  open = () => {
    this._setOpen(true);
  }

  close = () => {
    this._setOpen(false);
  }
}
