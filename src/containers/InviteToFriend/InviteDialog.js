import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import { FormGroup, FormControl, Validators } from '@/form'
import TextField from "@material-ui/core/TextField/TextField";
import Translate from "@/containers/Translate/Translate";
import Alert from "@/components/UI/Alert/Alert";
import { sendInvite, clearInviteForm } from "@/store/actions/friends/inviteFormAction";

@connect(
  state => state.inviteForm,
  dispatch => ({
    sendInvite: formData => dispatch(sendInvite(formData)),
    clear: () => dispatch(clearInviteForm())
  })
)
export default class InviteDialog extends Component {

  static propTypes = {
    fromUser: PropTypes.number.isRequired,
    toUser: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
  };

  state = {
    form: new FormGroup({
      message: new FormControl('', [ Validators.isRequired, Validators.minLength(10) ])
    })
  };

  componentWillUnmount() {
    this.props.clear();
  }

  handleField(controlName, value) {
    this.state.form.update(form => {
      form.setValue(controlName, value);
      this.setState({ form })
    });
  }

  handleForm(event) {
    event && event.preventDefault();

    this.state.form.update(form => {
      const valid = form.validate();

      if (valid) {
        this.props.sendInvite({
          ...form.getValues(),
          from: this.props.fromUser,
          to: this.props.toUser
        });
      }

      this.setState({ form });
    });
  }

  render() {
    const { onClose, loader, success, error } = this.props;
    const message = this.state.form.control('message');

    return (
      <Dialog
        open={true}
        onClose={() => loader ? false : onClose()}
        aria-labelledby="simple-dialog-title"
        scroll="body"
      >
        <DialogTitle id="simple-dialog-title">
          <Translate name="Send invite" />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={event => this.handleForm(event)}>
            <TextField
              fullWidth
              disabled={loader}
              label={<Translate name="Message" />}
              error={!message.valid}
              multiline
              rowsMax="4"
              value={message.getValue()}
              onChange={e => this.handleField(message.getName(), e.target.value)}
              margin="normal"
              helperText={
                !message.valid
                  ? <Translate params={{ field: message.getName() }}>RequiredFieldForm</Translate>
                  : null
              }
            />
          </form>

          {success ? <Alert type="success">{success}</Alert> : null}
          {error ? <Alert type="danger">{error}</Alert> : null}
        </DialogContent>
        <DialogActions>
          <Button disabled={loader} onClick={() => onClose()} color="secondary">
            <Translate name="Close" />
          </Button>
          <Button disabled={loader} onClick={() => this.handleForm()} color="primary">
            <Translate name="Send" />
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}