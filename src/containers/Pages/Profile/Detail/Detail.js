import React, { Component } from 'react';
import { connect } from 'react-redux';
import { init } from "../../../../store/actions/profile/profile-detail/profileDetailAction";
import LinearProgress from '@material-ui/core/LinearProgress';
import ProfileDetailForm from './ProfileDetailForm/ProfileDetailForm';
import Container from "../../../../components/UI/Container/Container";
import Alert from "../../../../components/UI/Alert/Alert";
import Profile from "../Profile";

@connect(
  state => state.profileDetailPage,
  dispatch => ({
    onInit: () => dispatch(init())
  })
)
export default class Detail extends Component {
  componentDidMount() {
    if (this.props.init === false) {
      this.props.onInit();
    }
  }
  
  render() {
    const { init, error, data, labels } = this.props;

    return (
      <Profile>
        {
          init === false
            ? <LinearProgress />
            : <ProfileDetailForm data={data} labels={labels} />
        }

        { error ? <Alert type="danger">{error}</Alert> : null }
      </Profile>
    )
  }
}