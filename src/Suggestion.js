import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import utils from './utils'

class Suggestion extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,

    suggestion: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        display: PropTypes.string
      }),
    ]).isRequired,
    descriptor: PropTypes.object.isRequired,

    focused: PropTypes.bool,
  };

  render() {
    let rest = utils.omitKeys(this.props, utils.getKeys(Suggestion.propTypes));

    const className = classNames('mentions-input__suggestion', {
      'mentions-input__suggestion--focused': this.props.focused
    })

    return (
      <li className={className}
        { ...rest }>
        { this.renderContent() }
      </li>
    );
  }

  renderContent() {
    let { id, query, descriptor, suggestion, index } = this.props;

    let display = this.getDisplay();
    let highlightedDisplay = this.renderHighlightedDisplay(display, query);

    if(descriptor.props.renderSuggestion) {
      return descriptor.props.renderSuggestion(suggestion, query, highlightedDisplay, index);
    }

    return highlightedDisplay;
  }

  getDisplay() {
    let { suggestion } = this.props;

    if(suggestion instanceof String) {
      return suggestion;
    }

    let { id, display } = suggestion;

    if(!id || !display) {
      return id;
    }

    return display;
  }

  renderHighlightedDisplay(display) {
    let { query } = this.props;

    let i = display.toLowerCase().indexOf(query.toLowerCase());

    if(i === -1) {
      return <span className="display">{ display }</span>;
    }

    return (
      <span className="display">
        { display.substring(0, i) }
        <b className="highlight">
          { display.substring(i, i+query.length) }
        </b>
        { display.substring(i+query.length) }
      </span>
    );
  }

}

export default Suggestion;
