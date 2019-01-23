import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Add, Remove } from '@material-ui/icons';
import Translate from "@/containers/Translate/Translate";
import UploadButton from "@/components/UI/UploadButton/UploadButton";
import { uploadPhotos } from "@/store/actions/profile/profile-gallery/profileGalleryUploadAction";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core/es/index";

@connect(
  state => state.profileGalleryUpload,
  dispatch => ({
    uploadPhotos: images => dispatch(uploadPhotos(images)),
  })
)
export default class ProfileGalleryUpload extends Component {

  state = {
    chooseImage: false,
    images: []
  };

  extImages = ['jpeg', 'jpg', 'png', 'gif'];

  addImage(file) {
    this.setState(state => {
      state.images.push(file);

      if (!state.chooseImage) {
        state.chooseImage = true;
      }

      return state;
    });
  }

  removeImage(index) {
    this.setState(state => {
      state.images.splice(index, 1);

      if (state.images.length === 0) {
        state.chooseImage = false;
      }

      return state;
    });
  }

  loadImages(event) {
    [].forEach.call(event.target.files, file => {
      const ext = file.name.substr(file.name.lastIndexOf('.') + 1);

      if (!this.extImages.some(item => item === ext.toLowerCase())) {
        return false;
      }

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => this.addImage({
        file: file,
        name: file.name,
        image: reader.result
      });
      reader.onerror = error => console.error(error);
    });
  }

  handleClose() {
    this.setState({ images: [], chooseImage: false });
  }

  uploadHandler() {
    this.props.uploadPhotos(this.state.images);
    this.handleClose();
  }

  render() {
    const { loader, success, error } = this.props;
    const { chooseImage, images } = this.state;

    return (
      <div>
        <UploadButton
          multiple={true}
          disabled={chooseImage || loader}
          onChange={this.loadImages.bind(this)}
        >
          <Add /> &nbsp; <Translate>Add photos</Translate>
        </UploadButton>

        <Dialog
          open={chooseImage}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <GridList cellHeight={200}>
              {images.map((image, index) => (
                <GridListTile key={index} cols={1}>
                  <img src={image.image} alt={image.name} />
                  <GridListTileBar
                    title={<Translate>Remove image</Translate>}
                    titlePosition="top"
                    actionIcon={
                      <IconButton
                        disabled={loader}
                        onClick={() => this.removeImage(index)}
                      >
                        <Remove />
                      </IconButton>
                    }
                    actionPosition="left"
                  />
                </GridListTile>
              ))}
            </GridList>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose.bind(this)}
              color="secondary"
            >
              <Translate>Cancel</Translate>
            </Button>
            <Button
              color="primary"
              onClick={this.uploadHandler.bind(this)}
            >
              <Translate>Upload</Translate>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}