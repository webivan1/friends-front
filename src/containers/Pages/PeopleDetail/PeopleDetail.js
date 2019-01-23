import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  fetchInfo,
  clearInfo
} from "../../../store/actions/user-detail/userDetailAction";
import Container from "../../../components/UI/Container/Container";
import Alert from "../../../components/UI/Alert/Alert";
import Typography from "@material-ui/core/es/Typography/Typography";
import { Grid } from "@material-ui/core";
import UserFace from "./UserFace";
import UserMap from "./UserMap";
import List from "../../../components/UI/List/List";
import ListItem from "../../../components/UI/List/ListItem";
import Translate from "../../Translate/Translate";
import Paper from "@material-ui/core/es/Paper/Paper";
import Chip from "@material-ui/core/Chip/Chip";
import ImagesList from "./Images/ImagesList";
import IsOnlineUser from "@/containers/OnlineUser/IsOnlineUser";
import PersonPinCircle from "@material-ui/icons/PersonPinCircle";

@withRouter
@withStyles(theme => ({
  leftContainer: {
    maxWidth: '320px',
    marginBottom: theme.spacing.unit * 2
  },
  widthContainer: {
    width: '100%'
  }
}))
@connect(
  state => ({ lang: state.translate.locale, detail: state.userDetail }),
  dispatch => ({
    fetchInfo: id => dispatch(fetchInfo(id)),
    clearInfo: () => dispatch(clearInfo())
  })
)
export default class PeopleDetail extends Component {

  componentWillMount() {
    const id = +this.props.match.params.id;
    this.props.fetchInfo(id);
  }

  componentWillUnmount() {
    this.props.clearInfo();
  }

  renderProfileList(label, value, labelItems) {
    const [ labelItem ] = labelItems.filter(({ key }) => key === value);

    return !labelItem ? null : (
      <ListItem
        label={<Translate name={label} />}
        value={<Translate name={labelItem.value} />}
      />
    );
  }

  render() {
    const { classes, detail, lang } = this.props;
    const { info, loaderInfo, error } = detail;

    if (loaderInfo) {
      return null;
    }

    return (
      <Container>
        {error ? <Alert type="danger">{error}</Alert> : (
          <React.Fragment>
            <Grid container spacing={40}>
              <Grid item>
                <div className={classes.leftContainer}>
                  <UserFace images={info.images} />
                </div>
                {info.coordinates ? (
                  <div className={classes.leftContainer}>
                    <UserMap {...info.coordinates} lang={lang} />
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm container>
                <div className={classes.widthContainer}>
                  <Typography component="h1" variant="h4" gutterBottom className="mb-40">
                    <IsOnlineUser userId={info.id}>
                      <PersonPinCircle className="online-user-detect-icon" />
                    </IsOnlineUser>
                    {info.name}
                  </Typography>

                  <div className="mb-25">
                    <List>
                      <ListItem
                        label={<Translate name="Age" />}
                        value={<Translate name=":age years" params={{ age: info.profile.age }} />}
                      />
                      {this.renderProfileList('Gender', info.profile.gender, info.labels.gender)}
                      {this.renderProfileList('Orientation', info.profile.orientation, info.labels.orientation)}
                      {this.renderProfileList('Body type', info.profile.body_type, info.labels.body)}
                      <ListItem
                        label={<Translate name="Height" />}
                        value={<Translate name=":height sm" params={{ height: info.profile.height }} />}
                      />
                      <ListItem
                        label={<Translate name="Weight" />}
                        value={<Translate name=":weight kg" params={{ weight: info.profile.weight }} />}
                      />
                      {this.renderProfileList('Hair color', info.profile.hair_color, info.labels.hair)}
                      {this.renderProfileList('Eye color', info.profile.eye_color, info.labels.eye)}
                    </List>
                  </div>

                  {info.games.length === 0 ? null : (
                    <Paper className="py-15 px-15">
                      {info.games.map(({ title, id }) =>
                        <Chip
                          key={id}
                          tabIndex={-1}
                          label={title}
                          className="my-5 mr-5"
                          color="primary"
                        />
                      )}
                    </Paper>
                  )}

                  <ImagesList userId={info.id} />
                </div>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </Container>
    )
  }
}