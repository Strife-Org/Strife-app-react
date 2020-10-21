import React from "react";
import Connection from "./Connection";

export default function Connections(props) {
  const connectionsList = props.existingConnections.map((connection) => connection.accepted === 1 ? (
    <li key={connection.id}>
      <Connection
        data={connection}
        onClick={() => props.changeConversationId(connection.id)}
      />
    </li>
  ) : null);
  return <ul className="connections">{connectionsList}</ul>;
}
