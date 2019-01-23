import React, { Component } from 'react';
import { connect } from 'react-redux';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Alert from '@/components/UI/Alert/Alert';
import { withStyles } from '@material-ui/core/styles';
import Translate from '@/containers/Translate/Translate';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, Validators } from '@/form';
import { register as submit } from '@/store/actions/register-form/registerFormAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import AuthWrapper from '@/containers/Pages/Auth/AuthWrapper';
import styles from '@/containers/Pages/Auth/Register/styles';

@withStyles(styles)
@connect(
  state => ({ ...state.registerForm, locale: state.translate.locale }),
  dispatch => ({
    onSubmit: formData => dispatch(submit(formData))
  })
)
export default class Register extends Component {
  state = {
    form: new FormGroup({
      name: new FormControl('', [
        Validators.isRequired,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
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

  changeHandler(event, controlName) {
    this.state.form.update(form => {
      form.setValue(controlName, event.target.value);
      this.setState({ form });
    });
  }

  registerHandler() {
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
    this.registerHandler();
  }

  render() {
    const { locale, loader, error, success } = this.props;

    const { form } = this.state;
    const name = form.control('name');
    const email = form.control('email');
    const password = form.control('password');

    return (
      <AuthWrapper
        title={<Translate>Sign Up</Translate>}
        buttonText={<Translate>Sign Up</Translate>}
        locale={locale}
        disabled={loader || !form.isValid()}
        onClick={this.registerHandler.bind(this)}
      >
        <form
          className="mb-15"
          onSubmit={event => this.submitHandler(event)}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            error={!name.valid}
            label={<Translate>Username</Translate>}
            value={name.getValue()}
            onChange={event => this.changeHandler(event, 'name')}
            margin="normal"
            helperText={
              !name.valid
                ? <Translate params={{ field: 'Username' }}>RequiredFieldForm</Translate>
                : null
            }
          />

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

        <DialogContentText>
          <Link to={`/${locale}/login`}>
            <Translate>
              Do you have account?
            </Translate>
          </Link>
        </DialogContentText>

        { loader ? <CircularProgress color="primary" className="mt-15" /> : null }

        {error ? <Alert className="mt-15" type="danger">{error}</Alert> : null}
        {success ? <Alert className="mt-15" type="success">{success}</Alert> : null}
      </AuthWrapper>
    )
  }
}