import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl, FormGroup, Validators } from '@/form';
import TextField from "@material-ui/core/TextField/TextField";
import Translate from "@/containers/Translate/Translate";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Send from '@material-ui/icons/Send';
import { messageFormAction } from "@/store/actions/chat/messageFormAction";

@connect(
  state => ({ messageForm: state.messageForm }),
  dispatch => ({
    send: data => dispatch(messageFormAction.sendMessage(data)),
    clear: () => dispatch(messageFormAction.clear())
  })
)
export default class MessageForm extends Component {

  state = {
    form: new FormGroup({
      message: new FormControl('', [
        Validators.isRequired,
        Validators.maxLength(1500)
      ])
    })
  };

  componentWillUnmount() {
    this.props.clear();
  }

  handleChange(value, control) {
    this.state.form.update(form => {
      form.setValue(control, value);
      this.setState({ form });
    });
  }

  handleSubmit(event = null) {
    event && event.preventDefault();

    this.state.form.update(form => {
      const valid = form.validate();
      valid && this.props.send(form.getValues());
      form.control('message').setValue('');
      this.setState({ form });
    });
  }

  render() {
    const { loader } = this.props.messageForm;
    const { form } = this.state;
    const message = form.control('message');

    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <TextField
          fullWidth
          variant="outlined"
          label={<Translate name="Write message..." />}
          value={message.getValue()}
          onChange={e => this.handleChange(e.target.value, message.getName())}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={loader}
                  aria-label="Toggle password visibility"
                  onClick={() => this.handleSubmit()}
                >
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    )
  }
}