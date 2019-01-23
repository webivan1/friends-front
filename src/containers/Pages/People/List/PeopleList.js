import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pagination from '@/components/UI/Pagination/Pagination';
import {
  fetchModels,
  replacePage
} from "@/store/actions/people/peopleListAction";
import { Grid } from "@material-ui/core/es/index";
import PeopleItem from "@/containers/Pages/People/Item/PeopleItem";
import Container from "@/components/UI/Container/Container";
import SortLinks from "@/components/UI/SortLinks/SortLinks";
import PeopleSearch from "@/containers/Pages/People/Search/PeopleSearch";
import { Button } from "@material-ui/core";
import { Search } from '@material-ui/icons'
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Refresh from '@material-ui/icons/Refresh';

@withRouter
@connect(
  state => ({ lang: state.translate.locale, ...state.peopleList }),
  dispatch => ({
    fetchModels: (url, formData) => dispatch(fetchModels(url, formData)),
  })
)
export default class PeopleList extends Component {

  state = {
    searchFormShow: false
  };

  fetch() {
    this.props.fetchModels('/people');
  }

  componentWillMount() {
    if (this.props.loaderList) {
      this.fetch();
    }
  }

  handleToggleShowSearch = () => {
    this.setState({ searchFormShow: !this.state.searchFormShow });
  };

  handlePagination(page) {
    const { formData, firstPageUrl } = this.props;
    this.props.fetchModels(replacePage(firstPageUrl, page), formData);
  }

  handleSort(sort) {
    this.props.fetchModels(sort.url, this.props.formData);
  }

  handleSearchForm(data) {
    this.handleToggleShowSearch();
    this.props.fetchModels(replacePage(this.props.url, 1), data);
  }

  render() {
    const {
      loaderList, models, totalItems, params,
      perPage, currentPage, lang, sortAttributes, formData
    } = this.props;

    return (
      <Container>
        <div className="mb-15 text-right">
          <IconButton
            className="mr-10"
            onClick={this.fetch.bind(this)}
            disabled={loaderList}
            color="primary"
          >
            <Refresh />
          </IconButton>

          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleToggleShowSearch}
            disabled={loaderList}
          >
            <Search />
          </Button>

          <SortLinks
            attributes={sortAttributes}
            disabled={loaderList}
            onChangeSort={data => this.handleSort(data)}
          />
        </div>

        {Object.keys(params).length > 0 && this.state.searchFormShow ? (
          <div className="mb-15">
            <PeopleSearch
              {...params}
              data={formData}
              disabled={loaderList}
              onSubmit={data => this.handleSearchForm(data)}
            />
          </div>
        ) : null}

        <Grid container spacing={16}>
          {models.map((item, index) => (
            <Grid item md={4} sm={6} xs={12} key={index}>
              <PeopleItem {...item} lang={lang} />
            </Grid>
          ))}
        </Grid>

        <div className="py-25">
          <Pagination
            limit={perPage}
            currentPage={currentPage}
            total={totalItems}
            disabled={loaderList}
            centerRipple={true}
            size="large"
            onClick={(e, page) => this.handlePagination(page)}
          />
        </div>
      </Container>
    )
  }
}