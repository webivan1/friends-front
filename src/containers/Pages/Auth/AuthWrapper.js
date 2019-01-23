import React from 'react';
import Translate from '@/containers/Translate/Translate';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const AuthWrapper = ({ title, children, disabled, onClick, buttonText, locale, hideAction }) => (
  <Dialog
    open={true}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    scroll="body"
  >
    <DialogTitle id="alert-dialog-title">
      {title}
    </DialogTitle>
    <DialogContent>
      {children}
    </DialogContent>
    <DialogActions>
      <Button
        component={Link}
        color="secondary"
        to={`/${locale}`}
      >
        <Translate>Close</Translate>
      </Button>
      {hideAction ? null : (
        <Button
          disabled={disabled}
          onClick={onClick}
          color="primary"
        >
          {buttonText}
        </Button>
      )}
    </DialogActions>
  </Dialog>
);

export default AuthWrapper;