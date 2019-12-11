import * as React from 'react';
import PropTypes from 'prop-types';
import { KeyCodes } from '../common/keycodes';
import './controls.css';
import { cn } from '../common/classnames';

export const classes = {
    input: 'textinput',
    multiline: 'textinput--multiline',
    negative: 'textinput--negative',
    nowrap: 'textinput--nowrap'
  };
  
export class TextInput extends React.Component {

  select() {
    this.input.select();
  }

  focus() {
    this.input.focus();
  }

  blur(skipEnter) {
    const tmpOnEnter = this.onEnter;
    skipEnter && (this.onEnter = () => {});
    this.input.blur();
    this.onEnter = tmpOnEnter;
  }

  onEnter = (text) => {
    this.props.onEnter && this.props.onEnter(text);
  };

  onBlur = (e) => {
    if (this.props.enterOnBlur)
      this.onEnter(e.currentTarget.value);
    this.props.onBlur && this.props.onBlur(e);
  };

  onKeyDown = (e) => {
    if (e.keyCode === KeyCodes.ENTER) {
      e.preventDefault();
      this.onEnter(e.currentTarget.value);
    } else if (e.keyCode === KeyCodes.ESCAPE) {
      if (this.props.blurOnCancel)
        this.blur(true);
      this.props.onCancel && this.props.onCancel();
    }
    this.props.onKeyDown && this.props.onKeyDown(e);
  };

  onRef = (ref) => {
    this.input = ref;
    if (ref == null)
      return;

    if (this.props.autoFocus) {
      this.input.focus();
    }

    if (this.props.defaultSelect) {
      this.input.select();
    }
  };

  getInput() {
    return this.input;
  }

  render() {
    const {
      negative,
      defaultSelect,
      enterOnBlur,
      blurOnCancel,
      onEnter,
      onCancel,
      ...props
    } = this.props;

    return (
      <input
        ref={this.onRef}
        type={this.props.password ? 'password' : 'text'}
        {...props}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        className={cn(this.props.className, classes.input, negative && classes.negative)}
      />
    );
  }
}

TextInput.propTypes = {
  negative: PropTypes.bool,
  onEnter: PropTypes.func, //(value: string) => void;
  onCancel: PropTypes.func, //() => void;
  onBlur: PropTypes.func,
  defaultSelect: PropTypes.bool,
  enterOnBlur: PropTypes.bool,
  blurOnCancel: PropTypes.bool,
  password: PropTypes.bool
}

TextInput.defaultProps = {
    negative: false,
    onEnter: (value) => {},
    onCancel: () => {},
    defaultSelect: false,
    enterOnBlur: false,
    blurOnCancel: false
}

function getChar(event) {
  if (event.which == null) { // IE
    if (event.keyCode < 32) return null; // спец. символ
    return String.fromCharCode(event.keyCode)
  }

  if (event.which !== 0 && event.charCode !== 0) { // все кроме IE
    if (event.which < 32) return null; // спец. символ
    return String.fromCharCode(event.which); // остальные
  }

  return null; // спец. символ
}

const NUMERIC_CHARACTERS_REGEX = /^[Ee0-9+\-.,]$/;

export class NumericInput extends React.Component {
  onKeyPress = (e) => {
    const char = getChar(e);
    if (e.keyCode == KeyCodes.ENTER && this.props.onEnter) {
      e.preventDefault();
      this.props.onEnter(e.currentTarget.value);
    }
    else if (NUMERIC_CHARACTERS_REGEX.test(char) === false)
      e.preventDefault();
  }

  render() {
    return (
      <TextInput
        {...this.props}
        onKeyPress={this.onKeyPress}>
      </TextInput>
    );
  }
}