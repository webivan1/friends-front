import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changeEmail,
  sendEmail,
  sendNewPassword
} from "@/store/actions/restore-password-form/restorePasswordFormAction";
import CircularProgress from '@material-ui/core/CircularProgress';
import AuthWrapper from '@/containers/Pages/Auth/AuthWrapper';
import Translate from '@/containers/Translate/Translate';
import EmailForm from '@/containers/Pages/Auth/RestorePassword/EmailForm/EmailForm';
import PasswordForm from '@/containers/Pages/Auth/RestorePassword/PasswordForm/PasswordForm';

@connect(
  state => ({ ...state.restorePasswordForm, locale: state.translate.locale }),
  dispatch => ({
    sendEmail: email => dispatch(sendEmail(email)),
    changeEmail: () => dispatch(changeEmail()),
    sendNewPassword: data => dispatch(sendNewPassword(data))
  })
)
export default class RestorePassword extends Component {
  render() {
    const { email, loader, locale } = this.props;

    return (
      <AuthWrapper
        title={<Translate>Restore password</Translate>}
        hideAction={true}
        locale={locale}
      >
        { loader ? <CircularProgress /> : null }

        {email ? <PasswordForm {...this.props} /> : <EmailForm {...this.props} />}
      </AuthWrapper>
    );
  }
}