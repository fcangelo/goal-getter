import React, { Component } from 'react';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasBeenFocused: false,
    };
  }

  markFocused() {
    this.setState({
      hasBeenFocused: true,
    });
  }

  render() {
    const preFocusClassValue = (this.props.preFocusClassName) ? ' ' + this.props.preFocusClassName : '';
    const hasPrePlaceholder = (!this.state.hasBeenFocused && this.props.preFocusPlaceholder);

    return (
      <input
        type="text"
        id={this.props.id}
        className={`input block${(!this.state.hasBeenFocused) ? preFocusClassValue : ''}`}
        placeholder={(hasPrePlaceholder) ? this.props.preFocusPlaceholder : this.props.placeholder}
        value={this.props.value}
        data={this.props.data}
        onFocus={() => this.markFocused()}
        onChange={this.props.onChange}
        // autoFocus={this.props.isFocused} // This breaks the sliding motion
      />
    );
  }
}

export default TextInput;
