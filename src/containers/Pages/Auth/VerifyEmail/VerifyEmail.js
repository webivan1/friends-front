import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthWrapper from '@/containers/Pages/Auth/AuthWrapper';
import Translate from '@/containers/Translate/Translate';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@/components/UI/Alert/Alert';
import { verifyEmail } from '@/store/actions/verify-email/verifyEmailAction';

@withRouter
@connect(
  state => ({ ...state.verifyEmail, locale: state.translate.locale }),
  dispatch => ({
    onVerify: token => dispatch(verifyEmail(token))
  })
)
export default class VerifyEmail extends Component {
  componentDidMount() {
    const { onVerify, match } = this.props;
    onVerify(match.params.token);
  }

  render() {
    const { locale, loader, error, success } = this.props;

    const renderContent = loader ? (
      <CircularProgress />
    ) : (
      <React.Fragment>
        {error ? <Alert type="danger">{error}</Alert> : null}
        {success ? <Alert type="success">{success}</Alert> : null}
      </React.Fragment>
    );

    return (
      <AuthWrapper
        title={<Translate>Verify email</Translate>}
        hideAction={true}
        locale={locale}
      >
        {renderContent}
      </AuthWrapper>
    );
  }
}