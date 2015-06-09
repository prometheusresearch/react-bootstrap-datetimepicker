'use strict';

var React           = require('react');
var moment          = require('moment');
var DateTimePicker  = require('./DateTimePicker');
var Glyphicon       = require('./Glyphicon');
var Constants       = require('./Constants');

var DateTimeField = React.createClass({

  propTypes: {
    dateTime: React.PropTypes.string,
    onChange: React.PropTypes.func,
    format: React.PropTypes.string,
    inputProps: React.PropTypes.object,
    inputFormat: React.PropTypes.string,
    defaultText: React.PropTypes.string,
    mode: React.PropTypes.oneOf([Constants.MODE_DATE, Constants.MODE_DATETIME, Constants.MODE_TIME]),
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      format: 'x',
      showToday: true,
      viewMode: 'days',
      daysOfWeekDisabled: [],
      mode: Constants.MODE_DATETIME,
      onChange: function (x) {
        console.log(x);
      }
    };
  },

  getInitialState() {
    return {
      showDatePicker: this.props.mode !== Constants.MODE_TIME,
      showTimePicker: this.props.mode === Constants.MODE_TIME,
      inputFormat: this.resolvePropsInputFormat(),
      buttonIcon: this.props.mode === Constants.MODE_TIME ? "time" : "calendar",
      widgetStyle: {
        display: 'block',
        position: 'absolute',
        left: -9999,
        zIndex: '9999 !important'
      },
      viewDate: this.props.dateTime ? moment(this.props.dateTime, this.props.format, true).startOf("month") : moment(),
      selectedDate: moment(this.props.dateTime, this.props.format, true),
      inputValue: this.props.dateTime ? moment(this.props.dateTime, this.props.format, true).format(this.resolvePropsInputFormat()) : this.props.defaultText
    };
  },

  componentWillReceiveProps(nextProps) {
    if(moment(nextProps.dateTime, nextProps.format, true).isValid()) {
      return this.setState({
        viewDate: moment(nextProps.dateTime, nextProps.format, true).startOf("month"),
        selectedDate: moment(nextProps.dateTime, nextProps.format, true),
        inputValue: moment(nextProps.dateTime, nextProps.format, true).format(nextProps.inputFormat)
      });
    }
    if (nextProps.inputFormat !== this.props.inputFormat) {
      return this.setState({
        inputFormat: nextProps.inputFormat
      });
    }
  },

  resolvePropsInputFormat() {
    if(this.props.inputFormat) return this.props.inputFormat;
    switch(this.props.mode) {
      case Constants.MODE_TIME:
        return "h:mm A";
      case Constants.MODE_DATE:
        return "MM/DD/YY";
      default:
        return "MM/DD/YY h:mm A";
    }
  },

  onChange(e) {
    var value = e.target == null ? e : e.target.value;
    if (moment(value, this.state.inputFormat, true).isValid()) {
      this.setState({
        selectedDate: moment(value, this.state.inputFormat, true),
        viewDate: moment(value, this.state.inputFormat, true).startOf("month")
      });
    }

    return this.setState({
      inputValue: value
    }, function() {
      return this.props.onChange(moment(this.state.inputValue, this.state.inputFormat, true).format(this.props.format));
    });

  },

  setSelectedDate(e) {
    var target = e.target;
    if (target.className && !target.className.match(/disabled/g)) {
      var month;
      if(target.className.indexOf("new") >= 0) month = this.state.viewDate.month() + 1;
      else if(target.className.indexOf("old") >= 0) month = this.state.viewDate.month() - 1;
      else month = this.state.viewDate.month();
      var selectedDate = this.state.viewDate
        .clone()
        .month(month)
        .date(parseInt(e.target.innerHTML))
        .hour(this.state.selectedDate.hours())
        .minute(this.state.selectedDate.minutes())
      return this.setState({selectedDate}, () => {
        this.props.onChange(this.state.selectedDate.format(this.props.format));
        return this.setState({
          inputValue: this.state.selectedDate.format(this.state.inputFormat),
          showDatePicker: false,
          showTimePicker: true
        });
      });
    }
  },

  setSelectedHour(e) {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().hour(parseInt(e.target.innerHTML)).minute(this.state.selectedDate.minutes())
    }, function() {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.state.inputFormat)
      });
    });
  },

  setSelectedMinute(e) {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().hour(this.state.selectedDate.hours()).minute(parseInt(e.target.innerHTML))
    }, function() {
      this.closePicker();
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.state.inputFormat)
      });
    });
  },

  setViewMonth(month) {
    return this.setState({
      viewDate: this.state.viewDate.clone().month(month)
    });
  },

  setViewYear(year) {
    return this.setState({
      viewDate: this.state.viewDate.clone().year(year)
    });
  },

  addMinute() {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().add(1, "minutes")
    }, function() {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
      });
    });
  },

  addHour() {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().add(1, "hours")
    }, function() {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
      });
    });
  },

  addMonth() {
    return this.setState({
      viewDate: this.state.viewDate.add(1, "months")
    });
  },

  addYear() {
    return this.setState({
      viewDate: this.state.viewDate.add(1, "years")
    });
  },

  addDecade() {
    return this.setState({
      viewDate: this.state.viewDate.add(10, "years")
    });
  },

  subtractMinute() {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().subtract(1, "minutes")
    }, function() {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
      });
    });
  },

  subtractHour() {
    return this.setState({
      selectedDate: this.state.selectedDate.clone().subtract(1, "hours")
    }, function() {
      this.props.onChange(this.state.selectedDate.format(this.props.format));
      return this.setState({
        inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
      });
    });
  },

  subtractMonth() {
    return this.setState({
      viewDate: this.state.viewDate.subtract(1, "months")
    });
  },

  subtractYear() {
    return this.setState({
      viewDate: this.state.viewDate.subtract(1, "years")
    });
  },

  subtractDecade() {
    return this.setState({
      viewDate: this.state.viewDate.subtract(10, "years")
    });
  },

  togglePeriod() {
    if (this.state.selectedDate.hour() > 12) {
      return this.onChange(this.state.selectedDate.clone().subtract(12, 'hours').format(this.state.inputFormat));
    } else {
      return this.onChange(this.state.selectedDate.clone().add(12, 'hours').format(this.state.inputFormat));
    }
  },

  togglePicker() {
    return this.setState({
      showDatePicker: !this.state.showDatePicker,
      showTimePicker: !this.state.showTimePicker
    });
  },

  onClick() {
    var classes, gBCR, offset, placePosition, scrollTop, styles;
    if (this.state.showPicker) {
      return this.closePicker();
    } else {
      this.setState({
        showPicker: true
      });
      gBCR = this.refs.dtpbutton.getDOMNode().getBoundingClientRect();
      classes = {
        "bootstrap-datetimepicker-widget": true,
        "dropdown-menu": true
      };
      offset = {
        top: gBCR.top + window.pageYOffset - document.documentElement.clientTop,
        left: gBCR.left + window.pageXOffset - document.documentElement.clientLeft
      };
      offset.top = offset.top + this.refs.datetimepicker.getDOMNode().offsetHeight;
      scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      placePosition = this.props.direction === 'up' ? 'top' : this.props.direction === 'bottom' ? 'bottom' : this.props.direction === 'auto' ? offset.top + this.refs.widget.getDOMNode().offsetHeight > window.offsetHeight + scrollTop && this.refs.widget.offsetHeight + this.refs.datetimepicker.getDOMNode().offsetHeight > offset.top ? 'top' : 'bottom' : void 0;
      if (placePosition === 'top') {
        offset.top = -this.refs.widget.getDOMNode().offsetHeight - this.getDOMNode().clientHeight - 2;
        classes["top"] = true;
        classes["bottom"] = false;
        classes['pull-right'] = true;
      } else {
        offset.top = 40;
        classes["top"] = false;
        classes["bottom"] = true;
        classes['pull-right'] = true;
      }
      styles = {
        display: 'block',
        position: 'absolute',
        top: offset.top,
        left: 'auto',
        right: 40
      };
      return this.setState({
        widgetStyle: styles,
        widgetClasses: classes
      });
    }
  },

  closePicker(e) {
    var style;
    style = this.state.widgetStyle;
    style['left'] = -9999;
    style['display'] = 'none';
    return this.setState({
      showPicker: false,
      widgetStyle: style
    });
  },

  renderOverlay() {
    var styles;
    styles = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: '999'
    };
    if (this.state.showPicker) {
      return <div style={styles} onClick={this.closePicker} />;
    } else {
      return <span />;
    }
  },

  render() {
    return (
      <div>
        {this.renderOverlay()}
        <DateTimePicker
          ref="widget"
          widgetClasses={this.state.widgetClasses}
          widgetStyle={this.state.widgetStyle}
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
          addDecade={this.addDecade}
          addYear={this.addYear}
          addMonth={this.addMonth}
          addHour={this.addHour}
          addMinute={this.addMinute}
          subtractDecade={this.subtractDecade}
          subtractYear={this.subtractYear}
          subtractMonth={this.subtractMonth}
          subtractHour={this.subtractHour}
          subtractMinute={this.subtractMinute}
          setViewYear={this.setViewYear}
          setViewMonth={this.setViewMonth}
          setSelectedDate={this.setSelectedDate}
          setSelectedHour={this.setSelectedHour}
          setSelectedMinute={this.setSelectedMinute}
          togglePicker={this.togglePicker}
          togglePeriod={this.togglePeriod}
          />
        <div className="input-group date" ref="datetimepicker">
          <input
            type="text"
            className="form-control"
            onChange={this.onChange}
            value={this.state.inputValue}
            {...this.props.inputProps}
            />
          <span
            className="input-group-addon"
            onClick={this.onClick}
            onBlur={this.onBlur}
            ref="dtpbutton">
              <Glyphicon glyph={this.state.buttonIcon} />
          </span>
        </div>
      </div>
    );
  }
});

module.exports = DateTimeField;
