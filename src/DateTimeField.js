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
import Glyphicon          from './Glyphicon';
import Constants          from './Constants';

let Style = {

  dropdown: {
    padding: '5px',
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    border: '1px solid rgba(0,0,0,.15)',
    borderRadius: '4px',
    boxShadow: '0 6px 12px rgba(0,0,0,.175)',
  }
};

export default class DateTimeField extends React.Component {

  static propTypes = {
    dateTime: PropTypes.string,
    onChange: PropTypes.func,
    format: PropTypes.string,
    inputProps: PropTypes.object,
    inputFormat: PropTypes.string,
    defaultText: PropTypes.string,
    mode: PropTypes.oneOf([Constants.MODE_DATE, Constants.MODE_DATETIME, Constants.MODE_TIME]),
    minDate: PropTypes.object,
    maxDate: PropTypes.object
  };

  static defaultProps = {
    format: 'x',
    showToday: true,
    viewMode: 'days',
    daysOfWeekDisabled: [],
    mode: Constants.MODE_DATETIME,
    onChange: function (x) {
      console.log(x);
    }
  };

  constructor(props) {
    super(props);
    let date = this.props.dateTime ?
      moment(this.props.dateTime, this.props.format, true) :
      moment();
    this._tether = null;
    this._setOpenDebounced = debounce(this.setOpen, 0);
    this.state = {
      open: true,
      showDatePicker: this.props.mode !== Constants.MODE_TIME,
      showTimePicker: this.props.mode === Constants.MODE_TIME,
      inputFormat: this.inputFormat,
      buttonIcon: this.props.mode === Constants.MODE_TIME ? "time" : "calendar",
      viewDate: date.clone().startOf('month'),
      selectedDate: date.clone(),
      inputValue: this.props.dateTime ?
        date.format(this.inputFormat) :
        this.props.defaultText
    };
  }

  render() {
    return (
      <div>
        <div onFocus={this._onFocus} onBlur={this._onBlur} className="input-group date">
          <input
            ref="input"
            type="text"
            className="form-control"
            onChange={this.onChange}
            value={this.state.inputValue}
            {...this.props.inputProps}
            />
          <span
            className="input-group-addon"
            onClick={this._onClick}
            ref="button">
              <Glyphicon glyph={this.state.buttonIcon} />
          </span>
        </div>
        {this.state.open &&
          <Layer
            didMount={this._onLayerDidMount}
            willUnmount={this._onLayerWillUnmount}>
            <div style={Style.dropdown}>
              <DateTimePicker
                onFocus={this._onPickerFocus}
                onBlur={this._onPickerBlur}
                showDatePicker={this.state.showDatePicker}
                showTimePicker={this.state.showTimePicker}
                viewDate={this.state.viewDate}
                selectedDate={this.state.selectedDate}
                showToday={this.props.showToday}
                viewMode={this.props.viewMode}
                daysOfWeekDisabled={this.props.daysOfWeekDisabled}
                mode={this.props.mode}
                minDate={this.props.minDate}
                maxDate={this.props.maxDate}
                onViewDate={this.onViewDate}
                onSelectedDate={this.onSelectedDate}
                togglePicker={this.togglePicker}
                togglePeriod={this.togglePeriod}
                />
            </div>
          </Layer>}
      </div>
    );
  }

  @autobind
  _onClick() {
    React.findDOMNode(this.refs.input).focus();
  }

  @autobind
  _onFocus() {
    this._setOpenDebounced(true);
  }

  @autobind
  _onBlur() {
    this._setOpenDebounced(false);
  }

  @autobind
  _onPickerFocus() {
    this._setOpenDebounced(true);
  }

  @autobind
  _onPickerBlur() {
    this._setOpenDebounced(false);
  }

  @autobind
  _onLayerDidMount(element) {
    this._tether = new Tether({
      element: element,
      target: React.findDOMNode(this.refs.input),
      attachment: 'top left',
      targetAttachment: 'bottom left',
      constraints: [
        {
          to: 'window',
          attachment: 'together'
        }
      ]
    });
  }

  @autobind
  _onLayerWillUnmount(element) {
    this._tether.disable();
    this._tether = null;
  }

  componentWillReceiveProps(nextProps) {
    var nextDate = moment(nextProps.dateTime, nextProps.format, true);
    if(nextDate.isValid()) {
      return this.setState({
        viewDate: nextDate.clone().startOf("month"),
        selectedDate: nextDate.clone(),
        inputValue: nextDate.format(nextProps.inputFormat)
      });
    }
    if (nextProps.inputFormat !== this.props.inputFormat) {
      return this.setState({
        inputFormat: nextProps.inputFormat
      });
    }
  }

  get inputFormat() {
    if (this.props.inputFormat) {
      return this.props.inputFormat;
    } else if (this.props.mode === Constants.MODE_TIME) {
      return 'h:mm A';
    } else if (this.props.mode === Constants.MODE_DATE) {
      return "MM/DD/YY";
    } else {
      return "MM/DD/YY h:mm A";
    }
  }

  @autobind
  onChange(e) {
    var value = e.target == null ? e : e.target.value;
    var nextState = {inputValue: value};
    var date = moment(value, this.state.inputFormat, true);
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
  onViewDate(viewDate) {
    this.setState({viewDate});
  }

  @autobind
  onSelectedDate(selectedDate) {
    this.setState({selectedDate}, this.onSelectedDateUpdated);
  }

  @autobind
  onSelectedDateUpdated() {
    let {selectedDate, format} = this.state;
    let inputValue = selectedDate.format(this.inputFormat);
    let value = selectedDate.format(format);
    this.props.onChange(value);
    this.setState({inputValue});
  }

  @autobind
  togglePeriod() {
    if (this.state.selectedDate.hour() > 12) {
      return this.onChange(this.state.selectedDate.clone().subtract(12, 'hours').format(this.state.inputFormat));
    } else {
      return this.onChange(this.state.selectedDate.clone().add(12, 'hours').format(this.state.inputFormat));
    }
  }

  @autobind
  togglePicker() {
    return this.setState({
      showDatePicker: !this.state.showDatePicker,
      showTimePicker: !this.state.showTimePicker
    });
  }

  @autobind
  setOpen(open) {
    this.setState({open});
  }

  @autobind
  open() {
    this.setState(state => !state.open ? {open: true} : null);
  }

  @autobind
  close() {
    this.setState(state => state.open ? {open: false} : null);
  }
}
