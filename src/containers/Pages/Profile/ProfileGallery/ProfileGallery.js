import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../Profile';
import ProfileGalleryUpload from './ProfileGalleryUpload/ProfileGalleryUpload';
import ProfileGalleryList from "./ProfileGalleryList/ProfileGalleryList";
import { Grid, LinearProgress } from "@material-ui/core/es/index";
import Translate from "../../../Translate/Translate";
import Alert from "../../../../components/UI/Alert/Alert";

@connect(
  state => ({
    list: state.profileGalleryList,
    upload: state.profileGalleryUpload
  })
)
export default class ProfileGallery extends Component {
  render() {
    const { list, upload } = this.props;

    return (
      <Profile>
        <Grid
          container
          justify="space-between"
          direction="row"
          alignItems="center"
          className="mb-25"
        >
          <Grid item>
            {!list.loader ? (
              <div>
                <Translate>Total</Translate>:&nbsp;
                {list.models.length === list.total ? null : list.models.length + ' / '}
                {list.total}
              </div>
            ) : null}
          </Grid>
          <Grid item>
            {/* Upload images */}
            <ProfileGalleryUpload />
          </Grid>
        </Grid>

        {upload.loader ? (
          <Alert type="info" className="my-15">
            <div className="mb-10">
              <Translate>Uploading photos...</Translate>
            </div>
            <LinearProgress color="secondary" />
          </Alert>
        ) : null}

        <ProfileGalleryList />
      </Profile>
    )
  }
}