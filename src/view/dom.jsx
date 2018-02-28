import * as ReactDOM from 'react-dom';
/**
 * Creates and appends element to body
 */
export function appendToBody() {
    return document.body.appendChild(document.createElement('div'));
  }
  
  /**
   * Removes element and its components from body
   */
  export function removeFromBody(e) {
    ReactDOM.unmountComponentAtNode(e);
    document.body.removeChild(e);
  }