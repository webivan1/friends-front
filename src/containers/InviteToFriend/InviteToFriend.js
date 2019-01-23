import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InviteDialog from "@/containers/InviteToFriend/InviteDialog";

export default class InviteToFriend extends Component {

  static propTypes = {
    fromUser: PropTypes.number.isRequired,
    toUser: PropTypes.number.isRequired,
    children: PropTypes.object.isRequired
  };

  state = {
    open: false,
  };

  constructor(props) {
    super(props);

    this.element = React.createRef();
  }

  componentDidMount() {
    const [ child ] = this.element.current.childNodes;

    if (child) {
      child.onclick = () => {
        this.handleOpenDialog();
      }
    }
  }

  handleOpenDialog() {
    this.setState({ open: true });
  }

  handleCloseDialog() {
    this.setState({ open: false });
  }

  render() {
    return (
      <React.Fragment>
        <span ref={this.element}>
          {this.props.children}
        </span>

        {this.state.open ? (
          <InviteDialog
            fromUser={this.props.fromUser}
            toUser={this.props.toUser}
            onClose={() => this.handleCloseDialog()}
          />
        ) : null}
      </React.Fragment>
    )
  }
}