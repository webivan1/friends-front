import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from '@/store/actions/login-form/loginFormAction';
import AuthWrapper from '@/containers/Pages/Auth/AuthWrapper';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Translate from '@/containers/Translate/Translate';
import Alert from '@/components/UI/Alert/Alert';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Validators } from '@/form';

@connect(
  state => ({ ...state.loginForm, locale: state.translate.locale }),
  dispatch => ({
    onSubmit: data => dispatch(submit(data))
  })
)
export default class Login extends Component {

  state = {
    form: new FormGroup({
      email: new FormControl('', [
        Validators.isRequired,
        Validators.isEmail
      ]),
      password: new FormControl('', [
        Validators.isRequired,
        Validators.minLength(5)
      ])
    })
  };

  sendFormHandler() {
    this.state.form.update(form => {
      const valid = form.validate();
      this.setState({ form });

      if (valid) {
        this.props.onSubmit(form.getValues())
      }
    });
  }

  submitHandler(event) {
    event.preventDefault();
    this.sendFormHandler();
  }

  changeHandler(event, controlName) {
    this.state.form.update(form => {
      form.setValue(controlName, event.target.value);
      this.setState({ form })
    });
  }

  render() {
    const { loader, error, errorMessage, locale } = this.props;

    const { form } = this.state;
    const email = form.control('email');
    const password = form.control('password');

    return (
      <AuthWrapper
        title={<Translate>Sign in</Translate>}
        buttonText={<Translate>Sign in</Translate>}
        locale={locale}
        disabled={loader || !form.isValid()}
        onClick={this.sendFormHandler.bind(this)}
      >
        <form
          className="mb-15"
          onSubmit={event => this.submitHandler(event)}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            error={!email.valid}
            label={<Translate>Email</Translate>}
            value={email.getValue()}
            onChange={event => this.changeHandler(event, 'email')}
            margin="normal"
            helperText={
              !email.valid
                ? <Translate params={{ field: 'Email' }}>RequiredFieldForm</Translate>
                : null
            }
          />

          <TextField
            fullWidth
            type="password"
            error={!password.valid}
            label={<Translate>Password</Translate>}
            value={password.getValue()}
            onChange={event => this.changeHandler(event, 'password')}
            margin="normal"
            helperText={
              !password.valid
                ? <Translate params={{ field: 'Password' }}>RequiredFieldForm</Translate>
                : null
            }
          />
        </form>

        <div>
          <Link to={`/${locale}/register`}>
            <Translate name="Do you have not account?" />
          </Link>
        </div>
        <div>
          <Link to={`/${locale}/restore-password`}>
            <Translate name="Do you forget password?" />
          </Link>
        </div>

        {loader ? <CircularProgress color="primary" className="mt-15" /> : null}

        {error ? (
          <Alert className="mt-15" type="danger">
            {errorMessage}
          </Alert>
        ) : null}
      </AuthWrapper>
    )
  }
}
