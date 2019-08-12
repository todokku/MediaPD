/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from 'react';
import { Cancel } from '@material-ui/icons';

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { show, onClose, style } = this.props;

    return (
      <div
        className="dialog_background"
        style={{ display: !show ? 'none' : 'flex' }}
      >
        <div className="dialog_content" style={style}>
          <div className="dialog-close" onClick={onClose}>
            <Cancel />
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dialog;
