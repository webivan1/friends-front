import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid } from '@material-ui/core';
import Translate from "../../../Translate/Translate";
import FieldRange from "../../../../components/UI/FieldRange/FieldRange";
import { MenuItem } from "@material-ui/core/es";
import Autocomplete from "../../../../components/UI/Autocomplete/Autocomplete";
import Button from "@material-ui/core/es/Button/Button";

const initialState = {
  name: '',
  body_type: '',
  hair_color: '',
  eye_color: '',
  orientation: '',
  gender: '',
  age: { min: 0, max: 120 },
  height: { min: 0, max: 300 },
  weight: { min: 0, max: 500 },
  games: [],
  genres: [],
  location: ''
};

export default class PeopleSearch extends Component {

  static propTypes = {
    labels: PropTypes.shape({
      body: PropTypes.array,
      eye: PropTypes.array,
      gender: PropTypes.array,
      hair: PropTypes.array,
      orientation: PropTypes.array
    }),
    games: PropTypes.array,
    genres: PropTypes.array,
    data: PropTypes.object,
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired
  };

  state = {...initialState};

  componentWillMount() {
    const dataKeys = Object.keys(this.props.data);

    if (dataKeys.length === 0) {
      return;
    }

    dataKeys.forEach(key => {
      if (key in this.state) {
        this.setState({ [key]: this.props.data[key] })
      }
    });
  }

  handleField(controlName, value) {
    this.setState({ [controlName]: value });
  }

  selectRender(control, label, options) {
    options = [{ key: '', value: 'Choose' }, ...options];

    return (
      <TextField
        fullWidth
        select
        label={<Translate>{label}</Translate>}
        value={this.state[control] || ''}
        onChange={event => this.handleField(control, event.target.value)}
        SelectProps={{
          renderValue: selected => options.map(option => {
            return option.key === selected
              ? <Translate key={option.key}>{option.value}</Translate>
              : null;
          })
        }}
        variant="outlined"
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

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state);
  }

  handleResetForm(event) {
    event.preventDefault();

    this.setState({...initialState});
    this.props.onSubmit({});
  }

  render() {
    const {
      name,
      age,
      height,
      weight,
      games,
      genres,
      location
    } = this.state;
    const { labels, disabled } = this.props;

    return (
      <form
        noValidate
        autoComplete="off"
        onSubmit={event => this.handleSubmit(event)}
        onReset={event => this.handleResetForm(event)}
        className="mb-25"
      >
        <Grid container spacing={16}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label={<Translate>Name</Translate>}
              value={name}
              onChange={event => this.handleField('name', event.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              label={<Translate>Country or city</Translate>}
              value={location}
              onChange={event => this.handleField('location', event.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Grid>

          <Grid item md={4} sm={6} xs={12}>
            {this.selectRender('body_type', 'Body type', labels.body)}
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            {this.selectRender('hair_color', 'Hair color', labels.hair)}
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            {this.selectRender('eye_color', 'Eye color', labels.eye)}
          </Grid>

          <Grid item sm={6} xs={12}>
            {this.selectRender('orientation', 'Orientation', labels.orientation)}
          </Grid>
          <Grid item sm={6} xs={12}>
            {this.selectRender('gender', 'Gender', labels.gender)}
          </Grid>

          <Grid item md={4} sm={6} xs={12}>
            <FieldRange
              labelFrom={<Translate name="Age from" />}
              labelTo={<Translate name="Age to" />}
              rules={[0, 120]}
              defaultValue={[0, 120]}
              values={[age.min, age.max]}
              onChange={(min, max) => this.handleField('age', { min, max })}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FieldRange
              labelFrom={<Translate name="Height from" />}
              labelTo={<Translate name="Height to" />}
              rules={[100, 280]}
              defaultValue={[100, 280]}
              values={[height.min, height.max]}
              onChange={(min, max) => this.handleField('height', { min, max })}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FieldRange
              labelFrom={<Translate name="Weight from" />}
              labelTo={<Translate name="Weight to" />}
              rules={[0, 500]}
              defaultValue={[0, 500]}
              values={[weight.min, weight.max]}
              onChange={(min, max) => this.handleField('weight', { min, max })}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <Autocomplete
              items={this.props.games}
              values={games}
              placeholder="..."
              label={<Translate name="Online games" />}
              onChangeItems={value => this.handleField('games', value)}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              items={this.props.genres}
              values={genres}
              placeholder="..."
              label={<Translate name="Game genres" />}
              onChangeItems={value => this.handleField('genres', value)}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <div className="text-right pt-10">
          <Button
            type="reset"
            color="default"
            variant="contained"
            className="bg-red text-red-100 mr-5"
            disabled={disabled}
          >
            <Translate name="Reset" />
          </Button>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={disabled}
          >
            <Translate name="Search" />
          </Button>
        </div>
      </form>
    )
  }
}