var React = require('react');

var Glyphicon = React.createClass({

  render() {
    var {children, className, glyph, ...props} = this.props;
    className = `glyphicon-${glyph} glyphicon ${className}`;
    return (
      <span {...props} className={className}>
        {children}
      </span>
    );
  },

  getDefaultProps() {
    return {
      className: ''
    };
  }
});

module.exports = Glyphicon;
