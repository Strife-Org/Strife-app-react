import React, { useState } from "react";

import Popup from "./Popup";
import AddContactTab from "./AddContactTab";
import ConnectionRequestsTab from "./ConnectionRequestsTab";
import { FaUserFriends } from "react-icons/fa";
import classnames from "classnames"

import firebase from "firebase/app";

const tabs = [
  { name: "Create connections", component: AddContactTab },
  { name: "Pending connection requests", component: ConnectionRequestsTab },
];

export default function AddContact({existingConnections, closeTooltip, className}) {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  var pendingConnections = 0;
  const ownUserId = firebase.auth().currentUser.uid;
  existingConnections.forEach(connection => {
    if(connection.requested !== ownUserId) return;
    if(connection.accepted !== 0) return;
    pendingConnections++
  })

  return (
    <Popup
      className={"manageConnectionsContainer "+className}
      trigger={
        <button className={classnames("manageConnectionsButton", (pendingConnections > 0 ? "pending" : ""))} style={{"--pendingConnections": `"${pendingConnections.toString()}`}} >
          <FaUserFriends viewBox="0 0 700 500" className="icon" />
        </button>
      }
      afterClose={closeTooltip}
    >{(close) => (
      <div>
      <ul className="tabs">
        {tabs.map((tab) => {
          return (
            <li key={tab.name} className={`tab ${currentTab === tab ? "active" : ""}`}>
              <button
                onClick={(e) => {
                  setCurrentTab(tab);
                }}
              >
                {tab.name}
              </button>
            </li>
          );
        })}
      </ul>
      {React.createElement(currentTab.component, {
        existingConnections: existingConnections,
        changeTab: () => {
          setCurrentTab(tabs[(tabs.indexOf(currentTab) + 1) % 2]);
        },
        closePopup: () => {
          close()
          closeTooltip()
        }
      })}
      </div>
    )}
    </Popup>
  );
}
