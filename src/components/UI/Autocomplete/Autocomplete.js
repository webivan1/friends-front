import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

const renderInput = inputProps => {
  const { InputProps, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps,
      }}
      {...other}
    />
  );
};

const renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
};

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

const getSuggestions = (value, items, selectedValues) => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;

  if (inputLength === 0) {
    return [];
  }

  let count = 0;

  return items.filter(suggestion => {
    if (selectedValues.indexOf(suggestion) >= 0) {
      return false;
    }

    const keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
    keep && count++;
    return keep;
  });
};

@withStyles(theme => ({
  input: {
    '& > div': {
      display: 'block',
      '& input': {
        display: 'inline-flex',
        maxWidth: '100px'
      }
    }
  }
}))
export default class Autocomplete extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.any.isRequired,
    onChangeItems: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    variant: PropTypes.string
  };

  state = {
    inputValue: ''
  };

  handleKeyDown = event => {
    const { values, onChangeItems } = this.props;
    const { inputValue } = this.state;

    if (values.length && !inputValue.length && keycode(event) === 'backspace') {
      onChangeItems(values.slice(0, values.length - 1));
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    const { values, onChangeItems } = this.props;
    let newValue = [...values];

    if (!newValue.some(({ value }) => value === item.value)) {
      newValue.push(item);
    }

    this.setState({ inputValue: '' }, () => {
      onChangeItems(newValue);
    });
  };

  handleDelete = item => () => {
    const { values, onChangeItems } = this.props;
    let newValues = [...values];

    if (newValues.some(row => row.value === item.value)) {
      newValues = newValues.filter(({ value }) => value !== item.value);
    }

    onChangeItems(newValues);
  };

  render() {
    const { items, values, placeholder, label, disabled, variant, classes } = this.props;
    const { inputValue } = this.state;

    return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={values}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => (
          <div>
            {renderInput({
              disabled,
              fullWidth: true,
              variant: variant ? variant : 'standard',
              margin: 'normal',
              className: classes.input,
              InputProps: getInputProps({
                startAdornment: values.map(item => (
                  <Chip
                    disabled={disabled}
                    key={item.value}
                    tabIndex={-1}
                    label={item.label}
                    className="my-7 mr-7"
                    color="primary"
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder
              }),
              label,
            })}
            {isOpen ? (
              <Paper square>
                {getSuggestions(inputValue2, items, selectedItem2).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                  })
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}