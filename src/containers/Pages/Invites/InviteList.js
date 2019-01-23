import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchModels } from "../../../store/actions/friends/inviteListAction";
import SortLinks from "../../../components/UI/SortLinks/SortLinks";
import { Grid } from "@material-ui/core/es";
import Button from "@material-ui/core/es/Button/Button";
import Translate from "../../Translate/Translate";
import { replacePage } from "../../../store/actions/people/peopleListAction";
import InviteItem from "./InviteItem";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Refresh from '@material-ui/icons/Refresh';

@connect(
  state => state.inviteList,
  dispatch => ({
    fetchModels: (url, append) => dispatch(fetchModels(url, append)),
  })
)
export default class InviteList extends Component {

  fetchUrl = '/user/friend/invite-list';

  fetch() {
    this.props.fetchModels(this.fetchUrl);
  }

  componentWillMount() {
    if (this.props.loaderList) {
      this.fetch();
    }
  }

  handleLoadMore() {
    this.props.fetchModels(this.props.nextPageUrl, true);
  }

  handleSort({ url }) {
    this.props.fetchModels(replacePage(url, 1), false);
  }

  render() {
    const { sortAttributes, loaderList, models, nextPageUrl } = this.props;

    return (
      <div>
        <div className="text-right mb-25">
          <IconButton
            className="mr-10"
            onClick={this.fetch.bind(this)}
            disabled={loaderList}
            color="primary"
          >
            <Refresh />
          </IconButton>

          <SortLinks
            attributes={sortAttributes}
            disabled={loaderList}
            onChangeSort={data => this.handleSort(data)}
          />
        </div>

        <Grid container spacing={16}>
          {models.map((item, index) => (
            <Grid item md={4} sm={6} xs={12} key={index} >
              <InviteItem {...item} />
            </Grid>
          ))}
        </Grid>

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
      </div>
    )
  }
}