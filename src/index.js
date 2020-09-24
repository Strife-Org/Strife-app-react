import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import io from "socket.io-client"
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer

ipcRenderer.send('ready-for-data')

ipcRenderer.on('user-data', (e, data) => {
  data.serverUrl = data.serverUrl || "http://logic-chat.herokuapp.com/"
  window.socket = io(data.serverUrl)
  ReactDOM.render(
    <React.StrictMode>
      <App savedData={data} />
    </React.StrictMode>,
    document.getElementById('root')
  );
})