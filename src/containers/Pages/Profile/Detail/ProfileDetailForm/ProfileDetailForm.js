import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, Validators } from '../../../../../form';
import { Button, Grid, MenuItem, TextField } from "@material-ui/core/es/index";
import Translate from "../../../../Translate/Translate";
import Alert from "../../../../../components/UI/Alert/Alert";
import { save } from "../../../../../store/actions/profile/profile-detail/profileDetailFormAction";

@connect(
  state => state.profileDetailForm,
  dispatch => ({
    onSubmit: data => dispatch(save(data))
  })
)
export default class ProfileDetailForm extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    labels: PropTypes.object.isRequired
  };

  state = {
    form: new FormGroup({
      'age': new FormControl('', [
        Validators.isRequired,
        Validators.isNumber,
        Validators.min(10),
        Validators.max(99)
      ]),
      'body_type': new FormControl('', [
        Validators.isRequired
      ]),
      'eye_color': new FormControl('', [
        Validators.isRequired,
      ]),
      'gender': new FormControl('', [
        Validators.isRequired,
      ]),
      'hair_color': new FormControl('', [
        Validators.isRequired
      ]),
      'height': new FormControl('', [
        Validators.isRequired,
        Validators.isNumber
      ]),
      'orientation': new FormControl('', [
        Validators.isRequired,
      ]),
      'status': new FormControl('', [
        Validators.isRequired,
      ]),
      'weight': new FormControl('', [
        Validators.isRequired,
        Validators.isNumber
      ]),
    })
  };

  componentDidMount() {
    this.state.form.update(form => {
      Object.keys(this.props.data).forEach(key => {
        const value = this.props.data[key];

        if (value) {
          try {
            form.setValue(key, value);
          } catch (e) { }
        }
      });

      this.setState({ form });
    });
  }

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
        this.props.onSubmit(form.getValues());
      }
    });
  }

  inputRender(type, control, label) {
    return (
      <TextField
        disabled={this.props.loader}
        fullWidth
        type={type}
        error={!control.valid}
        label={<Translate>{label}</Translate>}
        value={control.getValue()}
        onChange={event => this.changeHandler(event, control.getName())}
        margin="normal"
        helperText={
          !control.valid
            ? <Translate params={{ field: label }}>RequiredFieldForm</Translate>
            : null
        }
      />
    )
  }

  selectRender(control, label, options) {
    return (
      <TextField
        disabled={this.props.loader}
        fullWidth
        select
        error={!control.valid}
        label={<Translate>{label}</Translate>}
        value={control.getValue()}
        onChange={event => this.changeHandler(event, control.getName())}
        helperText={
          !control.valid
            ? <Translate params={{ field: label }}>RequiredFieldForm</Translate>
            : null
        }
        SelectProps={{
          renderValue: selected => options.map(option => {
            return option.key === selected
              ? <Translate key={option.key}>{option.value}</Translate>
              : null;
          })
        }}
        margin="normal"
      >
        {options.map(option => (
          <MenuItem key={option.key} value={option.key}>
            <Translate>{option.value}</Translate>
          </MenuItem>
        ))}
      </TextField>
    )
  }

  render() {
    const { labels, loader, error, success } = this.props;

    const form = this.state.form;

    const age = form.control('age');
    const bodyType = form.control('body_type');
    const eyeColor = form.control('eye_color');
    const gender = form.control('gender');
    const hairColor = form.control('hair_color');
    const height = form.control('height');
    const orientation = form.control('orientation');
    const status = form.control('status');
    const weight = form.control('weight');

    return (
      <form onSubmit={event => this.submitHandler(event)}>
        <Grid justify="center" container spacing={0}>
          <Grid item md={8} xs={12}>
            <Grid container spacing={16}>
              <Grid item md={6} xs={12}>
                {this.inputRender('number', age, 'Age')}
              </Grid>
              <Grid item md={6} xs={12}>
                {this.selectRender(bodyType, 'Body type', labels.body)}
              </Grid>
            </Grid>

            <Grid container spacing={16}>
              <Grid item md={6} xs={12}>
                {this.selectRender(eyeColor, 'Eye color', labels.eye)}
              </Grid>
              <Grid item md={6} xs={12}>
                {this.selectRender(gender, 'Gender', labels.gender)}
              </Grid>
            </Grid>

            <Grid container spacing={16}>
              <Grid item md={6} xs={12}>
                {this.selectRender(hairColor, 'Hair color', labels.hair)}
              </Grid>
              <Grid item md={6} xs={12}>
                {this.inputRender('number', height, 'Height')}
              </Grid>
            </Grid>

            <Grid container spacing={16}>
              <Grid item md={4} xs={12}>
                {this.selectRender(orientation, 'Orientation', labels.orientation)}
              </Grid>
              <Grid item md={4} xs={12}>
                {this.selectRender(status, 'Status', labels.status)}
              </Grid>
              <Grid item md={4} xs={12}>
                {this.inputRender('number', weight, 'Weight')}
              </Grid>
            </Grid>

            {error ? <Alert className="mt-15" type="danger">{error}</Alert> : null}
            {success ? <Alert className="mt-15" type="success">{success}</Alert> : null}

            <div className="pt-25 text-right">
              <Button
                disabled={loader}
                type="submit"
                variant="contained"
                color="primary"
              >
                <Translate>Save</Translate>
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    )
  }
}