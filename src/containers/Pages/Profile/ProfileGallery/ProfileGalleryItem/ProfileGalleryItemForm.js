import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, Validators } from "../../../../../form";
import {
  FormControl as FormControlComponent,
  FormGroup as FormGroupComponent,
  FormControlLabel,
  Switch,
  TextField, Button
} from "@material-ui/core/es/index";
import Translate from "../../../../Translate/Translate";
import { withStyles } from '@material-ui/core/styles';
import Alert from "../../../../../components/UI/Alert/Alert";

const styles = theme => ({
  buttonError: {
    color: theme.palette.error[500]
  }
});

@withStyles(styles)
export default class ProfileGalleryItemForm extends Component {
  static propTypes = {
    loaderSubmit: PropTypes.bool.isRequired,
    form: PropTypes.object,
    error: PropTypes.any,
    success: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  state = {
    form: new FormGroup({
      description: new FormControl('', [
        Validators.maxLength(255)
      ]),
      avatar: new FormControl(false, [
        Validators.isRequired,
        Validators.isBoolean
      ])
    })
  };

  componentWillMount() {
    const data = this.props.form;
    const form = this.state.form.clone();

    if (data) {
      form.setValue('description', data.description || '');
      form.setValue('avatar', data.avatar || false);
      this.setState({ form });
    }
  }

  changeHandler(value, controlName) {
    this.state.form.update(form => {
      form.setValue(controlName, value);
      this.setState({ form });
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.state.form.update(form => {
      const valid = form.validate();
      this.setState({ form });

      if (valid === true) {
        this.props.onUpdate(form.getValues());
      }
    });
  }

  render() {
    const {
      classes,
      loaderSubmit,
      error,
      success,
      onClose,
      onDelete
    } = this.props;

    const form = this.state.form;

    const description = form.control('description');
    const avatar = form.control('avatar');

    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <FormControlComponent component="fieldset">
          <FormGroupComponent>
            <FormControlLabel
              control={
                <Switch
                  disabled={loaderSubmit}
                  checked={avatar.getValue()}
                  color="primary"
                  onChange={event => {
                    return this.changeHandler(event.target.checked, avatar.getName());
                  }}
                />
              }
              label={<Translate>Avatar</Translate>}
            />
          </FormGroupComponent>
        </FormControlComponent>

        <TextField
          disabled={loaderSubmit}
          fullWidth
          type="text"
          error={!description.valid}
          label={<Translate>Description</Translate>}
          value={description.getValue()}
          onChange={event => {
            return this.changeHandler(event.target.value, description.getName());
          }}
          margin="normal"
          helperText={
            !description.valid
              ? <Translate params={{ field: 'Description' }}>RequiredFieldForm</Translate>
              : null
          }
        />

        {error ? <Alert type="danger">{error}</Alert> : null}
        {success ? <Alert type="success">{success}</Alert> : null}

        <div className="text-right pt-15">
          <Button
            color="secondary"
            type="button"
            onClick={() => onClose()}
          >
            <Translate>Close</Translate>
          </Button>

          <Button
            disabled={loaderSubmit}
            className={classes.buttonError}
            type="button"
            onClick={event => confirm('Are you sure?') ? onDelete() : false}
          >
            <Translate>Delete</Translate>
          </Button>

          <Button
            type="submit"
            disabled={loaderSubmit}
            color="primary"
          >
            <Translate>Update</Translate>
          </Button>
        </div>
      </form>
    )
  }
}