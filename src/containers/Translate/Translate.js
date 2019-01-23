import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

@connect(
  state => ({ translate: state.translate })
)
export default class Translate extends Component {

  name = null;
  firstLetterUpper = false;

  static propTypes = {
    name: PropTypes.string,
    params: PropTypes.object
  };

  componentWillMount() {
    this.name = this.props.name || this.props.children;
    this.firstLetterUpper = !!this.name.match(/^[A-ZА-Я]/);
  }

  mapParams(text) {
    if (!this.props.params) {
      return text;
    }

    Object.keys(this.props.params).forEach(param => {
      text = text.replace(`:${param}`, this.props.params[param]);
    });

    return text;
  }

  renderTranslate() {
    let translate = this.name;

    Object.keys(this.props.translate.data).forEach(key => {
      if (this.name.toLowerCase() === key.toLowerCase()) {
        translate = this.props.translate.data[key];
      }
    });

    return this.mapParams(
      this.firstLetterUpper
        ? translate.charAt(0).toUpperCase() + translate.slice(1)
        : translate.charAt(0).toLowerCase() + translate.slice(1)
    );
  }

  render() {
    return (
      <React.Fragment>
        { this.renderTranslate() }
      </React.Fragment>
    )
  }
}