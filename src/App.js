import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { autoLogin, logout } from "./store/actions/user/userAction";
import translateAction from "./store/actions/translate/translateAction";
import Layout from './hoc/Layout/Layout';
import Header from './containers/Header/Header';

import Language from './containers/Pages/Language/Language';
import Home from './containers/Pages/Home/Home';
import About from './containers/Pages/About/About';
import Login from './containers/Pages/Auth/Login/Login';
import Register from "./containers/Pages/Auth/Register/Register";
import RestorePassword from "./containers/Pages/Auth/RestorePassword/RestorePassword";
import VerifyEmail from "./containers/Pages/Auth/VerifyEmail/VerifyEmail";
import Detail from "./containers/Pages/Profile/Detail/Detail";
import ProfileGallery from "./containers/Pages/Profile/ProfileGallery/ProfileGallery";
import GeoLocation from "./containers/Pages/Profile/GeoLoacation/GeoLocation";
import ProfileGames from "./containers/Pages/Profile/Games/ProfileGames";
import PeopleList from "./containers/Pages/People/List/PeopleList";
import Loader from "./components/UI/Loader/Loader";
import PeopleDetail from "./containers/Pages/PeopleDetail/PeopleDetail";
import Invites from "./containers/Pages/Invites/Invites";
import Notification from "./containers/Notication/Notification";
import Chat from './containers/Chat/Chat';
import OnlineUserListen from "@/containers/OnlineUser/OnlineUserListen";

@withRouter
@connect(
  state => ({
    translate: state.translate,
    user: state.user,
    loader: state.loader
  }),
  dispatch => ({
    autoLogin: () => dispatch(autoLogin()),
    logout: () => dispatch(logout()),
    onChangeLang: lang => dispatch(translateAction(lang))
  })
)
export default class App extends Component {
  componentDidMount() {
    if (this.props.user.loader) {
      this.props.autoLogin();
    }
  }

  render() {
    const { translate, user, onChangeLang, logout, loader } = this.props;

    const guestRoutes = [
      { path: '/:lang/login', component: Login },
      { path: '/:lang/register', component: Register },
      { path: '/:lang/restore-password', component: RestorePassword },
      { path: '/:lang/verify/:token', component: VerifyEmail },
    ];

    const userRoutes = [
      { path: '/:lang/profile', component: Detail, exact: true },
      { path: '/:lang/profile/gallery', component: ProfileGallery },
      { path: '/:lang/profile/location', component: GeoLocation },
      { path: '/:lang/profile/games', component: ProfileGames },
      { path: '/:lang/invites', component: Invites }
    ];

    const redirectDefault = (user.isGuest ? user.redirect : user.referer)
      || `/${translate.locale}`;

    return (
      <Layout>
        <Loader loader={loader.loader || user.loader} />

        <Header
          {...translate}
          user={user}
          onChangeLang={onChangeLang}
          logout={logout}
        />

        <Route path="/:lang" render={() => (
          <Language />
        )} />

        {!translate.loader ? (
          <div className="pt-60">
            <Switch>
              <Route path="/:lang" exact component={Home}/>
              <Route path="/:lang/about" component={About}/>
              <Route path="/:lang/people/:id" component={PeopleDetail}/>
              <Route path="/:lang/people" exact component={PeopleList}/>

              { user.isGuest ? guestRoutes.map((data, index) => {
                return <Route key={index} {...data} />
              }) : userRoutes.map((data, index) => {
                return <Route key={index} {...data} />
              }) }

              {user.loader ? null : (
                <Redirect to={redirectDefault} />
              )}
            </Switch>
          </div>
        ) : (
          <Route path="/" exact render={() =>
            <Redirect to={'/' + translate.locale} />
          } />
        )}

        {!user.isGuest ? (
          <React.Fragment>
            <OnlineUserListen />
            <Notification />
            <Chat />
          </React.Fragment>
        ) : null}
      </Layout>
    );
  }
}
