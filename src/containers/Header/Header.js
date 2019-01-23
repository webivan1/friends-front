import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from '@material-ui/icons/MoreVert';
import Container from '@/components/UI/Container/Container';
import { Link, withRouter } from 'react-router-dom';
import NavLink from "@/components/UI/NavLink/NavLink";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Face from '@material-ui/icons/Face';
import Language from '@material-ui/icons/Language';
import Translate from "@/containers/Translate/Translate";
import LinkMenuNewFriends from "@/containers/LinkMenuNewFriends/LinkMenuNewFriends";
import styles from '@/containers/Header/styles';

@withRouter
@withStyles(styles)
export default class Header extends Component {
  state = {
    menuLang: null,
    menuMobile: null,
    menuUser: null
  };

  changeLanguageHandler(lang) {
    const { languages, locale, location, history, onChangeLang } = this.props;

    if (lang !== locale) {
      let path = location.pathname;
      let state = false;

      languages.forEach(item => {
        let str = `/${item.lang}`;

        if (path.indexOf(str) === 0 && !state) {
          path = path.replace(str, `/${lang}`);
        }
      });

      onChangeLang(lang);

      // replace url
      history.push(path);
    }

    this.setState({ menuLang: null });
  }

  logoutHandler() {
    this.setState({ menuUser: null }, () => {
      this.props.logout();
    });
  }

  render() {
    const { classes, languages, user, locale, loader } = this.props;
    const { menuLang, menuMobile, menuUser } = this.state;

    const renderMenuLang = (
      <Menu
        id="simple-menu"
        anchorEl={menuLang}
        open={Boolean(menuLang)}
        onClose={() => this.setState({ menuLang: null })}
      >
        {languages.map((item, index) => {
          return (
            <MenuItem key={index} onClick={this.changeLanguageHandler.bind(this, item.lang)}>
              {item.label}
            </MenuItem>
          )
        })}
      </Menu>
    );

    const renderMenuMobile = (
      <Menu
        anchorEl={menuMobile}
        open={Boolean(menuMobile)}
        onClose={() => this.setState({ menuMobile: null })}
      >
        <MenuItem component={Link} to={`/${locale}`}>
          <Translate>Home</Translate>
        </MenuItem>
        <MenuItem component={Link} to={`/${locale}/about`}>
          <Translate>About</Translate>
        </MenuItem>
        <MenuItem component={Link} to={`/${locale}/people`}>
          <Translate>People</Translate>
        </MenuItem>
        <MenuItem
          disabled={loader}
          onClick={event => this.setState({ menuLang: event.currentTarget })}
        >
          <Language/> &nbsp; {locale.toUpperCase()}
        </MenuItem>
        {
          user.isGuest ? (
            <MenuItem disabled={user.loader} component={Link} to={`/${locale}/login`}>
              <AccountCircle /> &nbsp; <Translate>Login</Translate>
            </MenuItem>
          ) : (
            <MenuItem
              onClick={event => this.setState({ menuUser: event.currentTarget })}
            >
              <Face /> &nbsp; {user.user.name}
            </MenuItem>
          )
        }
      </Menu>
    );

    const renderMenu = (
      <Menu
        anchorEl={menuUser}
        open={Boolean(menuUser)}
        onClose={() => this.setState({ menuUser: null })}
      >
        <MenuItem
          component={Link}
          to={`/${locale}/profile`}
          onClick={() => this.setState({ menuUser: null })}
        >
          <Translate>Profile</Translate>
        </MenuItem>
        <MenuItem onClick={() => this.logoutHandler()}>
          <Translate>Logout</Translate>
        </MenuItem>
      </Menu>
    );

    return (
      <AppBar position="sticky" color="default" className={classes.root}>
        <Container>
          <Toolbar className={classes.toolbar}>
            {/*<Typography variant="h6" color="inherit" className={classes.grow}>*/}
              {/*<NavLink to={`/${this.props.locale}`} exact>*/}
                {/*<Home /> &nbsp; GameLove*/}
              {/*</NavLink>*/}
            {/*</Typography>*/}

            <div className={classes.grow} />

            {user.isGuest ? null : <LinkMenuNewFriends /> }

            <div className={classes.sectionDesktop}>
              <NavLink exact={true} to={`/${locale}`}>
                <Translate>Home</Translate>
              </NavLink>
              <NavLink to={`/${locale}/about`}>
                <Translate>About</Translate>
              </NavLink>
              <NavLink exact={true} to={`/${locale}/people`}>
                <Translate>People</Translate>
              </NavLink>
              {
                user.isGuest ? (
                  <NavLink disabled={user.loader} to={`/${locale}/login`}>
                    <AccountCircle />
                    &nbsp; <Translate>Login</Translate>
                  </NavLink>
                ) : (
                  <Button
                    aria-owns={menuUser ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={event => this.setState({ menuUser: event.currentTarget })}
                    color="primary"
                  >
                    <Face /> &nbsp; {user.user.name}
                  </Button>
                )
              }
              <Button
                disabled={loader}
                aria-owns={menuLang ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={event => this.setState({ menuLang: event.currentTarget })}
                color="primary"
              >
                <Language /> &nbsp; {locale.toUpperCase()}
              </Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={event => this.setState({ menuMobile: event.currentTarget })}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>

          {renderMenuLang}
          {renderMenuMobile}
          { !user.isGuest ? renderMenu : null }
        </Container>
      </AppBar>
    );
  }
}