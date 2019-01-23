import React, { Component } from 'react';
import { Avatar, Card, CardActions, CardHeader, CardMedia } from "@material-ui/core/es";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Translate from "../../Translate/Translate";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import env from "../../../env/env";
import Button from "../../../components/UI/Buttons/Button";
import { translate } from '../../../store/actions/translate/translateAction';
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import { inviteItemControlAction } from "../../../store/actions/friends/inviteItemControlAction";

const styles = theme => ({
  image: {
    height: '400px',
    backgroundPosition: 'center center'
  },
  avatarLabel: {
    color: theme.palette.primary.main
  },
  buttons: {
    justifyContent: 'space-between'
  }
});

@withStyles(styles)
@connect(
  state => ({ lang: state.translate.locale, ...state.inviteItemControl }),
  dispatch => ({
    accept: inviteId => dispatch(inviteItemControlAction.accept(inviteId)),
    refuse: inviteId => dispatch(inviteItemControlAction.refuse(inviteId))
  })
)
export default class InviteItem extends Component {

  handleRefuse() {
    if (!confirm(translate('Are you sure?'))) {
      return false;
    }

    this.props.refuse(this.props.invite.id);
  }

  handleAccept() {
    this.props.accept(this.props.invite.id);
  }

  render() {
    const {
      id, lang, classes, name, profile, coordinates, images, invite, loader
    } = this.props;

    if (images.length === 0) {
      images.push({
        list: env.mediaUrl + '/images/400.png',
        origin: env.mediaUrl + '/images/400.png',
      })
    }

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatarLabel}>
              {name[0].toUpperCase()}
            </Avatar>
          }
          title={`${name}, ${profile.age}`}
          subheader={
            coordinates
              ? coordinates.location.map(({ language, address }) => language === lang ? address : null)
              : null
          }
        />
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
                image={image.list}
              />
            </div>
          ))}
        </Carousel>
        <CardContent>
          <Typography>
            {invite ? invite.message : null}
          </Typography>
        </CardContent>
        <CardActions className={classes.buttons}>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`/${lang}/people/${id}`}
            disabled={loader}
          >
            <Translate name="More" />
          </Button>

          <div>
            <Button
              variant="contained"
              size="small"
              typeColor="green"
              className="mr-5"
              onClick={this.handleAccept.bind(this)}
              disabled={loader}
            >
              <Translate name="Accept" />
            </Button>

            <Button
              variant="contained"
              size="small"
              typeColor="red"
              onClick={this.handleRefuse.bind(this)}
              disabled={loader}
            >
              <Translate name="Refuse" />
            </Button>
          </div>
        </CardActions>
      </Card>
    )
  }
}