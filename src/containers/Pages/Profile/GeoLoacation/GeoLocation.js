import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from "../Profile";
import { Button } from "@material-ui/core/es/index";
import { YMaps, Map, Circle } from 'react-yandex-maps';
import { LinearProgress } from "@material-ui/core/es/index";
import Translate from "../../../Translate/Translate";
import {
  fetchLocation,
  updateLocation
} from "../../../../store/actions/profile/profile-location/profileLocationAction";

@connect(
  state => ({
    lang: state.translate.locale,
    languages: state.translate.languages,
    ...state.profileLocation
  }),
  dispatch => ({
    fetch: () => dispatch(fetchLocation()),
    update: (lat, long) => dispatch(updateLocation(lat, long))
  })
)
export default class GeoLocation extends Component {
  componentDidMount() {
    if (this.props.fetchLoader) {
      this.props.fetch();
    }
  }

  handleGetLocation() {
    window.navigator.geolocation.getCurrentPosition(position => {
      this.props.update(position.coords.latitude, position.coords.longitude);
    });
  }

  render() {
    const { coordinates, locations, fetchLoader, updateLoader, lang } = this.props;

    let content = null;

    if (fetchLoader === true) {
      content = <LinearProgress />
    } else {
      content = (
        <div>
          {coordinates.length ? (
            <div>
              <p>
                <Translate>Address</Translate>: &nbsp;
                {locations.map((item, index) => {
                  if (item.language === lang) {
                    return <span key={index}>{item.address}</span>
                  }
                })}
              </p>

              <YMaps>
                <Map
                  style={{width: '100%', height: '300px'}}
                  className="mb-25"
                  defaultState={{ center: coordinates, zoom: 14 }}
                >
                  <Circle
                    geometry={[coordinates, 500]}
                    options={{
                      strokeColor: '#166299',
                      strokeOpacity: 0.8,
                      strokeWidth: 2,
                    }}
                  />
                </Map>
              </YMaps>
            </div>
          ) : null}

          <Button
            disabled={updateLoader}
            type="primary"
            onClick={this.handleGetLocation.bind(this)}
          >
            {
              coordinates.length
                ? <Translate>Update location</Translate>
                : <Translate>Add location</Translate>
            }
          </Button>
        </div>
      );
    }

    return (
      <Profile>
        {content}
      </Profile>
    )
  }
}