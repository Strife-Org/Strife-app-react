import React, { Component } from "react";
import Popup from "reactjs-popup";
function ConnectionRequests() {
    return(
        <div>Opened</div>
    )
}

export default class ConnectionRequestsButton extends Component {
  render() {
    return (
      <Popup
        trigger={<button className="button"> Trigger 1 </button>}
        position="bottom center"
        nested
      >
          <ConnectionRequests />
      </Popup>
    );
  }
}
