import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from "@material-ui/core/es/index";

export default class UploadButton extends Component {
  static propTypes = {
    multiple: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    color: PropTypes.string,
    disabled: PropTypes.bool
  };

  chooseImages() {
    this.input.click();
  }

  render() {
    return (
      <React.Fragment>
        <input
          style={{ display: 'none' }}
          ref={input => this.input = input}
          type="file"
          multiple={this.props.multiple || false}
          onChange={event => this.props.onChange(event)}
          disabled={this.props.disabled || false}
        />

        <Button
          color={this.props.color || 'secondary'}
          onClick={this.chooseImages.bind(this)}
          disabled={this.props.disabled || false}
        >
          {this.props.children}
        </Button>
      </React.Fragment>
    )
  }
}