import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

export default function Mention({ children }) {
  const [userData, setUserData] = useState();
  const userId = children[0].content;
  useEffect(() => {
    if (userData && userData.id === "deleted") return;
    if (!userData || userData.id !== userId) {
      firebase
        .firestore()
        .collection("publicUsers")
        .doc(userId)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            var data = snapshot.data();
            data.id = userId;
            setUserData(data);
          } else {
            setUserData({ id: "deleted", displayName: "Deleted" });
          }
        });
    }
  });
  return <div key={`markdown${userId}`}>@{userData ? userData.displayName : null}</div>;
}
