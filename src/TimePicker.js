/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015-present Prometheus Research, LLC
 */

import * as React from 'react';
import * as ReactUI from '@prometheusresearch/react-ui';
import {css} from '@prometheusresearch/react-ui/stylesheet';
import keyMirror from 'keymirror';
import Button from './Button';

let Mode = keyMirror({
  time: null,
  minutes: null,
  hours: null,
});

const HOUR_RANGE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

class HourButton extends React.Component {

  state = {hover: false};

  onMouseEnter = () => this.setState({hover: true});
  onMouseLeave = () => this.setState({hover: false});

  render() {
    let {date, selectedDate, onSelectedDate} = this.props;
    let {hover} = this.state;
    let selected = selectedDate.hour() === date.hour();
    return (
      <ReactUI.Block
        style={{borderBottom: hover
          ? css.border(1, css.rgb(180))
          : css.border(1,css.color.transparent)}}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        <Button cellSize={24} width={1} emphasis={selected} onClick={this.onClick}>
          {date.format('HH')}
        </Button>
        <MinuteButton
          hover={hover}
          selectedDate={selectedDate}
          renderSelected={minutes => minutes <= 20}
          date={date}
          date={date.clone().add(15, 'minutes')}
          onSelectedDate={onSelectedDate}
          />
        <MinuteButton
          hover={hover}
          selectedDate={selectedDate}
          renderSelected={minutes => minutes > 20 && minutes < 40}
          date={date.clone().add(30, 'minutes')}
          onSelectedDate={onSelectedDate}
          />
        <MinuteButton
          hover={hover}
          selectedDate={selectedDate}
          renderSelected={minutes => minutes >= 40}
          date={date.clone().add(45, 'minutes')}
          onSelectedDate={onSelectedDate}
          />
      </ReactUI.Block>
    );
  }

  onClick = () =>
    this.props.onSelectedDate(this.props.date);
}

class MinuteButton extends React.Component {

  render() {
    let {date, hover, selectedDate, renderSelected} = this.props;
    let selected = (
      selectedDate.hour() === date.hour() &&
      selectedDate.minutes() === date.minutes()
    );
    if (
      renderSelected && !hover &&
      renderSelected(selectedDate.minutes()) &&
      selectedDate.hour() === date.hour()
    ) {
      selected = true;
      date = selectedDate;
    }
    let children = hover || selected
      ? ` : ${date.format('mm')}`
      : null;
    return (
      <Button
        onClick={this.onClick}
        width={1.1}
        cellSize={24}
        emphasis={selected}>
        {children}
      </Button>
    );
  }

  onClick = () =>
    this.props.onSelectedDate(this.props.date);
}

export default class TimePicker extends React.Component {

  static Mode = Mode;

  static propTypes = {
    onActiveMode: React.PropTypes.func.isRequired,
    viewDate: React.PropTypes.object.isRequired,
    onViewDate: React.PropTypes.func.isRequired,
    selectedDate: React.PropTypes.object.isRequired,
    onSelectedDate: React.PropTypes.func.isRequired,
  };

  render() {
    let {viewDate, selectedDate, onSelectedDate} = this.props;
    let startDate = startOfDay(viewDate);
    let dayRange = HOUR_RANGE.map(d => startDate.clone().add(d, 'hours'));
    let nightRange = HOUR_RANGE.map(d => startDate.clone().add(d + 12, 'hours'));
    return (
      <ReactUI.Block style={{borderTop: css.border(1, css.rgb(180))}}>
        <ReactUI.Block inline style={{borderRight: css.border(1, css.rgb(180))}}>
          {dayRange.map(date =>
            <ReactUI.Block>
              <HourButton
                key={date.hour()}
                date={date}
                selectedDate={selectedDate}
                onSelectedDate={onSelectedDate}
                />
            </ReactUI.Block>)}
        </ReactUI.Block>
        <ReactUI.Block inline>
          {nightRange.map(date =>
            <ReactUI.Block>
              <HourButton
                key={date.hour()}
                date={date}
                selectedDate={selectedDate}
                onSelectedDate={onSelectedDate}
                />
            </ReactUI.Block>)}
        </ReactUI.Block>
      </ReactUI.Block>
    );
  }
}

function startOfDay(date) {
  return date.clone().hours(0).minutes(0).seconds(0);
}
