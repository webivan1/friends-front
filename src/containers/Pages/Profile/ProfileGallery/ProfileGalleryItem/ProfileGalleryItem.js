import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  GridListTileBar,
  IconButton, LinearProgress
} from "@material-ui/core/es/index";
import { Edit } from '@material-ui/icons';
import Translate from "../../../../Translate/Translate";
import { withStyles } from '@material-ui/core/styles';
import { fetchById, deleteItem, updateItem } from "../../../../../store/actions/profile/profile-gallery/profileGalleryItemAction";
import ProfileGalleryItemForm from "./ProfileGalleryItemForm";
import ImageHelper from "@/helpers/ImageHelper";

const styles = theme => ({
  image: {
    maxWidth: '100%'
  }
});

@withStyles(styles)
@connect(
  state => state.profileGalleryItem,
  dispatch => ({
    fetchDetailItem: id => dispatch(fetchById(id)),
    onDeleteItem: id => dispatch(deleteItem(id)),
    onUpdateItem: (formData, id) => dispatch(updateItem(formData, id))
  })
)
export default class ProfileGalleryItem extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    onDeleteFromList: PropTypes.func.isRequired
  };

  state = {
    open: false
  };

  handlerEdit() {
    this.setState({ open: true }, () => {
      this.props.fetchDetailItem(this.props.id);
    });
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleUpdate(formData) {
    this.props.onUpdateItem(formData, this.props.id).then(() => {
      //... close popup ?
    });
  }

  handleDelete() {
    this.handleClose();
    this.props.onDeleteFromList(this.props.id);
    this.props.onDeleteItem(this.props.id);
  }

  render() {
    const {
      url, origin, classes, loader,
      loaderSubmit, form, error, success
    } = this.props;
    const { open } = this.state;

    return (
      <div>
        <img className={classes.image} src={ImageHelper.url(url)} />

        <GridListTileBar
          title={<Translate>Edit photo</Translate>}
          titlePosition="top"
          actionIcon={
            <IconButton onClick={this.handlerEdit.bind(this)}>
              <Edit />
            </IconButton>
          }
          actionPosition="right"
        />

        <Dialog
          open={open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          scroll="body"
        >
          <DialogContent>
            <img className={classes.image} src={ImageHelper.url(origin)} />

            {loader ? <LinearProgress color="secondary" /> : (
              <ProfileGalleryItemForm
                loaderSubmit={loaderSubmit}
                form={form}
                error={error}
                success={success}
                onClose={() => this.handleClose()}
                onUpdate={data => this.handleUpdate(data)}
                onDelete={() => this.handleDelete()}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}