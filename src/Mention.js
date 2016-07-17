import React, { PropTypes } from 'react';

import utils from './utils';

function Mention({ display }) {
  return (
    <strong className="mentions-input__mention">
      { display }
    </strong>
  );
};

Mention.propTypes = {
  /**
   * Called when a new mention is added in the input
   *
   * Example:
   *
   * ```js
   * function(id, display) {
   *   console.log("user " + display + " was mentioned!");
   * }
   * ```
   */
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,

  renderSuggestion: PropTypes.func,

  trigger: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(RegExp)
  ]),

  isLoading: PropTypes.bool,
  className: PropTypes.string
};

Mention.defaultProps = {
  trigger: "@",

  onAdd: () => null,
  onRemove: () => null,
  renderSuggestion: null,
  isLoading: false,
  appendSpaceOnAdd: false
};

export default Mention;
