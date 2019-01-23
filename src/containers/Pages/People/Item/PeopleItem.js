import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
} from '@material-ui/core/es/index';
import { Carousel } from 'react-responsive-carousel';
import env from '@/env/env';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import PersonPinCircle from '@material-ui/icons/PersonPinCircle';
import Translate from '@/containers/Translate/Translate';
import InviteToFriend from '@/containers/InviteToFriend/InviteToFriend';
import IsOnlineUser from '@/containers/OnlineUser/IsOnlineUser';
import ImageHelper from "@/helpers/ImageHelper";

const styles = theme => ({
  image: {
    height: '400px',
    backgroundPosition: 'center center'
  },
  avatarLabel: {
    color: theme.palette.primary.main
  }
});

@withRouter
@withStyles(styles)
@connect(
  state => ({ user: state.user })
)
export default class PeopleItem extends Component {

  isInvite() {
    const { id, user, all_invitations } = this.props;
    all_invitations.map(item => +item);

    return !user.isGuest && +user.user.id !== +id && all_invitations.indexOf(+user.user.id) === -1;
  }

  render() {
    const {
      id, coordinates, games, profile, images, name, lang, classes, user
    } = this.props;

    if (images.length === 0) {
      images.push({
        list: '/storage/images/400.png',
        origin: '/storage/images/400.png',
      })
    }

    const labelName = (
      <IsOnlineUser userId={id}>
        <PersonPinCircle className="online-user-detect-icon" />
        <span>{name}, {profile.age}</span>
      </IsOnlineUser>
    );

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatarLabel}>
              {name[0].toUpperCase()}
            </Avatar>
          }
          title={labelName}
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
                image={ImageHelper.url(image.list)}
              />
            </div>
          ))}
        </Carousel>
        <CardActions className="text-right">
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`/${lang}/people/${id}`}
          >
            <Translate name="More" />
          </Button>

          {!this.isInvite() ? null : (
            <InviteToFriend
              fromUser={+user.user.id}
              toUser={+id}
            >
              <Button
                size="small"
                color="primary"
              >
                <Translate name="Send invite" />
              </Button>
            </InviteToFriend>
          )}
        </CardActions>
      </Card>
    )
  }
}