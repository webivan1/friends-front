import { Component } from "react";
import PropTypes from "prop-types";
import React from "react";
import { Grid, TextField } from "@material-ui/core";
import Range from "rc-slider/es/Range";

import 'rc-slider/assets/index.css';

export default class FieldRange extends Component {

  static propTypes = {
    labels: PropTypes.shape({
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired
    }),
    rules: PropTypes.array.isRequired,
    defaultValue: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  state = {
    min: 0,
    max: 0
  };

  timer = null;

  componentWillMount() {
    const [min, max] = this.props.defaultValue;
    this.setState({ min, max });
  }

  clearTimer() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  handleChangeField(state, value) {
    this.setState({ [state]: value ? value : 0 })
  }

  handleMin(value) {
    const [minRules] = this.props.rules;
    const [, maxValue] = this.props.values;

    if (this.timer) {
      this.clearTimer();
    }

    this.timer = setTimeout(() => {
      value = value < minRules ? minRules : value;
      value = value > maxValue ? maxValue : value;

      this.handleChange(value, maxValue);
      clearTimeout(this.timer);
    });
  }

  handleMax(value) {
    const [ , maxRules ] = this.props.rules;
    const [ minValue ] = this.props.values;

    if (this.timer) {
      this.clearTimer();
    }

    this.timer = setTimeout(() => {
      value = value > maxRules ? maxRules : value;
      value = value < minValue ? minValue : value;

      this.handleChange(minValue, value);
      clearTimeout(this.timer);
      this.timer = null;
    });
  }

  handleChange(min, max) {
    this.setState({ min, max });
    this.props.onChange(min, max);
  }

  render() {
    const { labelFrom, labelTo, values, rules, defaultValue } = this.props;
    const { min, max } = this.state;
    const [ minRule, maxRule ] = rules;

    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={labelFrom}
              value={min}
              margin="normal"
              variant="outlined"
              className="mb-0"
              onChange={event => this.handleChangeField('min', +event.target.value)}
              onBlur={event => this.handleMin(+event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={labelTo}
              value={max}
              margin="normal"
              variant="outlined"
              className="mb-0"
              onChange={event => this.handleChangeField('max', +event.target.value)}
              onBlur={event => this.handleMax(+event.target.value)}
            />
          </Grid>
        </Grid>
        <Range
          min={minRule}
          max={maxRule}
          className="py-0"
          allowCross={false}
          value={values}
          defaultValue={defaultValue}
          onChange={([minValue, maxValue]) => this.handleChange(minValue, maxValue)}
        />
      </React.Fragment>
    )
  }
}