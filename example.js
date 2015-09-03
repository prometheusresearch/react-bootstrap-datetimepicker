/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import 'normalize.css';
import React            from 'react';
import moment           from 'moment';
import Styled           from './src/Styled';
import DateTimeField    from './src/DateTimeField';

let styled = Styled({

  default: {
    boxSizing: 'border-box',
  },

  root: {
    height: '100%',
    fontFamily: 'Helvetica, sans-serif',
    backgroundColor: '#fafafa',
  },

  pane: {
    width: 600,
    margin: '0 auto',
    padding: '10px 0px',
  },

  header: {
    Component: 'h1',
    color: '#666',
    margin: 0,
    marginBottom: 25
  },

  footer: {
    backgroundColor: '#eaeaea',
  },

  demo: {
    marginBottom: 20
  }
}, 'Example');

export default class Example extends React.Component {

	render() {
		return (
      <styled.root>
        <styled.pane>
          <styled.header>React Bootstrap DateTimePicker</styled.header>
          <styled.demo>
            <DateTimeField />
          </styled.demo>
        </styled.pane>
        <styled.footer>
          <styled.pane>
            Hello
          </styled.pane>
        </styled.footer>
      </styled.root>
    );
		return (
		  <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>React Bootstrap DateTimePicker</h1>
            This project is a port of <a href="https://github.com/Eonasdan/bootstrap-datetimepicker">https://github.com/Eonasdan/bootstrap-datetimepicker</a> for React.js
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            Default Basic Example
            <DateTimeField />
            <pre> {'<DateTimeField />'} </pre>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            Example with default Text
            <DateTimeField
              defaultText="Please select a date"
            />
            <pre> {'<DateTimeField defaultText="Please select a date" />'} </pre>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            ViewMode set to years view with custom inputFormat
            <DateTimeField
              inputFormat='DD-MM-YYYY'
              viewMode='years'
            />
            <pre> {'<DateTimeField viewMode="years" inputFormat="DD-MM-YYYY" />'} </pre>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            daysOfWeekDisabled
            <DateTimeField
              daysOfWeekDisabled={[0,1,2]}
            />
            <pre> {'<DateTimeField daysOfWeekDisabled={[0,1,2]} />'} </pre>

          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            minDate and maxDate
            <DateTimeField
              minDate={moment().subtract(1, 'days')}
              maxDate={moment().add(1, 'days')}
            />
            <pre> {'<DateTimeField daysOfWeekDisabled={[0,1,2]} />'} </pre>

          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
              just time picker
              <DateTimeField
                  mode="time"
                  />
              <pre> {'<DateTimeField mode="time" />'} </pre>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
              just date picker
              <DateTimeField
                  mode="date"
                  />
              <pre> {'<DateTimeField mode="date" />'} </pre>
          </div>
        </div>
      </div>
    );
  }
}
