import React, { Component } from 'react';
import { FormGroup, FormControl, Validators } from '@/form';
import { Button, Grid, TextField } from "@material-ui/core/es/index";
import Translate from "@/containers/Translate/Translate";
import Alert from "@/components/UI/Alert/Alert";

export default class PasswordForm extends Component {
  state = {
    form: new FormGroup({
      token: new FormControl('', [
        Validators.isRequired,
        Validators.minLength(10)
      ]),
      password: new FormControl('', [
        Validators.isRequired,
        Validators.minLength(5)
      ]),
      password_confirmation: new FormControl('', [
        Validators.isRequired,
        Validators.confirm('password')
      ])
    })
  };

  changeHandler(event, controlName) {
    this.state.form.update(form => {
      form.setValue(controlName, event.target.value);
      this.setState({ form });
    });
  }

  submitHandler(event) {
    event.preventDefault();

    this.state.form.update(form => {
      const valid = form.validate();
      this.setState({ form });

      if (valid) {
        this.props.sendNewPassword({...form.getValues(), email: this.props.email});
      }
    });
  }

  render() {
    const { error, success, changeEmail, loader } = this.props;

    const form = this.state.form;
    const token = form.control('token');
    const password = form.control('password');
    const passwordConfirm = form.control('password_confirmation');

    return (
      <React.Fragment>
        <form
          className="mb-15"
          onSubmit={event => this.submitHandler(event)}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            error={!token.valid}
            label={<Translate>Token</Translate>}
            value={token.getValue()}
            onChange={event => this.changeHandler(event, 'token')}
            margin="normal"
            helperText={
              !token.valid
                ? <Translate params={{ field: 'Token' }}>RequiredFieldForm</Translate>
                : null
            }
          />

          <TextField
            fullWidth
            type="password"
            error={!password.valid}
            label={<Translate>New password</Translate>}
            value={password.getValue()}
            onChange={event => this.changeHandler(event, 'password')}
            margin="normal"
            helperText={
              !password.valid
                ? <Translate params={{ field: 'New password' }}>RequiredFieldForm</Translate>
                : null
            }
          />

          <TextField
            fullWidth
            type="password"
            error={!passwordConfirm.valid}
            label={<Translate>Repeat new password</Translate>}
            value={passwordConfirm.getValue()}
            onChange={event => this.changeHandler(event, 'password_confirmation')}
            margin="normal"
            helperText={
              !passwordConfirm.valid
                ? <Translate params={{ field: 'Repeat new password' }}>RequiredFieldForm</Translate>
                : null
            }
          />

          {error ? (
            <Alert className="mt-15" type="danger">
              {error}
            </Alert>
          ) : null}

          {success ? (
            <Alert className="mt-15" type="success">
              {success}
            </Alert>
          ) : null}

          <div className="pt-15 text-right">
            <Button
              onClick={changeEmail}
              type="button"
              color="secondary"
            >
              <Translate>Prev</Translate>
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={loader || !form.isValid()}
            >
              <Translate>Change password</Translate>
            </Button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}