import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from "../Profile";
import {
  fetchGames,
  updateGames,
  changeGames
} from "../../../../store/actions/profile/profile-games/profileGamesAction";
import Autocomplete from "../../../../components/UI/Autocomplete/Autocomplete";
import { Button, Grid } from "@material-ui/core/es/index";
import Translate from "../../../Translate/Translate";
import Alert from "../../../../components/UI/Alert/Alert";

@connect(
  state => state.profileGames,
  dispatch => ({
    fetchGames: () => dispatch(fetchGames()),
    updateGames: listGames => dispatch(updateGames(listGames)),
    onChangeValues: values => dispatch(changeGames(values))
  })
)
export default class ProfileGames extends Component {

  componentDidMount() {
    const { fetchLoader } = this.props;

    if (fetchLoader) {
      this.props.fetchGames();
    }
  }

  handleUpdateValues() {
    this.props.updateGames(this.props.myGames);
  }

  render() {
    const {
      allGames, myGames, fetchLoader, updateLoader, success, error
    } = this.props;

    return (
      <Profile>
        <Grid justify="center" container spacing={0}>
          <Grid item md={8} xs={12}>
            {fetchLoader ? 'loading...' : (
              <div>
                <Autocomplete
                  disabled={updateLoader}
                  items={allGames}
                  values={myGames}
                  placeholder="Choose game"
                  label={<Translate>My games</Translate>}
                  onChangeItems={values => this.props.onChangeValues(values)}
                />

                {success ? <Alert className="mt-15" type="success">{success}</Alert> : null}
                {error ? <Alert className="mt-15" type="danger">{error}</Alert> : null}

                <div className="pt-25 text-right">
                  <Button
                    disabled={updateLoader}
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleUpdateValues()}
                  >
                    <Translate>Save</Translate>
                  </Button>
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </Profile>
    )
  }
}