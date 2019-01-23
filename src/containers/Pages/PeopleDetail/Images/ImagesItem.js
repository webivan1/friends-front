import React, { Component } from 'react';
import Dialog from "@material-ui/core/Dialog/Dialog";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Close from '@material-ui/icons/Close';
import { Carousel } from "react-responsive-carousel";
import Container from "../../../../components/UI/Container/Container";
import ImageHelper from "@/helpers/ImageHelper";

export default class ImagesItem extends Component {

  state = {
    open: false,
  };

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  selectedItem() {
    const { id, images } = this.props;
    const result = images.find(item => +item.id === +id);
    return images.indexOf(result);
  }

  render() {
    const { url, images } = this.props;

    return (
      <React.Fragment>
        <img src={ImageHelper.url(url)} alt="" onClick={this.handleOpen.bind(this)} />

        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
        >
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose.bind(this)}
                aria-label="Close"
              >
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>

          <div className="pt-75">
            <Container>
              <Carousel
                emulateTouch
                centerMode={images.length > 1}
                showThumbs={true}
                showArrows={true}
                showIndicators={true}
                showStatus={false}
                dynamicHeight={false}
                centerSlidePercentage={90}
                selectedItem={this.selectedItem()}
              >
                {images.map(({ origin }, index) => (
                  <div key={index}>
                    <img src={ImageHelper.url(origin)} alt="" />
                  </div>
                ))}
              </Carousel>
            </Container>
          </div>
        </Dialog>

      </React.Fragment>
    )
  }
}