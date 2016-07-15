/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import * as ReactUI from '@prometheusresearch/react-ui';
import {css, style} from '@prometheusresearch/react-ui/stylesheet';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Icon from './Icon';
import autobind                      from 'autobind-decorator';
import debounce from 'lodash/debounce';
import emptyFunction                 from 'empty/function';
import moment                        from 'moment';
import Tether                        from 'tether';
import Layer                         from './Layer';
import DateTimePicker                from './DateTimePicker';
import DatePicker                    from './DatePicker';
import TimePicker                    from './TimePicker';

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

let IconButton = style(ReactUI.Button, {
  textWidth: 300,

  text: css.rgb(136),
  textHover: css.rgb(68),
  textFocus: css.rgb(0, 126, 229),
  textActive: css.rgb(68),
  textDisabled: css.rgb(200),

  background: css.rgb(255),
  backgroundHover: css.rgb(255),
  backgroundFocus: css.rgb(255),
  backgroundActive: css.rgb(255),
  backgroundDisabled: css.rgb(255),

  border: css.color.transparent,
  borderHover: css.color.transparent,
  borderFocus: css.color.transparent,
  borderActive: css.color.transparent,
  borderDisabled: css.color.transparent,

  shadowFocus: css.none,
  shadowActive: css.none,
}, {displayName: 'IconButton'});

export default class DateTimeField extends React.Component {

  static propTypes = {
    dateTime: React.PropTypes.string,
    onChange: React.PropTypes.func,
    format: React.PropTypes.string,
    inputProps: React.PropTypes.object,
    inputFormat: React.PropTypes.string,
    defaultText: React.PropTypes.string,
    mode: React.PropTypes.oneOf([
      DateTimePicker.Mode.datetime,
      DateTimePicker.Mode.time,
      DateTimePicker.Mode.date
    ]),
  };

  static defaultProps = {
    format: 'x',
    mode: DateTimePicker.Mode.datetime,
    onChange: emptyFunction,
  };

  constructor(props) {
    super(props);

    this._tether = null;
    this._tetherNeedPosition = null;
    this._setOpenDebounced = debounce(this._setOpen, 0);

    let date = this.props.dateTime ?
      moment(this.props.dateTime, this.props.format, true) :
      moment();

    let self = this.props.mode === DateTimePicker.Mode.time ?
      DateTimePicker.Mode.time :
      DateTimePicker.Mode.date;

    this.state = {
      open: false,

      activeMode: {
        self,
        date: DatePicker.Mode.days,
        time: TimePicker.Mode.time,
      },

      viewDate: date.clone().startOf('month'),
      selectedDate: date.clone(),

      inputValue: this.props.dateTime ?
        date.format(this.inputFormat) :
        this.props.defaultText
    };
  }

  render() {
    let {mode} = this.props;
    let {open} = this.state;
    return (
      <ReactUI.Block>
        <ReactUI.Block onFocus={this._open} onBlur={this._close}>
          <ReactUI.Input
            style={{paddingLeft: 36}}
            variant={{focus: open}}
            ref="input"
            type="text"
            onChange={this._onChange}
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
              onClick={this._onClick}
              icon={mode === 'time' ? <Icon.Clock /> : <Icon.Calendar />}
              />
          </ReactUI.Block>
        </ReactUI.Block>
        {open &&
          <Layer
            didMount={this._onLayerDidMount}
            didUpdate={this._onLayerDidUpdate}
            willUnmount={this._onLayerWillUnmount}>
            <ReactUI.Card>
              <DateTimePicker
                activeMode={this.state.activeMode}
                onActiveMode={this._onActiveMode}
                onFocus={this._open}
                onBlur={this._close}
                viewDate={this.state.viewDate}
                selectedDate={this.state.selectedDate}
                mode={this.props.mode}
                onViewDate={this._onViewDate}
                onSelectedDate={this._onSelectedDate}
                />
            </ReactUI.Card>
          </Layer>}
      </ReactUI.Block>
    );
  }

  componentWillReceiveProps(nextProps) {
    let nextDate = moment(nextProps.dateTime, nextProps.format, true);
    if(nextDate.isValid()) {
      return this.setState({
        viewDate: nextDate.clone().startOf('month'),
        selectedDate: nextDate.clone(),
        inputValue: nextDate.format(this._inputFormatFromProps(nextProps))
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.activeMode !== this.state.activeMode) {
      this._tetherNeedPosition = true;
    }
  }

  get inputFormat() {
    return this._inputFormatFromProps(this.props);
  }

  _inputFormatFromProps(props) {
    if (props.inputFormat) {
      return props.inputFormat;
    } else if (props.mode === DateTimePicker.Mode.time) {
      return 'h:mm A';
    } else if (props.mode === DateTimePicker.Mode.date) {
      return 'MM/DD/YY';
    } else {
      return 'MM/DD/YY h:mm A';
    }
  }

  @autobind
  _onActiveMode(activeMode) {
    this.setState({activeMode});
  }

  @autobind
  _onClick() {
    ReactDOM.findDOMNode(this.refs.input).focus();
  }

  @autobind
  _onLayerDidMount(element) {
    let target = ReactDOM.findDOMNode(this.refs.input);
    this._tether = new Tether({element, target, ...TETHER_CONFIG});
  }

  @autobind
  _onLayerDidUpdate() {
    if (this._tetherNeedPosition) {
      this._tetherNeedPosition = false;
      this._tether.position();
    }
  }

  @autobind
  _onLayerWillUnmount() {
    this._tether.disable();
    this._tether = null;
  }

  @autobind
  _onChange(e) {
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
      () => this.props.onChange(value === '' ? null : date.format(this.props.format)));
  }

  @autobind
  _onViewDate(viewDate) {
    this.setState({viewDate});
  }

  @autobind
  _onSelectedDate(date) {
    this.setState({
      selectedDate: date,
      viewDate: date,
    }, this._onSelectedDateUpdated);
  }

  @autobind
  _onSelectedDateUpdated() {
    let {selectedDate} = this.state;
    let inputValue = selectedDate.format(this.inputFormat);
    let value = selectedDate.format(this.props.format);
    this.props.onChange(value);
    this.setState({inputValue});
    if (this.props.mode === DateTimePicker.Mode.datetime) {
      if (this.state.activeMode.self === DateTimePicker.Mode.date) {
        this._onActiveMode({
          ...this.state.activeMode,
          self: DateTimePicker.Mode.time
        });
        ReactDOM.findDOMNode(this.refs.input).focus();
      }
    } else if (this.props.mode === DateTimePicker.Mode.date) {
      this._close();
    }
  }

  @autobind
  _setOpen(open) {
    this.setState({open});
  }

  @autobind
  _open() {
    this._setOpenDebounced(true);
  }

  @autobind
  _close() {
    this._setOpenDebounced(false);
  }
}
