/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015-present Prometheus Research, LLC
 */

import moment from 'moment';
import * as React from 'react';
import * as ReactUI from '@prometheusresearch/react-ui';
import {css, style} from '@prometheusresearch/react-ui/stylesheet';

import {Button, theme} from '../ui';

const HOUR_RANGE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

class HourButton extends React.Component {

  state = {hover: false};

  onMouseEnter = () => this.setState({hover: true});
  onMouseLeave = () => this.setState({hover: false});

  render() {
    let {height, date, value, onChange} = this.props;
    let {hover} = this.state;
    let selected = value.hour() === date.hour();
    return (
      <ReactUI.Block
        style={{borderBottom: hover
          ? css.border(1, css.rgb(180))
          : css.border(1,css.color.transparent)}}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        <Button
          height={height}
          emphasis={selected}
          onClick={this.onClick}>
          {date.format('HH')}
        </Button>
        <MinuteButton
          height={height}
          hover={hover}
          value={value}
          renderSelected={minutes => minutes < 30}
          date={date}
          onChange={onChange}
          />
        <MinuteButton
          height={height}
          hover={hover}
          value={value}
          renderSelected={minutes => minutes >= 30}
          date={date.clone().add(30, 'minutes')}
          onChange={onChange}
          />
      </ReactUI.Block>
    );
  }

  onClick = () =>
    this.props.onChange(this.props.date);
}

class MinuteButton extends React.Component {

  render() {
    let {date, hover, value, height, renderSelected} = this.props;
    let selected = (
      value.hour() === date.hour() &&
      value.minutes() === date.minutes()
    );
    if (
      renderSelected && !hover &&
      renderSelected(value.minutes()) &&
      value.hour() === date.hour()
    ) {
      selected = true;
      date = value;
    }
    let children = hover || selected
      ? ` : ${date.format('mm')}`
      : null;
    return (
      <Button
        height={height}
        onClick={this.onClick}
        emphasis={selected}>
        {children}
      </Button>
    );
  }

  onClick = () =>
    this.props.onChange(this.props.date);
}


let TimePickerRoot = style(ReactUI.Block, {
  background: '#ffffff',
});

let TimePickerHourView = style(ReactUI.Block, {
  borderRight: css.border(1, css.rgb(180)),
});

let TimePickerMinuteView = style(ReactUI.Block, {

});

export default class TimePicker extends React.Component {

  static propTypes = {
    onActiveMode: React.PropTypes.func.isRequired,
    viewDate: React.PropTypes.object,
    onViewDate: React.PropTypes.func.isRequired,
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  render() {
    let {viewDate = moment(), value, onChange} = this.props;
    let startDate = startOfDay(viewDate);
    let dayRange = HOUR_RANGE.map(d => startDate.clone().add(d, 'hours'));
    let nightRange = HOUR_RANGE.map(d => startDate.clone().add(d + 12, 'hours'));
    return (
      <TimePickerRoot noWrap width={theme.CELL_SIZE * 6}>
        <TimePickerHourView inline>
          {dayRange.map(date =>
            <ReactUI.Block>
              <HourButton
                height={0.7}
                key={date.hour()}
                date={date}
                value={value}
                onChange={onChange}
                />
            </ReactUI.Block>)}
        </TimePickerHourView>
        <TimePickerMinuteView inline>
          {nightRange.map(date =>
            <ReactUI.Block>
              <HourButton
                height={0.7}
                key={date.hour()}
                date={date}
                value={value}
                onChange={onChange}
                />
            </ReactUI.Block>)}
        </TimePickerMinuteView>
      </TimePickerRoot>
    );
  }
}

function startOfDay(date) {
  return date.clone().hours(0).minutes(0).seconds(0);
}
