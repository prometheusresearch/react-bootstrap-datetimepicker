var React = require('react');

var Glyphicon = React.createClass({

  render() {
    var {children, className, glyph, ...props} = this.props;
    className = `glyphicon-${glyph} ${className}`;
    return (
      <span {...props} className={className}>
        {children}
      </span>
    );
  }
});

module.exports = Glyphicon;
