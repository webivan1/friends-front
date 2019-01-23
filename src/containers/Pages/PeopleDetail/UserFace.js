import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Paper from "@material-ui/core/es/Paper/Paper";
import { CardMedia } from "@material-ui/core/es";
import ImageHelper from "@/helpers/ImageHelper";

const UserFace = ({ images }) => (
  <Paper>
    <Carousel
      emulateTouch
      centerMode={images.length > 1}
      showThumbs={false}
      showArrows={false}
      showIndicators={false}
      showStatus={false}
      dynamicHeight={true}
      centerSlidePercentage={90}
    >
      {images.map((image, index) => (
        <div key={index}>
          <CardMedia
            component="img"
            image={ImageHelper.url(image.list)}
          />
        </div>
      ))}
    </Carousel>
  </Paper>
);

export default UserFace;