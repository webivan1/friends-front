import React, { Component } from 'react';
import { FormGroup, FormControl, Validators } from '@/form';
import TextField from "@material-ui/core/es/TextField/TextField";
import Translate from "@/containers/Translate/Translate";
import Link from "react-router-dom/es/Link";
import Alert from "@/components/UI/Alert/Alert";
import Grid from "@material-ui/core/es/Grid/Grid";
import Button from "@material-ui/core/es/Button/Button";
import { withStyles } from '@material-ui/core/styles';
import styles from '@/containers/Pages/Auth/RestorePassword/EmailForm/styles';

@withStyles(styles)
export default class EmailForm extends Component {
  state = {
    form: new FormGroup({
      email: new FormControl('', [
        Validators.isRequired,
        Validators.isEmail
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
        this.props.sendEmail(form.control('email').getValue())
      }
    });
  }

  render() {
    const { locale, error, success, loader, classes } = this.props;
    const form = this.state.form;
    const email = form.control('email');

    return (
      <React.Fragment>
        <form
          className="mb-15"
          onSubmit={event => this.submitHandler(event)}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={0} alignItems="flex-end">
            <Grid item className={classes.fullWidth}>
              <TextField
                className="mb-0"
                fullWidth
                error={!email.valid}
                label={<Translate>Email</Translate>}
                value={email.getValue()}
                onChange={event => this.changeHandler(event, 'email')}
                margin="none"
              />
            </Grid>
            <Grid item>
              <Button
                disabled={loader || !form.isValid()}
                variant="contained"
                color="secondary"
                type="submit"
              >
                <Translate>Send</Translate>
              </Button>
            </Grid>
          </Grid>
          {
            !email.valid
              ? (
                <div className={classes.error}>
                  <Translate params={{ field: 'Email' }}>RequiredFieldForm</Translate>
                </div>
              )
              : null
          }
        </form>

        <div>
          <Link to={`/${locale}/register`}>
            <Translate>
              Do you have not account?
            </Translate>
          </Link>
        </div>
        <div>
          <Link to={`/${locale}/login`}>
            <Translate>
              Do you remember password?
            </Translate>
          </Link>
        </div>

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
      </React.Fragment>
    );
  }
}