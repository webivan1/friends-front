import React, { Component } from 'react';
import { Button, Menu, MenuItem } from "@material-ui/core";
import Translate from "@/containers/Translate/Translate";
import { withStyles } from '@material-ui/core/styles';
import { SortByAlpha } from '@material-ui/icons'

const styles = theme => ({
  activeItemMenu: {
    backgroundColor: theme.palette.primary.main,
    color: 'black',
    '&:hover': {
      backgroundColor: theme.palette.primary[600],
      color: 'black',
    }
  }
});

@withStyles(styles)
export default class SortLinks extends Component {

  state = {
    element: null
  };

  handleOpen = event => {
    this.setState({ element: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ element: null })
  };

  handleSort(data) {
    this.handleClose();
    this.props.onChangeSort(data);
  }

  render() {
    const { element } = this.state;
    const { attributes, disabled, classes } = this.props;

    return (
      <React.Fragment>
        <Button
          disabled={disabled}
          aria-owns={element ? 'sort-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleOpen}
          color="primary"
          variant="contained"
        >
          <SortByAlpha className="mr-5" /> {attributes.map(({ active, label }, index) => {
          return active ? <Translate key={index} name={label} /> : null
        })}
        </Button>

        <Menu
          id="sort-menu"
          anchorEl={element}
          open={Boolean(element)}
          onClose={this.handleClose}
        >
          {attributes.map((item, index) => {
            return (
              <MenuItem
                key={index}
                onClick={() => this.handleSort(item)}
                className={item.active ? classes.activeItemMenu : ''}
              >
                <Translate>{item.label}</Translate>
              </MenuItem>
            )
          })}
        </Menu>
      </React.Fragment>
    )
  }
}