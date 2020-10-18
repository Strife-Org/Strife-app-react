import React, { useState } from "react";

import Popup from "./Popup";
import AddContactTab from "./AddContactTab";
import ConnectionRequestsTab from "./ConnectionRequestsTab";
import Icon from "./Icon";

const tabs = [
  { name: "Create connections", component: AddContactTab },
  { name: "Pending connection requests", component: ConnectionRequestsTab },
];

export default function AddContact() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  return (
    <Popup
      trigger={<button className="settingButton"><Icon icon="Connection" /> Manage Connections</button>}
    >
      <ul className="tabs">
        {tabs.map((tab) => {
          return (
            <li className={`tab ${currentTab === tab ? "active" : ""}`}>
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
        {React.createElement(currentTab.component)}
    </Popup>
  );
}
