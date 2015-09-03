/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind           from 'autobind-decorator';
import debounce           from 'lodash/function/debounce';
import moment             from 'moment';
import React, {PropTypes} from 'react';
import Tether             from 'tether';
import Layer              from './Layer';
import DateTimePicker     from './DateTimePicker';
import DatePicker         from './DatePicker';
import TimePicker         from './TimePicker';
import Glyphicon          from './Glyphicon';
import Styled             from './Styled';
import {Themeable}        from 'rethemeable';

const TETHER_CONFIG = {
  attachment: 'top left',
  targetAttachment: 'bottom left',
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

@Themeable
export default class DateTimeField extends React.Component {

  static propTypes = {
    dateTime: PropTypes.string,
    onChange: PropTypes.func,
    format: PropTypes.string,
    inputProps: PropTypes.object,
    inputFormat: PropTypes.string,
    defaultText: PropTypes.string,
    mode: PropTypes.oneOf([
      DateTimePicker.Mode.datetime,
      DateTimePicker.Mode.time,
      DateTimePicker.Mode.date
    ]),
  };

  static defaultProps = {
    format: 'x',
    showToday: true,
    viewMode: 'days',
    mode: DateTimePicker.Mode.datetime,
    onChange: function (x) {
      console.log(x);
    }
  };

  static defaultTheme = Styled({
    dropdown: {
      zIndex: 15000,
      padding: 5,
      backgroundColor: '#fff',
      backgroundClip: 'padding-box',
      border: '1px solid rgba(0,0,0,.15)',
      borderRadius: 4,
      boxShadow: '0 6px 12px rgba(0,0,0,.175)',
    }
  }, 'DateTimeField');

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
      open: true,

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
    return (
      <div>
        <div onFocus={this._open} onBlur={this._close} className="input-group date">
          <input
            ref="input"
            type="text"
            className="form-control"
            onChange={this._onChange}
            value={this.state.inputValue}
            {...this.props.inputProps}
            />
          <span
            className="input-group-addon"
            onClick={this._onClick}
            ref="button">
              <Glyphicon glyph={mode === DateTimePicker.Mode.time ? 'time' : 'calendar'} />
          </span>
        </div>
        {this.state.open &&
          <Layer
            didMount={this._onLayerDidMount}
            didUpdate={this._onLayerDidUpdate}
            willUnmount={this._onLayerWillUnmount}>
            <this.theme.dropdown>
              <DateTimePicker
                mode={this.state.mode}
                activeMode={this.state.activeMode}
                onActiveMode={this._onActiveMode}
                onFocus={this._open}
                onBlur={this._close}
                viewDate={this.state.viewDate}
                selectedDate={this.state.selectedDate}
                showToday={this.props.showToday}
                viewMode={this.props.viewMode}
                mode={this.props.mode}
                onViewDate={this._onViewDate}
                onSelectedDate={this._onSelectedDate}
                />
            </this.theme.dropdown>
          </Layer>}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    var nextDate = moment(nextProps.dateTime, nextProps.format, true);
    if(nextDate.isValid()) {
      return this.setState({
        viewDate: nextDate.clone().startOf("month"),
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
      return "MM/DD/YY";
    } else {
      return "MM/DD/YY h:mm A";
    }
  }

  @autobind
  _onActiveMode(activeMode) {
    this.setState({activeMode});
  }

  @autobind
  _onClick() {
    React.findDOMNode(this.refs.input).focus();
  }

  @autobind
  _onLayerDidMount(element) {
    let target = React.findDOMNode(this.refs.input);
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
  _onLayerWillUnmount(element) {
    this._tether.disable();
    this._tether = null;
  }

  @autobind
  _onChange(e) {
    var value = e.target == null ? e : e.target.value;
    var nextState = {inputValue: value};
    var date = moment(value, this.inputFormat, true);
    if (date.isValid()) {
      nextState = {
        ...nextState,
        selectedDate: date.clone(),
        viewDate: date.clone().startOf("month")
      }
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
