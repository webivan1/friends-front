import React from 'react';
import { YMaps, Map, Circle } from 'react-yandex-maps';
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";

const UserMap = ({ lat, long, location, lang }) => (
  <React.Fragment>
    <Paper className="px-8 py-8 mb-8">
      <Typography component="p">
        {location.map(item => item.language === lang ? item.address : null)}
      </Typography>
    </Paper>
    <Paper>
      <YMaps>
        <Map
          style={{width: '100%', height: '320px'}}
          className="mb-25"
          defaultState={{ center: [lat, long], zoom: 14 }}
        >
          <Circle
            geometry={[[lat, long], 500]}
            options={{
              strokeColor: '#166299',
              strokeOpacity: 0.8,
              strokeWidth: 2,
            }}
          />
        </Map>
      </YMaps>
    </Paper>
  </React.Fragment>
);

export default UserMap;