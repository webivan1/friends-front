import {
  PROFILE_LOCATION_FETCH_COMPLETED,
  PROFILE_LOCATION_UPDATE,
  PROFILE_LOCATION_UPDATED
} from "../../actionTypes";
import axios from '../../../../axios/axios-api';
import FetchService from "../../../../services/fetch/FetchService";
import env from '../../../../env/env';

export function fetchLocation() {
  return async dispatch => {
    let coordinates = [];
    let locations = [];

    try {
      const { data } = await FetchService.http(axios).get(`/user/form/location`);

      if (data) {
        coordinates = [data.lat, data.long];
        locations = data.location;
      }
    } catch (e) {
      console.error(e);
    }

    dispatch(fetchCompleted(coordinates, locations));
  }
}

export function updateLocation(lat, long) {
  return (dispatch, getState) => {
    dispatch(updateLoader());

    const { languages } = getState().translate;

    const promises = [];

    languages.forEach(({ lang }) => {
      promises.push(fetchGeoByCoords(lat, long, lang));
    });

    Promise.all([...promises]).then(async locations => {
      try {
        const { data } = await FetchService.http(axios).post(`/user/form/location`, {
          lat, long, locations
        });
      } catch (e) {
        console.error(e);
      }

      dispatch(updated([lat, long], locations));
    });
  }
}

function fetchGeoByCoords(lat, long, language) {
  const url = `https://geocode-maps.yandex.ru/1.x/?kind=locality&format=json&apiKey=${env.yandexApiKey}&geocode=${long},${lat}&lang=${language}`;
  const http = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    http.open('get', url, true);
    http.onload = () => {
      try {
        const data = JSON.parse(http.responseText);

        const geoObject = data.response.GeoObjectCollection.featureMember[0].GeoObject;
        const addressDetail = geoObject.metaDataProperty.GeocoderMetaData;
        const address = addressDetail.text;
        const country = addressDetail.AddressDetails.Country.CountryName;
        const city = addressDetail.AddressDetails.Country.AdministrativeArea.Locality.LocalityName;

        resolve({ language, country, city, address });
      } catch (e) {
        reject(e);
      }
    };

    http.send();
  });
}

function updated(coordinates, locations) {
  return { type: PROFILE_LOCATION_UPDATED, payload: {
    coordinates, locations
  } }
}

function updateLoader() {
  return { type: PROFILE_LOCATION_UPDATE };
}

function fetchCompleted(coordinates, locations) {
  return { type: PROFILE_LOCATION_FETCH_COMPLETED, payload: {
    coordinates, locations
  } }
}