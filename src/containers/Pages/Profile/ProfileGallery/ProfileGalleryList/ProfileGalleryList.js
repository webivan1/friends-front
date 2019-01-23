import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  addModels,
  getModelsAction
} from "../../../../../store/actions/profile/profile-gallery/profileGalleryListAction";
import { GridList, GridListTile } from "@material-ui/core/es/index";
import ProfileGalleryItem from "../ProfileGalleryItem/ProfileGalleryItem";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Refresh from '@material-ui/icons/Refresh';

@connect(
  state => ({
    ...state.profileGalleryList,
    device: state.mobileDetect.device
  }),
  dispatch => ({
    getModels: () => dispatch(getModelsAction()),
    updateList: (models, total) => dispatch(addModels([], models, total))
  })
)
export default class ProfileGalleryList extends Component {

  fetch() {
    this.props.getModels();
  }

  componentDidMount() {
    if (this.props.loader) {
      this.fetch();
    }
  }

  handleDeleteItem(deleteId) {
    const models = this.props.models.filter(({ id }) => +id !== +deleteId);
    this.props.updateList(models, this.props.total - 1);
  }

  render() {
    const { models, device } = this.props;

    return (
      <div>
        <div className="mb-15 text-right">
          <IconButton
            className="mr-10"
            onClick={this.fetch.bind(this)}
            disabled={this.props.loader}
            color="primary"
          >
            <Refresh />
          </IconButton>
        </div>

        <GridList cellHeight={210} cols={device.getValueByData({
          xs: 2, sm: 3, md: 4, lg: 5
        })}>
          {models.map((image, key) => (
            <GridListTile key={key} cols={1}>
              <ProfileGalleryItem
                {...image}
                onDeleteFromList={id => this.handleDeleteItem(id)}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}