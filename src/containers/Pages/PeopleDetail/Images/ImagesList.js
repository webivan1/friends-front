import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridList from "@material-ui/core/GridList/GridList";
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import { fetchList, clearList } from "../../../../store/actions/user-detail/images/imagesListAction";
import Button from "@material-ui/core/es/Button/Button";
import Translate from "../../../Translate/Translate";
import { withStyles } from "@material-ui/core/styles";
import ImagesItem from "./ImagesItem";

@withStyles(theme => ({
  heading: {
    ...theme.typography.h5,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3
  }
}))
@connect(
  state => ({
    ...state.imagesList,
    lang: state.translate.locale,
    device: state.mobileDetect.device
  }),
  dispatch => ({
    fetchModels: url => dispatch(fetchList(url)),
    clearList: () => dispatch(clearList()),
  })
)
export default class ImagesList extends Component {
  componentWillMount() {
    this.props.fetchModels(`/people/${this.props.userId}/gallery`);
  }

  componentWillUnmount() {
    this.props.clearList();
  }

  handleLoadMore() {
    this.props.fetchModels(this.props.nextPageUrl);
  }

  render() {
    const {
      models, loaderList, totalItems,
      nextPageUrl, device, classes
    } = this.props;

    return (
      <React.Fragment>
        <div className={classes.heading}>
          <Translate name="Photos (:total)" params={{ total: totalItems }} />
        </div>

        <GridList cellHeight={180} cols={device.getValueByData({
          xs: 2, sm: 3, md: 3, lg: 4
        })}>
          {models.map((item, index) => (
            <GridListTile key={index} cols={1}>
              <ImagesItem {...item} images={models} />
            </GridListTile>
          ))}
        </GridList>

        {nextPageUrl ? (
          <div className="text-center mt-15">
            <Button
              disabled={loaderList}
              color="primary"
              onClick={() => this.handleLoadMore()}
            >
              <Translate name="Show more" />
            </Button>
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}