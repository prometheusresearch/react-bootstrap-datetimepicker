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
import Stylesheet         from '@prometheusresearch/react-stylesheet';

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

@Stylesheet
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

  static stylesheet = {

    Field: {
      display: 'table'
    },

    Input: {
      Component: 'input',

      display: 'table-cell',
      float: 'left',
      marginBottom: 0,
      width: '100%',
      height: 34,
      padding: '6px 12px',
      fontSize: '14px',
      lineHeight: 1.42857143,
      color: '#555',
      backgroundColor: '#fff',
      backgroundImage: 'none',
      border: '1px solid #ccc',
      borderRadius: 4,
      boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
      transition: 'border-color ease-in-out .15s,box-shadow ease-in-out .15s',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,

      focus: {
        borderColor: '#66afe9',
        outline: 0,
        boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)',
      }
    },

    Button: {
      Component: 'span',

      cursor: 'pointer',
      display: 'table-cell',
      padding: '6px 12px',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1,
      verticalAlign: 'middle',
      color: '#555',
      textAlign: 'center',
      backgroundColor: '#eee',
      border: '1px solid #ccc',
      borderLeft: 'none',
      borderRadius: 4,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },

    Dropdown: {
      zIndex: 15000,
      padding: 5,
      backgroundColor: '#fff',
      backgroundClip: 'padding-box',
      border: '1px solid rgba(0,0,0,.15)',
      borderRadius: 4,
      boxShadow: '0 6px 12px rgba(0,0,0,.175)',
    }
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
    let {Field, Input, Button, Dropdown} = this.stylesheet;
    return (
      <div>
        <Field onFocus={this._open} onBlur={this._close}>
          <Input
            state={{focus: open}}
            ref="input"
            type="text"
            onChange={this._onChange}
            value={this.state.inputValue}
            {...this.props.inputProps}
            />
          <Button
            onClick={this._onClick}
            role="button"
            ref="button">
              <Glyphicon glyph={mode === DateTimePicker.Mode.time ? 'time' : 'calendar'} />
          </Button>
        </Field>
        {open &&
          <Layer
            didMount={this._onLayerDidMount}
            didUpdate={this._onLayerDidUpdate}
            willUnmount={this._onLayerWillUnmount}>
            <Dropdown>
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
            </Dropdown>
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
    if (this.props.mode === DateTimePicker.Mode.datetime) {
      if (this.state.activeMode.self === DateTimePicker.Mode.date) {
        this._onActiveMode({
          ...this.state.activeMode,
          self: DateTimePicker.Mode.time
        });
        React.findDOMNode(this.refs.input).focus();
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
