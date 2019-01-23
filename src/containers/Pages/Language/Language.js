import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import translateAction from "../../../store/actions/translate/translateAction";

@withRouter
@connect(
  state => ({ translate: state.translate }),
  dispatch => ({
    onChangeLang: lang => dispatch(translateAction(lang))
  })
)
export default class Language extends Component {

  componentDidMount() {
    const { onChangeLang, match, translate } = this.props;

    if (this.isLangExist() && !this.isLangCorrect()) {
      onChangeLang(match.params.lang);
    } else {
      onChangeLang(translate.locale);
    }
  }

  isLangCorrect() {
    const { translate, match } = this.props;
    return translate.locale === match.params.lang
  }

  isLangExist() {
    const { translate, match } = this.props;
    return translate.languages.some(item => item.lang === match.params.lang);
  }

  render() {
    const { translate } = this.props;

    if (!this.isLangExist()) {
      return <Redirect to={`/${translate.locale}`} />
    }

    return <div />
  }
}